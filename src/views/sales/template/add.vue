<template>
  <div class="app-container">
    <step1 v-if="step === 0" @next="step = 1"/>
    <step2 v-else />
  </div>
</template>

<script>
import Step1 from './components/tempAddStep1'
import Step2 from './detail'

export default {
  components: {
    Step1,
    Step2
  },

  data () {
    return {
      formModel: {
        template: '',
        provider: ''
      },
      step: 0
    }
  },

  methods: {
  }
}
</script>
</script>

