<template>
  <div>
      <h1 class="title">{{ str.register }}</h1>
      <validation-errors :errors="errors"></validation-errors>
      <form @submit.prevent="onSubmit">
          <input type="text" v-model="email" :placeholder="str.email" />
          <input type="password" v-model="password" :placeholder="str.password" />
          <button class="stretch" type="submit">{{ str.register }}</button>
        </form>
        {{ str.alreadyUser }} <router-link to="login">{{ str.login }}.</router-link>
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
        register: __('register'),
        email: __('email'),
        password: __('password'),
        alreadyUser: __('Already have an accout?'),
      },
      errors: {},
    }
  },
  methods: {
    onSubmit() {
      this.$ajax
        .post('/user', {
          email: this.email,
          password: this.password,
        })
        .then(res => {
          this.errors = {}
          this.$router.push({ name: 'login' })
        })
        .catch(({ response }) => {
          if (response.data) {
            this.errors = response.data
          }
        })
    },
  },
}
</script>
