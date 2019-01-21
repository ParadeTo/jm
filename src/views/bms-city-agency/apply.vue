<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" v-waves icon="el-icon-tickets">申请列表</el-button>
      <el-button type="primary" v-waves icon="el-icon-">城市代理商管理</el-button>
    </el-row>

    <!-- <el-dialog title="城市代理商审核设置" :visible.sync="dialogVisible">
      <el-form :rules="rules" ref="dataForm" :model="formModel" label-position="right" label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item label-width="150px" :key="index" v-for="(field, index) in formFields" :label="field.label" :prop="field.key">
          <span style="width: 160px;">{{formModel[field.key]}}</span>
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
    </el-dialog> -->

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
      style="margin-top: 20px;"
    >
      <el-table-column slot="action" align="center" label="动作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="view(scope.row)">查看</el-button>
          <!-- <el-button type="text" size="mini" @click="edit(scope.row)">修改</el-button> -->
          <!-- <el-button type="text" size="mini" @click="del(scope.row)">删除</el-button> -->
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
        key: 'time',
        label: '时间'
      }, {
        key: 'corporate',
        label: '公司名称'
      }, {
        key: 'name',
        label: '姓名'
      }, {
        key: 'method',
        label: '联系方式'
      }, {
        key: 'status',
        label: '状态'
      }],
      formFields: [{
        label: '申请时间',
        key: 'time'
      }, {
        label: '公司',
        key: 'corporate'
      }, {
        label: '联系人',
        key: 'contact'
      }, {
        label: '联系方式',
        key: 'method'
      }, {
        label: '',
        key: 'corporate'
      }, {
        label: '公司',
        key: 'corporate'
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
      this.$router.push({ name: 'bmsCityAgencyAudit', params: { id: 1 } })
    },
    del () {},
    async updateTableFunc ({page, limit}) {

    },
  }
}
</script>

