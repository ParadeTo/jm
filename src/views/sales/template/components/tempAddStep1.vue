<template>
  <div>
    <el-form :rules="rules" ref="dataForm" :model="formModel" label-position="right" label-width="100px">
      <el-form-item label="模板名称" prop="name">
        <el-input style="width: 160px;" v-model="formModel.name" />
      </el-form-item>
      <el-form-item label="门店" prop="provider">
        <el-input style="width: 160px;" readonly v-model="formModel.customer.name" />
        <el-button type="default" @click="pickCustomer">选择门店</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="选择门店" :visible.sync="dialogVisible" width="80%" style="max-height: 90vh;">
      <my-customer isForSelect @current-change="handleCurrentChange"/>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </div> -->
    </el-dialog>

    <div>
      <el-button type="primary" @click="next" style="margin-left: 200px;">下一步</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
import MyCustomer from '@/views/client/my'

export default {
  components: {
    MyCustomer
  },
  data () {
    return {
      dialogVisible: false,
      formModel: {
        name: '',
        customer: ''
      },
      rules: {
        name: [],
        customer: []
      },
      selectedData: []
    }
  },

  methods: {
    pickTemp () {},
    pickCustomer () {
      this.dialogVisible = true
    },
    next () {
      this.$emit('next')
    },
    cancel () {},
    confirm () {},
    handleCurrentChange (data) {
      if (data) {
        this.dialogVisible = false
        this.formModel.customer = data
      }
    }
  }
}
</script>

