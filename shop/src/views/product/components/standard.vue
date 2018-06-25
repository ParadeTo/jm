<template>
    <div>
    <el-row style="margin-bottom: 20px;">
      <el-button type="primary" v-waves icon="el-icon-plus" @click="addCategory">新增</el-button>

    </el-row>
    <my-table
      :cols="cols"
      :updateListFunc="updateTableFunc"
    >
      <el-table-column slot="action" align="center" label="动作" min-width="140" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
          <el-button type="default" size="mini" @click="edit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </my-table>
  </div>
</template>

<script>
import StandardAdd from './StandardAdd'

export default {
  components: {
    StandardAdd
  },

  data () {
    return {
      cols: [{
        label: '规格',
        key: 'standard'
      }, {
        label: '规格值',
        key: 'value'
      }, {
        label: '创建时间',
        key: 'time'
      }]
    }
  }
}
</script>

