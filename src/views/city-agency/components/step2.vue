<template>
  <div>
    <p style="text-align:center;">
      <span class="item">
        <label>联系人：</label>
        xxx
      </span>
      <span class="item">
        <label>联系方式：</label>
        123456789465
      </span>
      <span class="item">
        <label>公司：</label>
        xxx有限公司
      </span>
    </p>
    <info-list />
    <p>* 请完善所有企业信息，陈列照片必须5张以上</p>
    <div style="text-align:center;">
      <el-button type="primary" @click="$emit('next')">提交申请</el-button>
      <el-button @click="$emit('cancel')">取消</el-button>
    </div>
  </div>
</template>

<script>
import InfoList from '@/views/setting/shop/components/infoList'

export default {
  components: {
    InfoList
  },

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
.item {
  margin-right: 20px;
}
</style>

