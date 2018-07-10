<template>
  <div>
    <el-dialog title="添加员工" :visible="dialogVisible" width="440px" @close="cancel">
      <div v-if="step===0">
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="formModel"
          label-position="right"
          label-width="100px"
          style='width: 300px; margin-left:20px;'
        >
          <el-form-item label="手机号" prop="phone">
            <el-input style="width: 195px;" v-model="formModel.phone" />
          </el-form-item>
          <el-form-item label="验证码" prop="captcha">
            <el-input style="width: 80px;" v-model="formModel.captcha" />
            <el-button type="primary" v-waves @click="getCaptcha">获取验证码</el-button>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: right;">
          <el-button type="primary" @click="step=1">下一步</el-button>
          <el-button @click="cancel">返回</el-button>
        </div>
      </div>
      <div v-else>
        <el-form
          ref="dataForm"
          :rules="rules"
          :model="formModel"
          label-position="right"
          label-width="100px"
          style='width: 300px; margin-left:20px;'
        >
          <el-form-item label="设置权限" prop="phone">
            <el-select clearable style="width: 130px" v-model="formModel.cashier" placeholder="请选择权限">
              <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: right;">
          <el-button type="primary" @click="complete">完成</el-button>
          <el-button @click="step=0">返回</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['dialogVisible'],
  data () {
    return {
      step: 0,
      formModel: {
        phone: '',
        captcha: ''
      },
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: ['blur', 'change'] }],
        category: [{ required: true, message: '请选择类目', trigger: 'change' }],
        parent: [{ required: true, message: '请选择上级类目', trigger: 'change' }]
        // category: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        // parent: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        // address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        // scope: [{ required: true, message: '请输入经营范围', trigger: 'blur' }],
      },
      forFields: [{
        key: 'name',
        label: '名称'
      }, {
        key: 'category',
        label: '所属类目'
      }, {
        key: 'parent',
        label: '上级名称'
      }],
      categoryList: [{
        key: 0,
        label: '全部'
      }],
      treeList: [{
        key: '1',
        label: '日用百货',
        level: 0
      }, {
        key: '2',
        label: '衣物清洁',
        level: 1
      }, {
        key: '3',
        label: '洗涤液',
        level: 2
      }]
    }
  },

  methods: {
    complete () {

    },
    setInVisible (type) {
      this.$emit('close', type)
    },
    cancel () {
      this.setInVisible('cancel')
    },
    confirm () {
      this.$refs['dataForm'].validate()
      this.setInVisible('confirm')
    }
  }
}
</script>

