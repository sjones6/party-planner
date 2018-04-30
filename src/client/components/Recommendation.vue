<template>
    <section>
      <app-header></app-header>
      <div> 
        <h1 class="title">{{ str.recommendations }}</h1>
        <h2 v-if="hasRecommendations">{{ str.for }} <em>{{ food ? food.food : '' }}</em></h2>
        <router-link :to='{name: "food"}'>{{ str.menu }}</router-link>
        <validation-errors :errors="errors"></validation-errors>

        <div v-if="loading">
          <h2>{{ str.loading }}</h2>
        </div>

        <div class="recommendations">
          <div v-if="!hasErrors && hasRecommendations" v-for="rec in recommendations" class="recommendation">
            <a :href="rec.url" target="_blank">
              <img :src="rec.img">
              <h2>{{ rec.label }} from <span>{{ str.source }}: {{ rec.source }}</span></h2>
            </a>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
import AppHeader from './AppHeader.vue'
import ValidationErrors from './ValidationErrors.vue'

export default {
  components: {
    'app-header': AppHeader,
    'validation-errors': ValidationErrors,
  },
  data() {
    return {
      loading: true,
      recommendations: [],
      food: {},
      errors: {},
      str: {
        recommendations: __('Recipe Recommendations'),
        for: __('for'),
        source: __('source'),
        menu: __('back to menu'),
        loading: __('loading recommendations ...'),
      },
    }
  },
  computed: {
    hasErrors() {
      return Object.keys(this.errors).length > 0
    },
    hasRecommendations() {
      return this.recommendations.length > 0
    },
  },
  mounted() {
    this.$ajax
      .get(`/food/${this.$route.params.food}/recommendations`)
      .then(res => {
        this.errors = {}
        this.food = res.data.food
        this.recommendations = res.data.recommendations
        this.loading = false
      })
      .catch(res => {
        if (res.data) {
          this.errors = res.data
        }
      })
  },
}
</script>

<style lang="scss">
.recommendations {
  width: 70vw;
  max-width: 1000px;
  margin: 0 auto;
  font-size: 0;
}

.recommendation {
  display: inline-block;
  position: relative;
  width: 50%;
  height: 250px;
  overflow: hidden;
  font-size: 20px;

  & a {
    display: block;
  }

  & img {
    width: 100%;
    transition: all 300ms;
  }

  & h2 {
    position: absolute;
    bottom: 0;
    width: 100%;
    margin: 0;
    background-color: rgba(26, 27, 130, 0.5);

    transition: all 300ms;
  }

  &:hover {
    & img {
      width: 110%;
    }

    & h2 {
      background-color: rgba(26, 27, 130, 0.8);
    }
  }
}
</style>
