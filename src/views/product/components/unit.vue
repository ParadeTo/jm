<template>
  <div>
    <el-row style="margin-bottom: 20px;">
      <el-button type="primary" v-waves icon="el-icon-plus" @click="handleAdd">新增</el-button>
      <!-- TODO: debounce -->
      <el-input v-model="query.keyword" @input="handleChange" style="width: 200px" />
    </el-row>
    <my-table
      :cols="cols"
      :getListApi="getUnitList"
      :query="query"
      ref="table"
    >
      <el-table-column slot="action" align="center" label="动作" min-width="140" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
          <el-button type="default" size="mini" @click="edit(scope.row)">修改</el-button>
          <el-button type="danger" size="mini" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </my-table>

    <unit-add
      :dialogVisible="dialogVisible"
      :id="unitId"
      :action="action"
      @close="onClose"
    />
  </div>
</template>

<script>
import UnitAdd from './unitAdd'
import { getUnitList, delUnit } from '@/api/product/unit'

export default {
  components: {
    UnitAdd
  },

  data () {
    return {
      dialogVisible: false,
      query: {
        keyword: ''
      },
      cols: [{
        label: '单位名称',
        key: 'name'
      }, {
        label: '创建时间',
        key: 'gmtCreated'
      }],
      unitId: 0,
      action: ''
    }
  },

  methods: {
    getUnitList,
    handleChange() {
      this.$refs.table.updateListFunc()
    },
    handleAdd () {
      this.action = 'add'
      this.dialogVisible = true
    },
    view (row) {
      this.dialogVisible = true
      this.action = 'view'
      this.unitId = row.id
    },
    edit (row) {
      this.dialogVisible = true
      this.action = 'edit'
      this.unitId = row.id
    },
    async del (row) {
      const rsp = await delUnit(row.id)
      this.$refs.table.updateListFunc()
    },
    onClose (type) {
      if (type === 'confirm') {
        this.$refs.table.updateListFunc()
      }
      this.dialogVisible = false
      this.action = ''
    },
  }
}
</script>

