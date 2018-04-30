<template>
  <div>
    <input class="food-edit" @keyup.enter="onSave" v-model="foodName" />
    {{ str.get }} <router-link :to="recommendationRoute">{{ str.recommendations }}</router-link>
    <button @click="onDelete">delete</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      foodName: '',
      str: {
        get: __('get recipe'),
        recommendations: __('recommendations'),
      },
    }
  },
  props: {
    food: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
  },
  computed: {
    recommendationRoute() {
      return {
        name: 'recommendation',
        params: {
          food: this.id,
        },
      }
    },
  },
  methods: {
    onDelete() {
      this.$emit('delete')
    },
    onSave() {
      this.$emit('edit', {
        id: this.id,
        food: this.foodName,
      })
    },
  },
  mounted() {
    // copy prop to local data for editing
    this.foodName = this.food
  },
}
</script>

<style lang="scss">
.food-edit {
  display: inline-block;
  border: none;
  background: none;
}
</style>
