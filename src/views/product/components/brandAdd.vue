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
        <!-- <el-form-item label="图片" prop="img">
          <el-upload
            style="width:300px;"
            action="https://jsonplaceholder.typicode.com/posts/"
            :limit="1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item> -->
        <el-form-item label="类别" prop="name" v-if="action==='add'">
          <category-select v-model="formModel.cateId" />
        </el-form-item>
        <el-form-item label="品牌名称" prop="name">
          <el-input style="width: 160px;" v-model="formModel.name" :readonly="action==='view'" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="action!=='view'">
        <el-button type="primary" @click="confirm" :disabled="disabled">确认</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addBrand, editBrand, getBrand } from '@/api/product/brand'

export default {
  props: ['dialogVisible', 'id', 'action'],
  data () {
    return {
      rankList: [1, 2, 3, 4, 5],
      formModel: {
        cateId: '',
        name: '',
      },
      rules: {
        name: [{ required: true, message: '请输入商品名称', trigger: ['blur', 'change'] }],
        // category: [{ required: true, message: '请选择类目', trigger: 'change' }],
        // parent: [{ required: true, message: '请选择上级类目', trigger: 'change' }]
        // category: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        // parent: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        // address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        // scope: [{ required: true, message: '请输入经营范围', trigger: 'blur' }],
      },
      attrValueList: [{
        name: '',
        orderNo: 1
      }],
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
      sortList: [{
        key: '0',
        label: '0'
      }],
      treeList: [{
        key: '1',
        label: '1',
      }, {
        key: '2',
        label: '2',
      }, {
        key: '3',
        label: '3',
      }]
    }
  },

  watch: {
    async dialogVisible (val) {
      if (this.action === 'add') {
        this.formModel = {
          cateId: '',
          name: '',
        }
        this.attrValueList = [{
          name: '',
          orderNo: 1
        }]
      }
      if (val && this.action !== 'add') {
        const rsp = await getBrand(this.id)
        const data = rsp.data.data
        this.formModel.name = data.name
        this.formModel.cateId = data.cateId
      }
    }
  },

  computed: {
    title() {
      return {'edit':'修改','add':'新增','view':'查看'}[this.action] + '商品规格'
    },
    disabled () {
      return !this.formModel.cateId || !this.formModel.name
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
        await addBrand({ ...formModel })
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
