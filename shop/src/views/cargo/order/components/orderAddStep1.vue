<template>
  <div>
    <el-form :rules="rules" ref="dataForm" :model="formModel" label-position="right" label-width="100px">
      <p>选择订单模板</p>
      <el-form-item label="模板" prop="template">
        <el-input style="width: 160px;" v-model="formModel.template" />
        <el-button type="default" @click="pickTemp">选择模板</el-button>
      </el-form-item>
      <p>选择供应商</p>
      <el-form-item label="供应商" prop="provider">
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
        template: '',
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

