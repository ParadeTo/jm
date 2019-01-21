<template>
  <div class="app-container">
    <el-form :inline="true" :model="query" class="demo-form-inline">
      <el-form-item label="日志类型">
        <el-select clearable @change='handleFilter' style="width: 130px" v-model="query.status">
          <el-option v-for="item in typeList" :key="item.key" :label="item.label" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-form>

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
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


export default {
  data () {
    return {
      dialogVisible: false,
      query: {
        title: '',
      },
      typeList: [{
        label: '全部',
        key: 0
      }],
      cols: [{
        key: 'user',
        label: '用户'
      }, {
        key: 'role',
        label: '角色'
      }, {
        key: 'operation',
        label: '操作'
      }, {
        key: 'desc',
        label: '功能描述'
      }, {
        key: 'operationTime',
        label: '操作时间'
      }]
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
    },
    del () {},
    async updateTableFunc ({page, limit}) {
      
    },
  }
}
</script>

