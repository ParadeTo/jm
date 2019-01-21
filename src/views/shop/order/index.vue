<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item :key="index" :label="field.label" v-for="(field, index) in queryFields">
        <el-input v-model="query[field.key]" placeholder="" />
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select multiple clearable @change='handleFilter' style="width: 180px" v-model="query.type">
          <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="下单时间">
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

    <!-- // <el-row>
    //   <el-button type="primary" v-waves icon="el-icon-plus" @click="dialogVisible=true">新增行业</el-button>
    // </el-row> -->

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
      queryFields: [{
        label: '下单人',
        key: 'buyer'
      }, {
        label: '收货人',
        key: 'consignee'
      }, {
        label: '联系电话',
        key: 'phone'
      }, {
        label: '订单号',
        key: 'number'
      }, {
        label: '门店',
        key: 'shop'
      }],
      query: {
        name: '',
        status: '',
        type: '',
        daterange: ''
      },
      statusList: [{
        label: '正常',
        key: '0'
      }, {
        label: '失效',
        key: '1'
      }],
      cols: [{
        key: 'shop',
        label: '门店'
      }, {
        key: 'number',
        label: '订单号'
      }, {
        key: 'buyer',
        label: '下单人'
      }, {
        key: 'cashType',
        label: '收款方式'
      }, {
        key: 'shipMethod',
        label: '配送方式'
      }, {
        key: 'product',
        label: '订单商品'
      }, {
        key: 'shr',
        label: '收货人'
      }, {
        key: 'phone',
        label: '联系电话'
      }, {
        key: 'address',
        label: '收货地址'
      }, {
        key: 'status',
        label: '订单状态'
      }, {
        key: 'coupon',
        label: '优惠券'
      }, {
        key: 'discount',
        label: '优惠金额'
      }, {
        key: 'price',
        label: '支付金额'
      }, {
        key: 'score',
        label: '获得积分'
      }, {
        key: 'time',
        label: '下单时间'
      }, {
        key: 'payTime',
        label: '支付时间'
      }, {
        key: 'sftk',
        label: '是否有退款'
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

