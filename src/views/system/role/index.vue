<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" v-waves icon="el-icon-plus" @click="dialogVisible=true">新增</el-button>
      所属系统：
      <system-select
        :clearble="false"
        v-model="query.systemId"
        @change="handleSelectChange"
      />
      <!-- <el-select
        
        
        value-key="id"
        filterable
      >
        <el-option
          v-for="item in systemList"
          :key="item.id"
          :label="item.label"
          :value="item.id"
        />
      </el-select> -->
    </el-row>


    <!-- <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="角色名称">
        <el-input v-model="query.code" placeholder="" />
      </el-form-item>
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-form> -->



    <add
      :dialogVisible="dialogVisible"
      :id="roleId"
      :action="action"
      @close="onClose"
    />

    <my-table
      :cols="cols"
      :getListApi="getRoleByPage"
      :query="query"
      ref="table"
      style="margin-top: 20px;"
    >
      <!-- <el-table-column slot="action" align="center" label="动作" min-width="100" class-name="small-padding fixed-width">
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
import { getRoleByPage } from '@/api/ma/role'
import { system } from '@/const'
import Add from './add'

export default {
  components: {
    Add
  },
  data () {
    return {
      dialogVisible: false,
      query: {
        systemId: 1,
      },
      roleId: '',
      action: 'add',
      cols: [{
        key: 'systemId',
        label: '所属平台',
        transform: value => system.map[value]
      }, {
        key: 'roleCode',
        label: '角色编码'
      }, {
        key: 'name',
        label: '角色名称'
      }],
      systemList: [{
        id: 1,
        label: '平台'
      }, {
        id: 2,
        label: '供应商'
      }, {
        id: 3,
        label: '门店'
      }]
    }
  },

  methods: {
    getRoleByPage,
    onClose (type) {
      if (type === 'confirm') {
        this.$refs.table.updateListFunc()
      }
      this.dialogVisible = false
      this.action = ''
    },
    handleSelectChange () {
      this.$refs.table.updateListFunc()
    },
    edit () {
      this.dialogVisible = true
    },
    view () {
      this.dialogVisible = true
    },
    del () {},
    async updateTableFunc ({page, limit}) {
      
    },
  }
}
</script>

