<template>
  <div class="app-container">
    <div class="header">
      <el-steps :active="active" align-center>
        <el-step title="手机验证"></el-step>
        <el-step title="信息完善"></el-step>
        <el-step title="提交审核"></el-step>
      </el-steps>
    </div>
    <div class="content">
      <step1 v-if="active===0" @next="active=1" @cancel="cancel"/>
      <step2 v-if="active===1" @next="active=2" @cancel="cancel"/>
      <step3 v-if="active===2" />
    </div>
  </div>
</template>

<script>
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'

export default {
  components: {
    Step1,
    Step2,
    Step3
  },

  data () {
    return {
      active: 0
    }
  },

  methods: {
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>
.header {
  width: 400px;
  margin: 0 auto;
}
</style>


