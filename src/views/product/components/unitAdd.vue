<template>
  <div>
    <el-dialog :title="title" :visible="dialogVisible" width="800px" @close="cancel">
      <el-form
        ref="dataForm"
        :model="formModel"
        label-position="right"
        label-width="100px"
        style='width: 600px; margin-left:20px;'
        :rules="rules"
      >
        <el-form-item label="单位名称" prop="name">
          <el-input style="width: 160px;" v-model="formModel.name" :readonly="action==='view'" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="action!=='view'">
        <el-button type="primary" @click="confirm" :disabled="!formModel.name">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addUnit, editUnit, getUnit } from '@/api/product/unit'

export default {
  props: ['dialogVisible', 'id', 'action'],
  data () {
    return {
      formModel: {
        name: '',
      },
      rules: {
        name: [{ required: true, message: '请输入单位名称', trigger: ['blur', 'change'] }],
      }
    }
  },

  watch: {
    async dialogVisible (val) {
      if (this.action === 'add') {
        this.formModel = { name: '' }
      }
      if (val && this.action !== 'add') {
        const rsp = await getUnit(this.id)
        const data = rsp.data.data
        this.formModel.name = data.name
      }
    }
  },

  computed: {
    title() {
      return {'edit':'修改','add':'新增','view':'查看'}[this.action] + '商品单位'
    }
  },

  methods: {
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
        await editUnit({ id, ...formModel })
      } else {
        await addUnit({ ...formModel })
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
