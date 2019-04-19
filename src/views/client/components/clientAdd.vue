<template>
  <div>
    <el-dialog title="新增客户" :visible="dialogVisible" width="400px" @close="cancel">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="formModel"
        label-position="right"
        label-width="100px"
        style='width: 300px; margin-left:20px;'
      >
        <el-form-item label="业务类型" prop="businessType">
          <category-select v-model="formModel.businessType" />
        </el-form-item>
        <el-form-item label="经营范围" prop="scopeOfBusiness">
          <el-input style="width: 160px;" v-model="formModel.scopeOfBusiness" />
        </el-form-item>
        <el-form-item label="客户名称" prop="name">
          <el-input style="width: 160px;" v-model="formModel.name" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input style="width: 160px;" v-model="formModel.address" />
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input style="width: 160px;" v-model="formModel.contacts" />
        </el-form-item>
        <el-form-item label="联系电话" prop="contactNumber">
          <el-input style="width: 160px;" v-model="formModel.contactNumber" />
        </el-form-item>
        <el-form-item label="说明" prop="remark">
          <el-input style="width: 160px;" v-model="formModel.remark" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { saveMyMember } from '@/api/ma/member'
import { system } from '@/const'
import { mapGetters } from 'vuex'

export default {
  props: ['dialogVisible'],
  data () {
    return {
      formModel: {
        businessType: '',
        scopeOfBusiness: '',
        name: '',
        contacts: '',
        contactNumber: '',
        address: '',
        remark: '',
      },
      rules: {
        // category: [{ required: true, message: '请选择类目', trigger: 'change' }],
        // parent: [{ required: true, message: '请选择上级类目', trigger: 'change' }]
        // category: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        // parent: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        // address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        // scope: [{ required: true, message: '请输入经营范围', trigger: 'blur' }],
      }
    }
  },

  computed: {
    ...mapGetters('user', [
      'userInfo'
    ])
  },

  methods: {
    setInVisible (type) {
      this.$emit('close', type)
    },
    cancel () {
      this.setInVisible('cancel')
    },
    confirm () {
      this.$refs['dataForm'].validate(async valid => {
        if (valid) {
          saveMyMember({
            online: 2,
            memberId: -1,
            memberType: system.reversedMap[this.userInfo.memberType],
            ...this.formModel
          })
          this.setInVisible('confirm')
        }
      })
    }
  }
}
</script>

