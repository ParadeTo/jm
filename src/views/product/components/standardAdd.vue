<template>
  <div>
    <el-dialog title="新增商品规格" :visible="dialogVisible" width="400px" @close="cancel">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="formModel"
        label-position="right"
        label-width="100px"
        style='width: 300px; margin-left:20px;'
      >
        <el-form-item label="规格名称" prop="name">
          <el-input style="width: 160px;" v-model="formModel.name" />
        </el-form-item>
        <el-form-item label="规格排序" prop="category">
          <el-select style="width: 130px" v-model="formModel.category">
            <el-option v-for="item in rankList" :key="item.key" :label="item.label" :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上级名称" prop="parent">
          <el-select style="width: 130px" v-model="formModel.parent">
            <el-option :style="`padding-left: ${item.level * 10 + 10}px`" v-for="item in treeList" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
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
export default {
  props: ['dialogVisible'],
  data () {
    return {
      rankList: [],
      formModel: {
        img: '',
        name: '',
        sort: '',
        parent: ''
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

  methods: {
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

