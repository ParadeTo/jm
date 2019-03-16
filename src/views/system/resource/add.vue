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
        <el-form-item label="父节点" v-if="parent && parent.id !== -1">
          {{parent.name}}
        </el-form-item>
        <el-form-item label="资源类型" prop="type">
          <resource-type-select v-model="formModel.type" :disabled="view" />
        </el-form-item>
        <!-- <el-form-item label="父节点" prop="parentId">
          <el-tree
            :data="treeData"
            :props="treeProps"
            :expand-on-click-node="false"
            node-key="id"
            ref="tree"
          >
            <span slot-scope="{ node, data }">
              <input
                type="checkbox"
                :ref="`node${data.id}`"
                :checked="resource.parentId === data.id"
                @change="() => onCheckChange(node, data)">
              {{ data.name }}
            </span>
          </el-tree>
        </el-form-item> -->
        <el-form-item label="资源编码" prop="code">
          <el-input style="width: 160px;" v-model="formModel.code" :readonly="view" />
        </el-form-item>
        <el-form-item label="资源名称" prop="name">
          <el-input style="width: 160px;" v-model="formModel.name" :readonly="view" />
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
import { addResource } from '@/api/ma/resource'
import { resourceType } from '@/const'

export default {
  props: [
    'dialogVisible',
    'resource',
    'action',
    // 'treeProps',
    // 'treeData',
    'parent',
    'systemId'
  ],
  data () {
    const trigger = ['blur', 'change']
    return {
      formModel: {
        code: '',
        name: '',
        type: '',
        icon: '',
        path: '',
        systemId: 1,
      },
      rules: {
        systemId: [{ required: true, message: '请选择所属平台' }],
        code: [{ required: true, message: '请输入资源编码', trigger }],
        name: [{ required: true, message: '请输入资源名称', trigger }],
        type: [{ required: true, message: '请选择资源类型', trigger }],
        path: [{ required: true, message: '请输入资源路径', trigger }],
        icon: [{ required: true, message: '请输入资源样式', trigger }]
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
    traveseData (data, callback) {
      data.forEach(d => {
        callback(d)
        if (Array.isArray(d.childrenList)) {
          this.traveseData(d.childrenList, callback)
        }
      })
    },
    onCheckChange (node, data) {
      let checked = this.$refs[`node${data.id}`].checked
      this.formModel.parentId = checked ? data.id : null
      this.traveseData(this.treeData, item => {
        if (item.id !== data.id && this.$refs[`node${item.id}`]) {
          this.$refs[`node${item.id}`].checked = false
        }
      })
      this.$refs['dataForm'].validateField('parentId')
    },
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
      try {
        if(!await this.$refs['dataForm'].validate()) return
        const { formModel, id, parentId } = this
        if (this.action === 'edit') {
          await editBrand({ id, ...formModel })
        } else {
          await addResource({ ...formModel, parentId })
        }
        this.setInVisible('confirm')
      } catch (error) {
        console.log(error)
      }
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
