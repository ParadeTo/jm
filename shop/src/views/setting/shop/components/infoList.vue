<template>
  <el-row :gutter="20">
    <el-col :span="8" class="col">
      <el-card >
        <div class="card-content" @click="to('settingShopBasic')">
          <svg-icon icon-class="shop" class-name="card-icon" />
          <div class="text">
            <p>基本信息</p>
            <p>（未填写）</p>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" class="col">
      <el-card>
        <div class="card-content" @click="to('settingShopWithdraw')">
          <svg-icon icon-class="wallet" class-name="card-icon" />
          <div class="text">
            <p>提现信息</p>
            <p>（未填写）</p>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8" class="col">
      <el-card>
        <div class="card-content" @click="to('settingShopCertification')">
          <svg-icon icon-class="identityCard" class-name="card-icon" />
          <div class="text">
            <p>实名认证</p>
            <p>（未填写）</p>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    to(name) {
      console.log(name)
      this.$router.push({name})
    }
  }
}
</script>

<style scoped>
.card-icon {
  font-size: 5rem;
}
.card-content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-content:hover {
  cursor: pointer;
}
.text {
  text-align: center;
}
</style>

