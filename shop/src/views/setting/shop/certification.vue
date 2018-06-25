<template>
  <div class="app-container">
    <el-form :rules="rules" ref="dataForm" :model="formModel" label-position="right" label-width="200px">
      <el-form-item label="认证主体" prop="template">
        <el-radio-group v-model="formModel.certificationType">
          <el-radio :label="3">个人</el-radio>
          <el-radio :label="6">公司</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="性别" prop="template">
        <el-radio-group v-model="formModel.certificationType">
          <el-radio :label="3">男</el-radio>
          <el-radio :label="6">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="主体姓名" prop="provider">
        <el-input style="width: 160px;" v-model="formModel.name" />
      </el-form-item>
      <el-form-item label="身份证号" prop="provider">
        <el-input style="width: 180px;" v-model="formModel.id" />
      </el-form-item>
      <el-form-item label="身份证照片" prop="provider">
        <div class="card-img-wrapper">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="text">（正面）</div>
        </div>
        <div class="card-img-wrapper">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div class="text">（背面）</div>
        </div>
      </el-form-item>
      <el-form-item label="所属行业" prop="range">
        <el-select @change='handleFilter' style="width: 130px" v-model="formModel.industry" placeholder="上/下架">
          <el-option v-for="item in industryList" :key="item.key" :label="item.label" :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="营业执照" prop="contact">
        <el-upload
          style="width:300px;"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="门店照片" prop="contact">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
    </el-form>

    <div>
      <el-button type="primary" @click="submit" style="margin-left: 200px;">提交审核</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formModel: {
        certificationType: '',
        description: '',
        range: '',
        contact: '',
        way: '',
        addressDetail: '',
        industry: ''
      },
      rules: {},
      industryList: []
    }
  },

  methods: {
    submit () {},
    cancel () {}
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .card-img-wrapper {
    display: inline-block;
  }
  .text {
    text-align: center;
    margin-top: -10px;
  }
</style>

