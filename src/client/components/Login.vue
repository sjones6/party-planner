<template>
  <div>
      <h1 class="title">{{ str.login }} </h1>

      <validation-errors :errors="errors"></validation-errors>

      <form @submit.prevent="onSubmit">
          <input type="text" v-model="email" :placeholder="str.email" />
          <input type="password" v-model="password" :placeholder="str.password" />
          <button class="stretch" type="submit">{{ str.login }}</button>
      </form>
      
      {{ str.notRegistered }} <router-link to="register">{{ str.register }}</router-link>
  </div>
</template>

<script>
import ValidationErrors from './ValidationErrors.vue'

export default {
  components: {
    'validation-errors': ValidationErrors,
  },
  data() {
    return {
      email: '',
      password: '',
      str: {
        login: __('Login'),
        email: __('email*'),
        password: __('password*'),
        register: __('Sign up.'),
        notRegistered: __("Don't have an account yet?"),
        submit: __('Submit'),
      },
      errors: {},
    }
  },

  methods: {
    onSubmit(e) {
      if (!this.email.length || !this.password.length) {
        this.errors = {
          [__('Whoops!')]: ['Email and Password are required'],
        }
      } else {
        this.$ajax
          .post('/user/login', {
            email: this.email,
            password: this.password,
          })
          .then(res => {
            this.$store.dispatch('login', res.data)
            this.$router.push({ name: res.data.birthday ? 'food' : 'birthday' })
          })
          .catch(({ response }) => {
            if (response && response.data) {
              this.errors = response.data
            }
          })
      }
    },
  },
}
</script>
