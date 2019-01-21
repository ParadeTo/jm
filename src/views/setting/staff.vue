<template>
  <div class="app-container">
    <div>
      <el-button type="primary" v-waves icon="el-icon-plus" @click="dialogVisible = true">新增员工</el-button>
      <staff-add :dialogVisible="dialogVisible" @close="dialogVisible = false" />
    </div>

    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
      style="margin-top: 20px;"
    >
      <el-table-column slot="action" align="center" label="动作" min-width="100" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="view(scope.row)">查看</el-button>
          <el-button type="text" size="mini" @click="edit(scope.row)">修改</el-button>
          <el-button type="text" size="mini" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<script>
import staffAdd from './components/staffAdd'

export default {
  components: {
    staffAdd
  },

  data () {
    return {
      dialogVisible: false,
      cols: [{
        key: 'name',
        label: '姓名'
      }, {
        key: 'gender',
        label: '性别'
      }, {
        key: 'role',
        label: '角色'
      }, {
        key: 'account',
        label: '账号'
      }, {
        key: 'time',
        label: '添加时间'
      }]
    }
  },

  methods: {
    addStaff () {

    },
    del () {
    },
    edit () {

    },
    view () {},
    async updateTableFunc ({page, limit}) {
      // const response = await fetchList({page, limit})
      // return {
      //   list: response.data.items,
      //   total: response.data.total
      // }
    },
  }
}
</script>

