<template>
  <div>
    <el-form class="form" :rules="rules" ref="dataForm" :model="formModel" label-position="right" label-width="100px">
      <el-form-item label="手机号码" prop="template">
        <span>13612351254</span>
        <el-button type="text" @click="pickTemp">修改</el-button>
      </el-form-item>
      <el-form-item label="验证码" prop="provider">
        <el-input style="width: 160px;" v-model="formModel.provider" />
        <el-button type="default" @click="pickProvider">获取验证码</el-button>
      </el-form-item>
    </el-form>
    <div style="text-align:center;">
      <el-button type="primary" @click="$emit('next')">下一步</el-button>
      <el-button @click="$emit('cancel')">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formModel: {
        tel: '',
        captcha: ''
      }
    }
  }
}
</script>

<style scoped>
.form {
  margin: 20px auto;
  width: 400px;
}
</style>

