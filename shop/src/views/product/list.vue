<template>
  <div class="app-container">
    <el-row>
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 200px;"
        placeholder="商品名称"
        v-model="query.name" />
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 200px;"
        placeholder="商品条码"
        v-model="query.code" />
      <el-select @change='handleFilter' style="width: 130px" v-model="query.category" placeholder="商品类目">
        <el-option v-for="item in typeList" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 130px" v-model="query.brand" placeholder="商品品牌">
        <el-option v-for="item in brandList" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 130px" v-model="query.type" placeholder="商品类型">
        <el-option v-for="item in typeList" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 130px" v-model="query.status" placeholder="上/下架">
        <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-row>

    <el-row style="margin-top: 10px; margin-bottom: 10px;">
      <el-button type="primary" v-waves @click="add">新增商品</el-button>
      <el-button type="danger" v-waves @click="del">删除商品</el-button>
      <el-button type="success" v-waves @click="impt">导入商品</el-button>
      <el-button type="default" v-waves @click="toggleOnOff">上/下架</el-button>
      <el-button type="default" v-waves @click="autoOnOff">自动上下架</el-button>
      <el-button type="default" v-waves @click="setting">参数设置</el-button>
    </el-row>

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
    >
      <el-table-column slot="action" align="center" label="动作" min-width="140" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
          <el-button type="default" size="mini" @click="edit(scope.row)">修改</el-button>
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
      query: {
        name: '',
        code: '',
        category: '',
        brand: '',
        type: '',
        status: ''
      },
      typeList: [{
        key: 0,
        label: '全部'
      }],
      brandList: [{
        key: 0,
        label: '全部'
      }],
      typeList: [{
        key: 0,
        label: '全部'
      }],
      statusList: [{
        key: 0,
        label: '上架'
      }],
      cols: [{
        label: '条码',
        key: 'number'
      }, {
        label: '商品图片',
        key: 'img'
      }, {
        label: '商品名称',
        key: 'name'
      }, {
        label: '商品品牌',
        key: 'brand'
      }, {
        label: '商品类目',
        key: 'img'
      }, {
        label: '商品分类',
        key: 'img'
      }, {
        label: '单位',
        key: 'img'
      }, {
        label: '库存',
        key: 'img'
      }, {
        label: '销售价',
        key: 'img'
      }, {
        label: '上下架状态',
        key: 'img'
      }]
    }
  },

  methods: {
    handleFilter () {

    },
    add () {
      this.$router.push({name: 'productAdd'})
    },
    view () {

    },
    edit () {

    },
    async updateTableFunc ({page, limit}) {
      const response = await fetchList({page, limit})
      return {
        list: response.data.items,
        total: response.data.total
      }
    }
  }
}
</script>

<style scoped>

</style>

