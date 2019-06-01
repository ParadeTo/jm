<template>
  <div class="app-container">
    <div>
      <el-button type="primary" v-waves icon="el-icon-plus" @click="dialogVisible = true">新增员工</el-button>
      <staff-add :dialogVisible="dialogVisible" @close="onClose" />
    </div>

    <my-table
      ref="table"
      :cols="cols"
      :getListApi="queryUsersByMemberId"
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
import staffAdd from './components/staffAdd'
import { queryUsersByMemberId } from '@/api/ma/user'

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
        key: 'roleName',
        label: '角色'
      }, {
        key: 'identity',
        label: '手机号'
      }]
    }
  },

  methods: {
    queryUsersByMemberId,
    addStaff () {

    },
    onClose () {
      this.dialogVisible = false
      this.$refs.table.updateListFunc()
    },
    edit () {

    },
    view () {},
  }
}
</script>

