<template>
  <div>
    <el-dialog :title="title" :visible="dialogVisible" width="800px" @close="cancel">
      <el-form
        ref="dataForm"
        :model="formModel"
        label-position="right"
        label-width="100px"
        style='width: 600px; margin-left:20px;'
      >
        <el-form-item label="所属平台" prop="systemId" v-if="action==='add'">
          <system-select v-model="formModel.systemId" />
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode">
          <el-input style="width: 160px;" v-model="formModel.roleCode" :readonly="action==='view'" />
        </el-form-item>
        <el-form-item label="角色名称" prop="name">
          <el-input style="width: 160px;" v-model="formModel.name" :readonly="action==='view'" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="action!=='view'">
        <el-button type="primary" @click="confirm">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addRole, editRole } from '@/api/ma/role'

export default {
  props: ['dialogVisible', 'id', 'action'],
  data () {
    return {
      formModel: {
        systemId: '',
        roleCode: '',
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: ['blur', 'change'] }],
        // category: [{ required: true, message: '请选择类目', trigger: 'change' }],
        // parent: [{ required: true, message: '请选择上级类目', trigger: 'change' }]
        // category: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        // parent: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        // address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        // scope: [{ required: true, message: '请输入经营范围', trigger: 'blur' }],
      }
    }
  },

  watch: {
    async dialogVisible (val) {
      // if (this.action === 'add') {
      //   this.formModel = {
      //     cateId: '',
      //     name: '',
      //   }
      //   this.attrValueList = [{
      //     name: '',
      //     orderNo: 1
      //   }]
      // }
      // if (val && this.action !== 'add') {
      //   const rsp = await getBrand(this.id)
      //   const data = rsp.data.data
      //   this.formModel.name = data.name
      //   this.formModel.cateId = data.cateId
      // }
    }
  },

  computed: {
    title() {
      return {'edit':'修改','add':'新增','view':'查看'}[this.action] + '角色'
    }
  },

  methods: {
    addAttr () {
      this.attrValueList.push({
        name: '',
        rank: 1
      })
    },
    setInVisible (type) {
      this.$emit('close', type)
    },
    cancel () {
      this.setInVisible('cancel')
    },
    async confirm () {
      this.$refs['dataForm'].validate()
      const { formModel, id } = this
      if (this.action === 'edit') {
        await editBrand({ id, ...formModel })
      } else {
        await addRole({ ...formModel })
      }
      this.setInVisible('confirm')
    }
  }
}
</script>
<style scoped>
.icon {
  font-size: 1rem;
}

.icon:hover {
  cursor: pointer;
  color: #409EFF;
}
</style>
