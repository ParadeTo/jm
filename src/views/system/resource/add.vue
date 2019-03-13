<template>
  <div>
    <el-dialog :title="title" :visible="dialogVisible" width="800px" @close="cancel">
      <el-form
        ref="dataForm"
        :model="formModel"
        :rules="rules"
        label-position="right"
        label-width="100px"
        style='width: 600px; margin-left:20px;'
      >
        <el-form-item label="资源编码" prop="code">
          <el-input style="width: 160px;" v-model="formModel.code" :readonly="view" />
        </el-form-item>
        <el-form-item label="资源名称" prop="name">
          <el-input style="width: 160px;" v-model="formModel.name" :readonly="view" />
        </el-form-item>
        <el-form-item label="资源类型" prop="type" :readonly="view">
          <system-select v-model="formModel.type" />
        </el-form-item>
        <el-form-item label="资源路径" prop="path">
          <el-input style="width: 160px;" v-model="formModel.path" :readonly="view" />
        </el-form-item>
        <el-form-item label="资源样式" prop="path">
          <el-input style="width: 160px;" v-model="formModel.icon" :readonly="view" />
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
  props: ['dialogVisible', 'resource', 'action'],
  data () {
    const trigger = ['blur', 'change']
    return {
      formModel: {
        code: '',
        name: '',
        type: ''
      },
      rules: {
        code: [{ required: true, message: '请输入资源编码', trigger }],
        name: [{ required: true, message: '请输入资源名称', trigger }],
      }
    }
  },

  watch: {
    resource (val) {
      if (val) this.formModel = val
    },
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
      return {'edit':'修改','add':'新增','view':'查看'}[this.action] + '资源'
    },
    view() {
      return this.action === 'view'
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
