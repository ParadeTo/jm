<template>
  <div class="app-container">
    <step0 v-if="step===0" @next="step=1"/>
    <my-progress v-else @cancel="step=0"/>
  </div>
</template>

<script>
import Step0 from './components/step0'
import MyProgress from './components/progress'

export default {
  components: {
    Step0,
    MyProgress
  },

  data () {
    return {
      step: 0
    }
  }
}
</script>




