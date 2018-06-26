<template>
  <div>
    <p class="note">极米云城市代理项目正式启动，全面向全国招募城市代理商，负责极米云管理平台在各城市的市场开拓，城市管理，商家服务等业务内容，邀请各城市代理商一起开拓市场，共通打造新零售销售管理云系统。</p>
    <h3>成为城市代理商，只需三步</h3>
    <div class="icon-wrapper">
      <svg-icon icon-class="apply" class-name="apply-icon icon" />
      <svg-icon icon-class="doubleArrow" class-name="arrow-icon icon" />
      <svg-icon icon-class="audit" class-name="audit-icon icon" />
      <svg-icon icon-class="doubleArrow" class-name="arrow-icon icon" />
      <svg-icon icon-class="cooperate" class-name="cooperate-icon icon" />
    </div>
    <div class="btn-wrapper">
      <el-button type="success" v-waves @click="$emit('next')">申请成为代理商</el-button>
    </div>
  </div>
</template>

<style scoped>
.btn-wrapper {
  text-align: center;
}
.note {
  line-height: 1.5;
  text-indent: 2em;
}
h3 {
  text-align: center;
  margin: 30px;
}
.icon-wrapper {
  text-align: center;
  margin-bottom: 30px;
}
.icon {
  font-size: 6rem;
  vertical-align: middle;
  fill: #409EFF;
  margin-right: 2rem;
}
.arrow-icon {
  font-size: 3rem;
}
</style>
