<template>
  <!-- 历史进价 -->
  <div class="app-container">
    <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="商品条码" v-model="query.number" />
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" placeholder="商品名称" v-model="query.number" />
        <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.status" placeholder="商品品牌">
          <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
        <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </div>

    <el-row style="margin-bottom: 20px;">
      <el-button type="primary" v-waves icon="el-icon-plus" @click="addOrder">选择门店商品</el-button>
    </el-row>

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
    >
      <el-table-column slot="action" align="center" label="操作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="mini" @click="view(scope.row)">修改</el-button> -->
          <el-button type="primary" size="mini" @click="del(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<script>


// 改造成公共的组件
export default {
  data () {
    return {
      query: {
        number: '',
        daterange: '',
        status: ''
      },
      statusList: [{
        key: 0,
        label: '全部'
      }],
      cols: [{
        key: 'code',
        label: '时间'
      }, {
        key: 'operator',
        label: '进货价'
      }]
    }
  },

  methods: {
    handleFilter () {},
    addOrder () {
      this.$router.push({ name: 'cargoOrderAdd' })
    },
    orderTemp () {
      this.$router.push({ name: 'cargoOrderTemp' })
    },
    async updateTableFunc ({page, limit}) {
      
    }
  }
}
</script>

<style scoped>

</style>



