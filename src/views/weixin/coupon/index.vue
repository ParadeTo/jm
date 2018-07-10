<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="query.name" placeholder="" />
      </el-form-item>
      <el-form-item label="优惠券状态">
        <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.status">
          <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="优惠时间">
        <el-date-picker
          placeholder="订单时间"
          v-model="query.daterange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-form>

    <el-row>
      <el-button type="primary" v-waves icon="el-icon-plus" @click="dialogVisible=true">添加</el-button>
      <el-button type="primary" v-waves icon="el-icon-goods" @click="putOn">上架</el-button>
      <el-button type="primary" v-waves icon="el-icon-sold-out" @click="putOff">下架</el-button>
    </el-row>

    <el-dialog title="新增优惠券" :visible.sync="dialogVisible">
      <el-form :rules="rules" ref="dataForm" :model="formModel" label-position="right" label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item :key="index" v-for="(field, index) in formFields" :label="field.label" :prop="field.key">
          <el-input style="width: 160px;" v-model="formModel[field.key]" />
        </el-form-item>
        <el-form-item label="优惠金额">
          满 <el-input v-model="formModel.full" style="width: 100px" placeholder="" /> 减 <el-input style="width: 100px" v-model="formModel.minus" placeholder="" />
        </el-form-item>
        <el-form-item label="优惠时间">
          <el-date-picker
            placeholder="订单时间"
            v-model="formModel.daterange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="适用城市">
          <el-tree show-checkbox :data="cityTree"></el-tree>
        </el-form-item>
        <el-form-item label="适用行业">
          <el-tree show-checkbox :data="industryTree"></el-tree>
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
      :hasSelection="true"
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
import { fetchList } from '@/api/article'

export default {
  data () {
    return {
      dialogVisible: false,
      query: {
        name: '',
        status: '',
        range: ''
      },
      statusList: [{
        label: '可用',
        key: 1
      }, {
        label: '禁用',
        key: 0
      }],
      cols: [{
        key: 'name',
        label: '优惠券名称'
      }, {
        key: 'money',
        label: '优惠金额'
      }, {
        key: 'issuedNumber',
        label: '发放数量'
      }, {
        key: 'receivedNumber',
        label: '领取数量'
      }, {
        key: 'status',
        label: '优惠券状态'
      }, {
        key: 'startTime',
        label: '开始时间'
      }, {
        key: 'endTime',
        label: '结束时间'
      }, {
        key: 'city',
        label: '适用城市'
      }, {
        key: 'industry',
        label: '使用行业'
      }, {
        key: 'createTime',
        label: '创建时间'
      }],
      formFields: [{
        key: 'name',
        label: '优惠券名称'
      }, {
        key: 'money',
        label: '优惠金额'
      }, {
        key: 'issuedNumber',
        label: '发放数量'
      }, {
        key: 'receivedNumber',
        label: '领取数量'
      }],
      formModel: {
        name: '',
        money: '',
        issuedNumber: '',
        receivedNumber: '',
        full: '',
        minus: '',
        daterange: ''
      },
      cityTree: [{
        label: '中国',
        children: [{
          label: '广东省',
          children: [{
            label: '广州市'
          }, {
            label: '深圳市'
          }]
        }, {
          label: '湖南省',
          children: [{
            label: '长沙市'
          }, {
            label: '娄底市'
          }]
        }]
      }],
      industryTree: [{
        label: '衣服'
      }, {
        label: '汽配'
      }]
    }
  },

  methods: {
    handleFilter () {

    },
    putOn () {

    },
    putOff () {

    },
    edit () {
      this.dialogVisible = true
    },
    view () {
      this.dialogVisible = true
    },
    del () {},
    async updateTableFunc ({page, limit}) {
      const response = await fetchList({page, limit})
      return {
        list: response.data.items,
        total: response.data.total
      }
    },
  }
}
</script>

