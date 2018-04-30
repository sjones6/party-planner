<template>
  <section>
    <app-header></app-header>
    <div>
      <h1 class="title">{{ str.enterYourBirthday }}</h1>
      <validation-errors :errors="errors"></validation-errors>
      <input
        type="date"
        placeholder="mm/dd/yyyy"
        :value="birthday && birthday.toISOString().split('T')[0]"
        @input="birthday = $event.target.valueAsDate"
      >
      <button class="stretch" @click="save">{{ str.save }}</button>
    </div>
  </section>
</template>

<script>
import birthdayValidation from 'common/validations/birthday.js'
import AppHeader from './AppHeader.vue'
import ValidationErrors from './ValidationErrors.vue'

export default {
  components: {
    'app-header': AppHeader,
    'validation-errors': ValidationErrors,
  },
  data() {
    return {
      /**
       * @type {string} a date string as YYYY-MM-DD
       */
      birthday: null,
      errors: {},
      str: {
        enterYourBirthday: __('Enter Your Birthday'),
        logout: __('logout'),
        save: __('save'),
      },
    }
  },
  methods: {
    save() {
      const errors = birthdayValidation(this.birthday)
      if (errors) {
        this.errors = errors
      } else {
        this.$ajax
          .put('/user', {
            birthday: this.birthday,
          })
          .then(res => {
            this.$store.dispatch('updateBirthday', this.birthday)
            this.$router.push({ name: 'food' })
          })
          .catch(err => {
            this.errors = err
          })
      }
    },
  },
  mounted() {
    // If there's already a birthday, compile that into a format
    // recognized by the input
    const { birthday } = this.$store.getters.user
    if (birthday) {
      this.birthday = birthday
    }
  },
}
</script>
