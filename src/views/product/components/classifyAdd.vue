<template>
  <div>
    <el-dialog :title="title" :visible="dialogVisible" width="400px" @close="cancel">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="formModel"
        label-position="right"
        label-width="100px"
        style='width: 300px; margin-left:20px;'
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
        <el-form-item label="名称" prop="name">
          <el-input style="width: 160px;" v-model="formModel.name" :readonly="view" />
        </el-form-item>
        <!-- <el-form-item label="所属类目" prop="category">
          <category-select style="width: 130px" v-model="ancestorClassify.id" />
        </el-form-item> -->
        <el-form-item label="上级名称" prop="parent" v-if="parentClassify && parentClassify.name">
          <el-input type="text" readonly v-model="parentClassify.name" />
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
import { addClassify, editClassify } from '@/api/product/classify'

export default {
  props: {
    'dialogVisible': {
      type: Boolean
    },
    'classify': {
      type: Object,
      default: () => ({})
    },
    'parentClassify': {
      type: Object,
      default: () => ({})
    },
    'ancestorClassify': {
      type: Object,
      default: () => ({})
    },
    'action': {
      type: String,
      default: 'view'
    }
  },
  data () {
    return {
      formModel: {
        name: this.action !== 'add' ? (this.classify && this.classify.name) : '',
        // category: '',
        // parent: ''
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

  watch: {
    classify (val) {
      if (this.action !== 'add') {
        if(val) this.formModel.name = val.name
      } else {
        this.formModel.name = ''
      }
    }
  },

  computed: {
    title() {
      return {'edit':'修改','add':'新增','view':'查看'}[this.action] + '分类'
    },
    view() {
      return this.action === 'view'
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
      try {
        if(!await this.$refs['dataForm'].validate()) return
        const { formModel, classify: { id } } = this
        if (this.action === 'edit') {
          await editClassify({ id, ...formModel })
        } else {
          await addClassify({ ...formModel, parentId: id })
        }
        this.setInVisible('confirm')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

