<template>
  <div id="app">
    <div id="background" tab-index="-1">
      <h1>Party<br>Planner</h1>
      <div class="screen"></div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // attempt to see if there's a running session
    this.$ajax
      .get('/user')
      .then(res => {
        this.$store.dispatch('login', res.data)

        setTimeout(() => {
          !res.data.birthday
            ? this.$router.push({ name: 'birthday' })
            : this.$router.push({ name: 'food' })
        }, 30)
      })
      .catch(() => {}) // swallow the error
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  width: 100%;
  height: 100%;
  font-size: 25px;
  color: #fff;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: #fff;
  font-weight: 600;
}

.title {
  text-transform: uppercase;
  font-size: 2em;
  margin: 5px;
}

input {
  background: rgba(#fff, 0.15);
  border: 2px solid #fff;
  border-radius: 10px;
  font-size: 2em;
  padding: 0.1em 0.5em;
  display: block;
  margin: 5px auto;
  color: #fff;

  &:focus {
    outline: none;
  }
}

button {
  font-size: 1.25em;
  border: none;
  background: rgba(#fff, 0);
  padding: 0.1em 1em;
  text-align: center;
  border: 2px solid #fff;
  border-radius: 10px;
  color: #fff;
  font-weight: 500;

  transition: all 300ms;

  &:hover,
  &:focus {
    outline: none;
    color: #82194a;
    background: #fff;
  }

  &.stretch {
    min-width: 267px;
  }
}

a {
  font-weight: 400;
  font-style: italic;
  color: #fff;

  &:visited {
    color: #fff;
  }
}

#background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  background: linear-gradient(to top, rgba(26, 27, 130, 1), rgba(26, 27, 130, 0.7));
  text-align: center;

  & h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgba(#fff, 0.2);
    margin: 0;
    font-size: 28vw;
    line-height: 0.8;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: -35px;
  }

  & .screen {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom, rgba(#82194a, 0.8), rgba(#82194a, 0.4));
  }
}
</style>
