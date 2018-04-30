<template>
  <div class="error message">
    <ul class="errors">
      <li v-for="(errors, field) in messages" class="error-field">
        <span class="field-name">{{ field }}</span>: {{ errors.join(' ') }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['errors'],
  computed: {
    messages() {
      return this.errors instanceof Object
        ? this.errors
        : {
            error: [this.errors],
          }
    },
    hasErrors() {
      return Object.keys(this.errors).length > 1
    },
  },
}
</script>

<style lang="scss">
.error-field {
  display: block;
  margin: 0;
  background: rgba(#fff, 0.1);
}

.errors {
  padding: 0;
}

.field-name {
  text-transform: uppercase;
}
</style>
