<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" v-waves icon="el-icon-plus">录入</el-button>
      <!-- <el-button type="primary" v-waves icon="el-icon-edit">编辑</el-button> -->
      <el-button type="primary" v-waves icon="el-icon-view">显示/隐藏</el-button>
    </el-row>

    <el-dialog title="新增行业" :visible.sync="dialogVisible">
      <el-form :rules="rules" ref="dataForm" :model="formModel" label-position="right" label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item label="标题" label-width="150px">
          <el-input v-model="formModel.title" placeholder="" />
        </el-form-item>
        <el-form-item label="跳转地址" label-width="150px">
          <el-input v-model="formModel.address" placeholder="" />
        </el-form-item>
        <el-form-item label="上传图片" label-width="150px">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :limit="1"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add">确认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog>

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
      style="margin-top: 20px;"
    >
      <el-table-column slot="action" align="center" label="操作" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="view(scope.row)">查看</el-button>
          <el-button type="text" size="mini" @click="edit(scope.row)">修改</el-button>
          <!-- <el-button type="text" size="mini" @click="del(scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<script>

export default {
  data () {
    return {
      dialogVisible: false,
      typeList: [{
        label: '衣服',
        key: '0'
      }, {
        label: '食品',
        key: '1'
      }],
      statusList: [{
        label: '正常',
        key: '0'
      }, {
        label: '失效',
        key: '1'
      }],
      cols: [{
        key: 'title',
        label: '标题'
      }, {
        key: 'status',
        label: '图片',
        img: true
      }, {
        key: 'address',
        label: '跳转地址'
      }, {
        key: 'city',
        label: '适用城市'
      }],
      formModel: {
        title: '',
        address: ''
      }
    }
  },

  methods: {
    handleFilter () {

    },
    edit () {
      this.dialogVisible = true
    },
    view () {
      this.dialogVisible = true
      // this.$router.push({ name: 'bmsCityAgencyDetail', params: { id: 1 } })
    },
    del () {},
    async updateTableFunc ({page, limit}) {

    },
  }
}
</script>

