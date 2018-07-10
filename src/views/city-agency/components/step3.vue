<template>
  <div>
    <el-card shadow="always" class="card">
      <p>城市代理商申请</p>
      <h3>提交成功</h3>
      <p>工作人员将会在3到7个工作日与您联系。</p>
      <p>客服电话：020-522255</p>
    </el-card>
    <div style="text-align:center;">
      <el-button type="primary" @click="$emit('next')">完成</el-button>
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
.card {
  width: 500px;
  text-align: center;
  margin: 20px auto;
}
.card h3 {
  font-size: 2rem;
  color: #66b1ff;
}
</style>

