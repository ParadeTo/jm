<template>
  <div class="app-container">
    <!-- <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="角色名称">
        <el-input v-model="query.code" placeholder="" />
      </el-form-item>
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-form> -->

    <el-row>
      <el-button type="primary" v-waves icon="el-icon-plus" @click="dialogVisible=true">新增行业</el-button>
    </el-row>

    <el-dialog title="新增行业" :visible.sync="dialogVisible">
      <el-form :rules="rules" ref="dataForm" :model="formModel" label-position="right" label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="150px" :key="index" v-for="(field, index) in formFields" :label="field.label" :prop="field.key">
          <el-input style="width: 160px;" v-model="formModel[field.key]" />
        </el-form-item>
        <el-form-item label="商品品类（多选）" label-width="150px">
          <el-select multiple clearable @change='handleFilter' style="width: 180px" v-model="query.type">
            <el-option v-for="item in typeList" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" label-width="150px">
          <el-select clearable @change='handleFilter' style="width: 180px" v-model="query.status">
            <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add">确认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
      style="margin-top: 20px;"
    >
      <el-table-column slot="action" align="center" label="动作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button type="text" size="mini" @click="view(scope.row)">查看</el-button> -->
          <el-button type="text" size="mini" @click="edit(scope.row)">修改</el-button>
          <el-button type="text" size="mini" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      dialogVisible: false,
      query: {
        name: '',
        status: '',
        type: ''
      },
      typeList: [{
        label: '衣服',
        key: '0'
      }, {
        label: '食品',
        key: '1'
      }],
      statusList: [{
        label: '正常',
        key: '0'
      }, {
        label: '失效',
        key: '1'
      }],
      cols: [{
        key: 'name',
        label: '行业名称'
      }, {
        key: 'charge',
        label: '提现手续费'
      }, {
        key: 'status',
        label: '状态'
      }, {
        key: 'time',
        label: '创建时间'
      }],
      formFields: [{
        label: '名称',
        key: 'name'
      }, {
        label: '提现手续费',
        key: 'charge'
      }],
      formModel: {

      }
    }
  },

  methods: {
    handleFilter () {

    },
    edit () {
      this.dialogVisible = true
    },
    view () {
      this.dialogVisible = true
    },
    del () {},
    async updateTableFunc ({page, limit}) {
     
    },
  }
}
</script>

