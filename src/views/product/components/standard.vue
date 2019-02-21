<template>
  <div>
    <el-row style="margin-bottom: 20px;">
      <el-button type="primary" v-waves icon="el-icon-plus" @click="handleAdd">新增</el-button>
      <category-select v-model="query.cateId" @change="handleCateChange"/>
    </el-row>
    <!-- TODO: 类目过滤， 类目字段要显示 -->
    <my-table
      :cols="cols"
      :getListApi="getAttributeAndValueList"
      :query="query"
      ref="table"
    >
      <el-table-column slot="action" align="center" label="动作" min-width="140" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
          <el-button type="default" size="mini" @click="edit(scope.row)">修改</el-button>
        </template>
      </el-table-column>
    </my-table>

    <standard-add
      :dialogVisible="dialogVisible"
      :id="attributeId"
      :action="action"
      @close="onClose"
    />
  </div>
</template>

<script>
import StandardAdd from './standardAdd'
import { getAttributeAndValueList } from '@/api/product/attribute'

export default {
  components: {
    StandardAdd
  },

  data () {
    return {
      action: '',
      dialogVisible: false,
      attributeId: '',
      query: {
        cateId: ''
      },
      cols: [{
        label: '规格',
        key: 'name'
      }, {
        label: '规格值',
        key: 'attrValueList',
        transform: value => value.map(v => v.name).join(' ')
      }, {
        label: '创建时间',
        key: 'gmtCreated'
      }]
    }
  },

  methods: {
    view (row) {
      this.dialogVisible = true
      this.action = 'view'
      this.attributeId = row.id
    },
    edit (row) {
      this.dialogVisible = true
      this.action = 'edit'
      this.attributeId = row.id
    },
    handleCateChange () {
      this.$refs.table.updateListFunc()
    },
    handleAdd () {
      this.action = 'add'
      this.dialogVisible = true
    },
    onClose (type) {
      if (type === 'confirm') {
        this.$refs.table.updateListFunc()
      }
      this.dialogVisible = false
      this.action = ''
    },
    getAttributeAndValueList
  }
}
</script>

