
<template>
    <div class="app-container">
    <el-form :model="formModel" class="form">
      <ApplyInfo />
      <div>
        <label class="el-form-item__label">本月关键指标</label>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="6" class="col">
            <el-card class="box-card">
              <p>本月新增商户</p>
              <p>10</p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="6" class="col">
            <el-card class="box-card">
              <p>累计商户</p>
              <p>10</p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="6" class="col">
            <el-card class="box-card">
              <p>本月提成（元）</p>
              <p>10</p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="6" class="col">
            <el-card class="box-card">
              <p>商户平台交易额</p>
              <p>10</p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="6" class="col">
            <el-card class="box-card">
              <p>查看详情历史</p>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <el-form-item label="推广地区">
        <span class="form-span">广州市-天河区/海珠区/白云区</span>
      </el-form-item>
      <el-form-item label="委托期限">
        <span class="form-span">2017年11月16日-2017年11月16日</span>
      </el-form-item>
      <el-form-item label="保证金">
        <span class="form-span">300.00</span>
      </el-form-item>
      <el-form-item label="结算方式">
        <span class="form-span">按推广商户数量结算（10元/户）</span>
      </el-form-item>
      <p>*结算形式按每月一结，每月15号结算上月提成，自动发放到平台账户。</p>
      <el-button type="danger" v-waves icon="el-icon-search">解约</el-button>
      <el-button type="primary" v-waves icon="el-icon-search">续约</el-button>
      <el-button type="default" v-waves icon="el-icon-search">取消</el-button>
    </el-form>
  </div>
</template>

<script>
import ApplyInfo from './components/applyInfo'

export default {
  components: {
    ApplyInfo
  },

  data () {
    return {
      formModel: {

      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.form-span {
  width: 180px;
}

.indicator-list {
  li {
    list-style: none;
  }
}

.el-form-item__label {
  float: none;
}

.box-card {
  margin-top: 10px;
  text-align: center;
}
</style>
