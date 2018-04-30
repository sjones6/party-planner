const assert = require('assert')
const request = require('supertest')
const faker = require('faker')
const app = require('server')

describe('/food', () => {

  let cookies, id;
  before(() => {
    return request(app)
      .post('/user')
      .send({
        email: 'tester@test.com',
        password: '1234567'
      })
      .then(res => {
        id = res.body.id
        return request(app)
          .post('/user/login')
          .send({
            email: 'tester@test.com',
            password: '1234567'
          })
      })
      .then(res => {
        cookies = res.headers['set-cookie']
      })
  })

  after(() => {
    return request(app)
      .delete(`/user/${id}`)
  })

  describe('POST: food/', () => {

    it('should require authentication', () => {
      return request(app)
        .post('/food')
        .expect(400)
    })

    it('should require authentication', () => {
      return request(app)
        .post('/food')
        .send({
          food: faker.lorem.words(2)
        })
        .set('Cookie', cookies)
        .expect(200)
        .then(res => {

        })
    })
  })
  describe('PUT: food/:food', () => {
    let id
    beforeEach(() => {
      return request(app)
      .post('/food')
      .send({
        food: faker.lorem.words(2)
      })
      .set('Cookie', cookies)
      .then(res => {
        id = res.body.id
      })
    })

    it('should allow editing the text', () => {
      const newFood = faker.lorem.words(3);
      return request(app)
        .put(`/food/${id}`)
        .send({
          food: newFood
        })
        .set('Cookie', cookies)
        .expect(200)
        .then(res => {
          assert.strictEqual(res.body.id, id)

          // do a get to verify the text
          return request(app)
            .get(`/food/${id}`)
            .set('Cookie', cookies)
        })
        .then(res => {
          assert.strictEqual(res.body.food, newFood)
        })
    })
  })
  describe('GET: food/:food', () => {

    let id, food
    beforeEach(() => {
      food = 'pizza'
      return request(app)
      .post('/food')
      .send({ food })
      .set('Cookie', cookies)
      .then(res => {
        id = res.body.id
      })
    })

    it('should require authentication', () => {
      return request(app)
        .get('/food')
        .expect(400)
    })

    it('should retrieve the food', () => {
      return request(app)
        .get(`/food/${id}`)
        .set('Cookie', cookies)
        .expect(200)
        .then(res => {
          assert.strictEqual(res.body._id, id)
          assert.strictEqual(res.body.food, food)
        })
    })

    it('should fetch recommendations', () => {
      return request(app)
        .get(`/food/${id}/recommendations`)
        .set('Cookie', cookies)
        .expect(200)
    })
  })

  describe('GET: food', () => {

    let id, food
    beforeEach(() => {
      food = faker.lorem.words(2)
      return request(app)
      .post('/food')
      .send({ food })
      .set('Cookie', cookies)
      .then(res => {
        id = res.body.id
      })
    })

    it('should retrieve the foods index', () => {
      return request(app)
        .get(`/food`)
        .set('Cookie', cookies)
        .expect(200)
        .then(res => {
          assert(Array.isArray(res.body))
          assert.strictEqual(res.body.length > 1, true)
        })
    })
  })


  describe('DEL: food/:food', () => {

    let id
    beforeEach(() => {
      return request(app)
      .post('/food')
      .send({ 
        food: faker.lorem.words(2)
      })
      .set('Cookie', cookies)
      .then(res => {
        id = res.body.id
      })
    })

    it('should delete the food', () => {
      return request(app)
        .delete(`/food/${id}`)
        .set('Cookie', cookies)
        .expect(200)
        .then(res => {
          assert.strictEqual(res.body.id, id)
        })
    })
  })
})