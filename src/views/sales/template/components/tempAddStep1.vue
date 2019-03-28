<template>
  <div>
    <el-form :rules="rules" ref="dataForm" :model="formModel" label-position="right" label-width="100px">
      <el-form-item label="模板名称" prop="name">
        <el-input style="width: 160px;" v-model="formModel.name" />
      </el-form-item>
      <el-form-item label="门店" prop="provider">
        <el-input style="width: 160px;" v-model="formModel.customer" />
        <el-button type="default" @click="pickProvider">选择门店</el-button>
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
        name: '',
        customer: ''
      }
    }
  },

  methods: {
    pickTemp () {},
    pickCustomer () {},
    next () {
      this.$emit('next')
    },
    cancel () {}
  }
}
</script>

