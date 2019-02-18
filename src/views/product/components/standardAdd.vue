<template>
  <div>
    <el-dialog title="新增商品规格" :visible="dialogVisible" width="800px" @close="cancel">
      <el-form
        ref="dataForm"
        :model="formModel"
        label-position="right"
        label-width="100px"
        style='width: 600px; margin-left:20px;'
      >
        <el-form-item label="类别" prop="name">
          <category-select v-model="formModel.cateId" />
        </el-form-item>
        <el-form-item label="规格名称" prop="name">
          <el-input style="width: 160px;" v-model="formModel.name" />
        </el-form-item>
        <!-- <el-form-item label="规格排序" prop="category">
          <el-select style="width: 130px" v-model="formModel.category">
            <el-option v-for="item in rankList" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item> -->
        <el-form-item label="添加规格值">
          <el-row :key="index" v-for="(attr, index) in attrValueList" style="margin-top: 10px;">
            <el-col :span="12">
              值：<el-input style="width: 160px;" v-model="attr.name" />
            </el-col>
            <el-col :span="12">
              排序:
              <el-select style="width: 130px" v-model="attr.orderNo">
                <el-option v-for="item in rankList" :key="item" :label="item" :value="item" />
              </el-select>
            </el-col>
          </el-row>
          <i class="el-icon-circle-plus icon" @click="addAttr">新增规格值</i>
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
import { addAttribute, editAttribute, getAttribute } from '@/api/product/attribute'

export default {
  props: ['dialogVisible', 'id'],
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
    dialogVisible (val) {
      if (val) {
        getAttribute(this.id)
      }
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
    confirm () {
      this.$refs['dataForm'].validate()
      this.setInVisible('confirm')
      const { formModel, attrValueList } = this
      console.log(this.formModel)
      console.log(this.attrValueList)
      addAttribute({ ...formModel, attrValueList })
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
