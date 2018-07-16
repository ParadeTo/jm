
<template>
    <div class="app-container">
    <el-form :model="formModel" class="form">
      <ApplyInfo />
      <div>
        <label class="el-form-item__label">申请信息</label>
        <el-row :gutter="32">
          <el-col :xs="24" :sm="24" :lg="6" class="col">
            <el-card class="box-card">
              <p>公司信息</p>
              <p>10</p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="6" class="col">
            <el-card class="box-card">
              <p>认证信息</p>
              <p>10</p>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="6" class="col">
            <el-card class="box-card">
              <p>提现信息</p>
              <p>10</p>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <el-form-item label="推广地区">
      </el-form-item>
      <el-form-item label="委托期限">
      </el-form-item>
      <el-form-item label="保证金">
      </el-form-item>
      <div>
        <label class="el-form-item__label">结算方式</label>
        <el-radio-group v-model="radio2" class="radio">
          <el-radio :label="3">
            按商户在平台产生交易额结算：
            有效时间：截止至成功推荐一户商户，入驻平台并处于开业状态，则为成功推荐，提成按____元/户结算。
          </el-radio>
          <el-radio :label="6" class="radio">
            商户在平台产生交易额结算：有效时间：截止至
            所推荐的商户，在平台上处于开业状态，且在平台上有销售收入，
            提成按全部交易额的_____‰结算。
            按商户数量结算：
          </el-radio>
        </el-radio-group>
      </div>
      <p>*结算形式按每月一结，每月15号结算上月提成，自动发放到平台账户。</p>
      <el-button type="primary" v-waves icon="el-icon-search">审核</el-button>
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
      radio2: '',
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

.radio {
  display: block;
  margin-left: 0;
  margin-top: 20px;
}
</style>
