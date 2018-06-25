<template>
  <div class="app-container">
    <el-form :rules="rules" ref="dataForm" :model="formModel" label-position="right" label-width="200px">
      <el-form-item label="收款人姓名" prop="template">
        <el-input style="width: 200px;" v-model="formModel.name" />
      </el-form-item>
      <el-form-item label="银行卡号" prop="provider">
        <el-input style="width: 200px;" v-model="formModel.card" />
      </el-form-item>
      <el-form-item label="开户地" prop="range">
        <my-address />
      </el-form-item>
      <el-form-item label="银行名称" prop="contact">
        <el-input style="width: 160px;" v-model="formModel.name" />
      </el-form-item>
      <el-form-item label="验证手机" prop="way">
        <span>18611112949</span>
        <el-button type="text">修改</el-button>
      </el-form-item>
      <el-form-item label="手机验证码" prop="way">
        <el-input style="width: 200px;" v-model="formModel.name" />
        <el-button @click="sendCaptcha">发送验证码</el-button>
      </el-form-item>
    </el-form>

    <div>
      <el-button type="primary" @click="submit" style="margin-left: 200px;">提交审核</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formModel: {
        name: '',
        description: '',
        range: '',
        contact: '',
        way: '',
        addressDetail: ''
      },
      rules: {}
    }
  },

  methods: {
    submit () {

    },
    cancel () {}
  }
}
</script>

