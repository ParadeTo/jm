<template>
  <div class="app-container">
    <info-list />
  </div>
</template>

<script>
import InfoList from './components/infoList'

export default {
  components: {
    InfoList
  },

  methods: {
    to(name) {
      console.log(name)
      this.$router.push({name})
    }
  }
}
</script>
