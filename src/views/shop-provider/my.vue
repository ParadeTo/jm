<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="供应商名称" v-model="query.name">
      </el-input>
      <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.type" placeholder="供应商类型">
        <el-option v-for="item in typeList" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
      <el-button type="success" v-waves @click="openDialog">新增供应商</el-button>
    </div>

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
    >
      <el-table-column slot="action" align="center" label="操作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
          <el-button type="primary" size="mini" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </my-table>

    <el-dialog title="新增供应商" :visible.sync="dialogVisible">
      <el-form :rules="rules" ref="dataForm" :model="formModel" label-position="right" label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item :key="index" v-for="(field, index) in formFields" :label="field.label" :prop="field.key">
          <el-input style="width: 160px;" v-model="formModel[field.key]" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add">确认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>


export default {
  data () {
    return {
      query: {
        name: '',
        type: ''
      },
      dialogVisible: false,
      formModel: {
        name: '',
        contact: '',
        phone: '',
        address: '',
        scope: ''
      },
      formFields: [{
        key: 'name',
        label: '供应商名称'
      }, {
        key: 'contact',
        label: '联系人'
      }, {
        key: 'phone',
        label: '联系电话'
      }, {
        key: 'address',
        label: '地址'
      }, {
        key: 'scope',
        label: '经营范围'
      }],
      rules: {
        name: [{ required: true, message: '请输入供应商名称', trigger: 'blur' }],
        contact: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
        scope: [{ required: true, message: '请输入经营范围', trigger: 'blur' }],
      },
      typeList: [{
        key: 0,
        label: '全部'
      }],
      cols: [{
        key: 'name',
        label: '供应商名称'
      }, {
        key: 'contact',
        label: '联系人'
      }, {
        key: 'phone',
        label: '联系电话'
      }, {
        key: 'industry',
        label: '行业'
      }, {
        key: 'type',
        label: '类型'
      }, {
        key: 'name',
        label: '应付'
      }]
    }
  },

  methods: {
    handleFilter () {

    },
    view () {
      this.$router.push({ name: 'providerDetail', params: { id: 1 } })
    },
    del () {

    },
    add () {
      this.$refs['dataForm'].validate()
    },
    openDialog () {
      this.dialogVisible = true
    },
    async updateTableFunc ({page, limit}) {
      
    }
  }
}
</script>

<style scoped>

</style>

