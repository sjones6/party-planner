const request = require('supertest')
const app = require('server')

const login = server => {
  return server.post('/user/login')
  .send({ 
    email: 'test@test.com',
    password: '1234567'
  })
}

describe('/users', () => {

  let server, userID
  beforeEach(() => {
    server = request(app)
  })

  describe('POST: /user (i.e., registration)', () => {

    it('should require an email and password', () => {
      return server.post('/user')
        .send({ })
        .expect(400)
    })

    it('should require a valid email and password of at least 6 chars', () => {
      return server.post('/user')
        .send({ 
          email: 'test@test.com',
          password: '1234567'
        })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {

          // keep user ID for other requests
          userID = res.body.id
        })
    })

    it('should not accept duplicate emails', () => {
      return server.post('/user')
        .send({ 
          email: 'test@test.com',
          password: '1234567'
        })
        .expect('Content-Type', /json/)
        .expect(400)
    })
  })

  describe('GET: /user/login', () => {
    describe('validations', () => {
      it('should require an email and password', () => {
        return server.post('/user/login')
          .send({ })
          .expect(400)
      })

      it('should require a valid email and password of at least 6 chars', () => {
        return login(server)
          .expect(200)
          .expect('set-cookie', /connect\.sid/);
      })
    })
  })

  describe('GET: /user/logout', () => {
    it('should logout the user', () => {
      return login(server)
      .then(res => {

        // user cookie from login request
        // to delete the user
        return server.get('/user/logout')
          .set('Cookie', res.headers['set-cookie'])
          .expect(200)
      })
    })
  })

  describe('PUT: /user', () => {

    it('should validate required fields', () => {
      return login(server)
      .then(res => {

        // user cookie from login request
        // to delete the user
        return server.put('/user')
          .send({
            dogsName: 'Fido'
          })
          .set('Cookie', res.headers['set-cookie'])
          .expect(400)
      })
    })

    it('should update the users information', () => {
      return login(server)
      .then(res => {

        // user cookie from login request
        // to delete the user
        return server.put('/user')
          .send({
            birthday: new Date()
          })
          .set('Cookie', res.headers['set-cookie'])
          .expect(200)
      })
    })
  })

  describe('DELETE: /user', () => {
    it('should delete users by id', () => {
      return login(server)
      .then(res => {

        // user cookie from login request
        // to delete the user
        return server.delete('/user')
          .set('Cookie', res.headers['set-cookie'])
          .expect(200)
      })
    })
  })
})