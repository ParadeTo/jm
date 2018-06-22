<template>
  <div class="app-container">
    <el-form :inline="true">
      <el-form-item label="退货单单号：">
        2017110814213007
      </el-form-item>
      <el-form-item label="供应商：">
        2017110814213007
        <el-button v-waves type="primary">选择供应商</el-button>
      </el-form-item>
      <el-form-item label="计划SKU数：">
        10
      </el-form-item>
      <el-form-item label="计划总数：">
        100
      </el-form-item>
      <el-form-item label="计划总金额：">
        230.00
      </el-form-item>
      <el-form-item label="进货单号：">
        2017110814213007
      </el-form-item>
      <el-form-item label="实际SKU数：">
        10
      </el-form-item>
      <el-form-item label="实际总数：">
        100
      </el-form-item>
      <el-form-item label="实际总金额：">
        230.00
      </el-form-item>
    </el-form>

    <el-card class="box-card">
      <el-form :inline="true" :model="formModel" class="demo-form-inline">
        <el-row>
          <el-form-item label="供应商商品条码">
            <el-input v-model="formModel.code" placeholder="" />
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="formModel.name" placeholder="" />
          </el-form-item>
          <el-form-item label="售价">
            <el-input v-model="formModel.price" placeholder="" />
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="商品品牌">
            <el-select clearable style="width: 130px" v-model="formModel.brand" placeholder="">
              <el-option v-for="item in brandList" :key="item.key" :label="item.label" :value="item.key" />
            </el-select>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input style="width: 80px" v-model="formModel.number" placeholder="" />
            <el-select clearable style="width: 80px" v-model="formModel.unit" placeholder="单位">
              <el-option v-for="item in unitList" :key="item.key" :label="item.label" :value="item.key" />
            </el-select>
          </el-form-item>
        </el-row>

        <el-row>
          <el-button type="primary" @click="saveOrAdd(scope.row)">添加/保存</el-button>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      formModel: {
        code: '',
        brand: '',
        name: '',
        number: '',
        unit: '',
        price: ''
      },
      brandList: [{
        key: 0,
        label: '蓝月亮'
      }],
      unitList: [{
        key: 0,
        label: '瓶'
      }]
    }
  },

  methods: {
    saveOrAdd () {}
  }
}
</script>

<style lang="scss" scoped>
.field {
  margin-right: 15px;
}

</style>
