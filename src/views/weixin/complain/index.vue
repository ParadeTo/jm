<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="门店">
        <el-input v-model="query.shop" placeholder="" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.status">
          <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-form>

    <el-dialog title="新增优惠券" :visible.sync="dialogVisible">
      <el-form :rules="rules" ref="dataForm" :model="formModel" label-position="right" label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item :key="index" v-for="(field, index) in formFields" :label="field.label" :prop="field.key">
          <span style="width: 160px;">{{formModel[field.key]}}</span>
        </el-form-item>
        <el-form-item label="回复内容" :prop="replyContent">
           <textarea class="el-input__inner" v-model="formModel.replyContent" />
        </el-form-item>
        <el-form-item label="处理结果" :prop="replyContent">
          <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.status">
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
      <el-table-column slot="action" align="center" label="操作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="view(scope.row)">查看</el-button>
          <el-button type="text" size="mini" @click="handle(scope.row)">处理</el-button>
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
        shop: '',
        status: ''
      },
      statusList: [{
        label: '全部',
        key: 1
      }, {
        label: '处理',
        key: 0
      }],
      cols: [{
        key: 'name',
        label: '投诉人'
      }, {
        key: 'shop',
        label: '投诉门店'
      }, {
        key: 'time',
        label: '投诉时间'
      }, {
        key: 'content',
        label: '投诉内容'
      }, {
        key: 'status',
        label: '状态'
      }, {
        key: 'handler',
        label: '处理人'
      }, {
        key: 'replyContent',
        label: '回复内容'
      }, {
        key: 'replyTime',
        label: '回复时间'
      }, {
        key: 'result',
        label: '处理结果'
      }],
      formFields: [{
        key: 'name',
        label: '投诉人'
      }, {
        key: 'shop',
        label: '投诉门店'
      }, {
        key: 'time',
        label: '投诉时间'
      }, {
        key: 'content',
        label: '投诉内容'
      }],
      formModel: {
        name: '',
        shop: '',
        time: '',
        content: '',
        replayContent: ''
      }
    }
  },

  methods: {
    handleFilter () {

    },
    view () {
      this.dialogVisible = true
    },
    handle () {
      this.dialogVisible = true
    },
    del () {},
    async updateTableFunc ({page, limit}) {
      
    },
  }
}
</script>

