<template>
  <header id="app-header">
    <div class="left">
      <h1>{{ str.partyPlanner }} </h1>
    </div>
    <div class="right">
        <h3 class="inline">{{ $store.getters.user.email }}</h3>
        <button @click="logout">{{ str.logout }}</button>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      str: {
        partyPlanner: __('Party Planner'),
        logout: __('logout'),
      },
    }
  },
  methods: {
    logout() {
      this.$ajax
        .get('/user/logout')
        .then(res => {
          this.$store.dispatch('logout')
          this.$router.push({ name: 'login' })
        })
        .catch(err => {
          // force a re-route
          this.$router.push({ name: 'login' })
        })
    },
  },
}
</script>

<style lang="scss">
#app-header {
  height: 100px;
  vertical-align: middle;

  & .left {
    float: left;
  }

  & .right {
    float: right;
  }

  & h1 {
    margin: 0;
  }

  & .inline {
    display: inline-block;
  }
}
</style>
