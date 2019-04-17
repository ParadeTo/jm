<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="名称">
        <el-input v-model="query.name" placeholder="" />
      </el-form-item>
      <el-form-item label="状态">
        <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.status">
          <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-form>

    <el-row>
      <el-button type="primary" v-waves icon="el-icon-plus" @click="dialogVisible=true">新增</el-button>
    </el-row>

    <!-- <el-dialog title="新增角色" :visible.sync="dialogVisible">
      <el-form :inline="true" :rules="rules" ref="dataForm" :model="formModel" label-position="right" label-width="100px" style='margin-left:50px;'>
        <el-form-item label="头像" style="display: block">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item :key="index" v-for="(field, index) in formFields" :label="field.label" :prop="field.key">
          <el-input style="width: 160px;" v-model="formModel[field.key]" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select clearable @change='handleFilter' style="width: 160px" v-model="query.status">
            <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-select clearable @change='handleFilter' style="width: 160px" v-model="query.status">
            <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select clearable @change='handleFilter' style="width: 160px" v-model="query.status">
            <el-option v-for="item in statusList" :key="item.key" :label="item.label" :value="item.key" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add">确认</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </div>
    </el-dialog> -->

    <my-table
      :cols="cols"
      :getListApi="getUserByPage"
      style="margin-top: 20px;"
    >
      <!-- <el-table-column slot="action" align="center" label="动作" min-width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="view(scope.row)">查看</el-button>
          <el-button type="text" size="mini" @click="edit(scope.row)">修改</el-button>
          <el-button type="text" size="mini" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </my-table>
  </div>
</template>

<script>
import { getUserByPage } from '@/api/ma/user'

export default {
  data () {
    return {
      dialogVisible: false,
      query: {
        name: '',
        status: ''
      },
      statusList: [{
        key: 0,
        label: '全部'
      }],
      permissionTree: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      cols: [{
        key: 'name',
        label: '登录名'
      }, {
        key: 'nickname',
        label: '名称'
      }, {
        key: 'gender',
        label: '性别'
      }, {
        key: 'age',
        label: '年龄'
      }, {
        key: 'phone',
        label: '电话'
      }, {
        key: 'role',
        label: '角色'
      }, {
        key: 'status',
        label: '状态'
      }, {
        key: 'gmtCreated',
        label: '创建时间'
      }],
      formFields: [{
        label: '用户名',
        key: 'nickname'
      }, {
        label: '登录名',
        key: 'username'
      }, {
        label: '密码',
        key: 'password'
      }, {
        label: '确认密码',
        key: 'passwordAgain'
      }, {
        label: '手机号码',
        key: 'tel'
      }],
      formModel: {

      }
    }
  },

  methods: {
    getUserByPage,
    handleFilter () {

    },
    edit () {

    },
    view () {},
    del () {},
    async updateTableFunc ({page, limit}) {
      
    },
  }
}
</script>

