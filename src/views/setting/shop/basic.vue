<template>
  <div class="app-container">
    <el-form :rules="rules" ref="dataForm" :model="formModel" label-position="right" label-width="200px">
      <el-form-item label="店铺名称" prop="template">
        <el-input style="width: 160px;" v-model="formModel.name" />
      </el-form-item>
      <el-form-item label="店铺介绍" prop="provider">
        <textarea v-model="formModel.description" style="width:60%; height:100px" class="el-input__inner" rows="20"></textarea>
      </el-form-item>
      <el-form-item label="营业时间" prop="range">
        <el-time-picker
          is-range
          v-model="formModel.range"
          format="HH:mm"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围" />
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input style="width: 160px;" v-model="formModel.name" />
      </el-form-item>
      <el-form-item label="联系方式" prop="way">
        <el-input style="width: 160px;" v-model="formModel.name" />
      </el-form-item>
      <el-form-item label="详细地址" prop="way">
        <my-address />
        <p>
          <el-input style="width: 260px;" v-model="formModel.addressDetail" />
        </p>
      </el-form-item>
    </el-form>

    <div>
      <el-button type="primary" @click="save" style="margin-left: 200px;">保存</el-button>
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
    save () {

    },
    cancel () {}
  }
}
</script>

