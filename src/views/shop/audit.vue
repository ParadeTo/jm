<template>
  <div class="app-container">
    <el-form style="margin-left: 100px;">
      <el-form-item label="店铺名称">
        <span>xxxxx店</span>
      </el-form-item>
      <el-form-item label="店铺logo">
        <img />
      </el-form-item>
      <el-form-item label="店铺地址">
        <span>广东省广州市天河区X街3号</span>
      </el-form-item>
      <el-form-item label="法定代表人">
        <span>欧行至</span>
      </el-form-item>
      <el-form-item label="身份证号">
        <span>420912197911233432</span>
      </el-form-item>
      <el-form-item label="身份证照片">
        <img />
        <img src="" alt="">
      </el-form-item>
      <el-form-item label="营业执照相片">
        <img src="" alt="">
      </el-form-item>
      <el-form-item label="联系人">
        <span>速度快</span>
      </el-form-item>
      <el-form-item label="联系电话">
        <span>88765567</span>
      </el-form-item>
    </el-form>
    <hr>
    <el-form style="margin-left: 100px;">
      <el-form-item label="审核结果">
        <el-radio-group v-model="audit.type">
          <el-radio :label="1">通过</el-radio>
          <el-radio :label="0">不通过</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核评语">
        <textarea class="el-input__inner" v-model="audit.content" style="height: 100px;"></textarea>
      </el-form-item>
    </el-form>
    <div style="text-align: center;">
      <el-button type="primary" v-waves @click="handleFilter">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      audit: {
        content: '',
        type: '1'
      }
    }
  }
}
</script>

