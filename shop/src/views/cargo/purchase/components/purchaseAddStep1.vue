<template>
  <div>
    <el-form :rules="rules" ref="dataForm" :model="formModel" label-position="right" label-width="100px">
      <p>选择收货交易单</p>
      <el-form-item label="收货交易单" prop="order">
        <el-input style="width: 160px;" v-model="formModel.order" />
        <el-button type="default" @click="pickTemp">选择模板</el-button>
      </el-form-item>
      <p>选择线下供应商</p>
      <el-form-item label="线下供应商" prop="provider">
        <el-input style="width: 160px;" v-model="formModel.provider" />
        <el-button type="default" @click="pickProvider">选择供应商</el-button>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="next" style="margin-left: 200px;">下一步</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formModel: {
        order: '',
        provider: ''
      }
    }
  },

  methods: {
    pickTemp () {},
    pickProvider () {},
    next () {
      this.$emit('next')
    },
    cancel () {}
  }
}
</script>

