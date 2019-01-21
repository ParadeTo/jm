<template>
  <div class="app-container">
    <el-row>
      <el-col span="10">
        <el-carousel indicator-position="inside">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col span="14">
        <h2>广州天河社区贸易有限公司</h2>
        <p>联系电话：020-6666645</p>
        <p>公司地址：广东省广州市天河区车陂街道1号202</p>
        <p>公司行业：食品</p>
        <el-button type="primary" @click="addToMy">添加到我的供应商</el-button>
      </el-col>
    </el-row>
    <hr />
    <el-row style="margin-top: 30px;">
      <div class="filter-container">
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
      </div>

      <my-table
        :cols="cols"
        :updateListFunc="updateTableFunc"
      >
        <el-table-column slot="action" align="center" label="操作" min-width="100" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </my-table>
    </el-row>
  </div>
</template>

<script>


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
        label: '销售价格',
        key: 'img'
      }]
    }
  },

  methods: {
    addToMy () {},
    handleFilter () {},
    view () {},
    async updateTableFunc ({page, limit}) {
      
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
