<template>
  <section>
    <app-header></app-header>
    <div>
        <h1 class="title" >{{ str.enterFoods }}</h1>
        <validation-errors :errors="errors" />
        <input type="text" v-model="foodName" :placeholder="str.partyFoods" @keyup.enter="saveFood"/>
        <div class="center">
          {{ str.yourBirthday }} {{ birthday }}. <router-link :to='{name: "birthday" }'>{{ str.changeBirthday }}.</router-link>
        </div>

        <ul>
          <li v-for="food in foods" :key="food._id" class="food-item">
              <food-item :food="food.food" :id="food._id" @delete="deleteFood(food._id)" @edit="onEditFood" />
          </li>
        </ul>
    </div>
  </section>
</template>

<script>
import AppHeader from './AppHeader.vue'
import FoodItem from './FoodItem.vue'
import ValidationErrors from './ValidationErrors.vue'

export default {
  components: {
    'app-header': AppHeader,
    'food-item': FoodItem,
    'validation-errors': ValidationErrors,
  },
  data() {
    return {
      foodName: '',
      errors: {},
      foods: [],
      sending: false,
      str: {
        enterFoods: __('Enter Your Party Food!'),
        partyFoods: __('Food selections...'),
        changeBirthday: __('Change'),
        yourBirthday: __('Your birthday is on '),
      },
    }
  },
  computed: {
    birthday() {
      const { birthday } = this.$store.getters.user

      // need to increment month and date since we get 0-indexed responses
      return `${birthday.getMonth() + 1}/${birthday.getDate() + 1}/${birthday.getFullYear()}`
    },
  },
  methods: {
    saveFood() {
      // debounce
      if (this.sending) {
        return
      }

      // simple safeguard to ensure some chars
      if (!this.foodName.length) {
        this.errors = {
          [__('Whoops!')]: [__('please enter a food')],
        }
      } else {
        this.sending = true
        this.$ajax
          .post('/food', {
            food: this.foodName,
          })
          .then(res => {
            // add to list
            this.foods.push({
              _id: res.data.id,
              food: this.foodName,
            })

            // reset input
            this.foodName = ''

            // allow requests through
            this.sending = false
          })
          .catch(err => {
            this.errors = err.data ? err.data : err
            this.sending = false
          })
      }
    },
    deleteFood(id) {
      this.$ajax
        .delete(`/food/${id}`)
        .then(res => {
          // update vue food list
          this.foods = this.foods.filter(food => food._id !== id)
        })
        .catch(err => {
          this.errors = {
            [__('Whoops!')]: [__('unable to delete this menu item.')],
          }
        })
    },
    onEditFood({ id, food }) {
      if (!food) {
        this.errors = {
          [__('Whoops!')]: [__('food cannot be empty.')],
        }
      } else {
        this.sending = true
        this.$ajax
          .put(`/food/${id}`, { food })
          .then(res => {
            this.foods = this.foods.map(f => {
              return f._id === id ? { _id: id, food } : f
            })
            this.sending = false
          })
          .catch(err => {
            this.errors = err.data ? err.data : err
            this.sending = false
          })
      }
    },
  },
  mounted() {
    // get the list
    this.$ajax
      .get('/food')
      .then(res => {
        this.foods = res.data
      })
      .catch(err => {
        this.errors = {
          [__('Whoops!')]: [__('unable to fetch menu items at this time.')],
        }
      })
  },
}
</script>

<style lang="scss">
.food-item {
  display: block;
}
</style>
