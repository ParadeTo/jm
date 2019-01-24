<template>
  <div>
    <el-table
      :data="listProps || list"
      v-loading="listLoading"
      element-loading-text="loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        v-if="hasSelection"
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column :key="k" v-for="(col, k) in cols" align="center" :label="col.label">
        <template slot-scope="scope">
          <img :src="scope.row[col.key]" v-if="col.img">
          <span v-else>{{getValue(col, scope.row)}}</span>
        </template>
      </el-table-column>
      <slot name="action"></slot>
    </el-table>
    <pagination :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
export default {
  components: {
    Pagination
  },

  props: {
    // list: {
    //   type: Array,
    //   required: true
    // },
    // total: {
    //   type: Number,
    //   require: true
    // },
    query: {
      type: Object
    },
    cols: {
      type: Array,
      required: true
    },
    updateTableFunc: {
      type: Function,
      // required: true
    },
    getListApi: {
      type: Function
    },
    hasSelection: {
      type: Boolean,
      default: false
    },
    hasPagination: {
      type: Boolean,
      default: true
    },
    listProps: {
      type: Array,
      default: null
    }
  },

  data () {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      listLoading: false
    }
  },

  mounted () {
    this.updateListFunc()
  },

  methods: {
    getValue (col, row) {
      const value = row[col.key]
      return col.transform ? col.transform(value) : value
    },
    async updateListFunc () {
      this.listLoading = true
      const { currentPage, pageSize } = this
      // await this.updateTableFunc({currentPage, pageSize})
      // this.pageSize = pageSize
      const response = await this.getListApi({ currentPage, pageSize, ...this.query })
      if (response.data.data) {
        this.list = response.data.data.items
        this.total = response.data.data.pageInfo.totalCount
      }
      this.listLoading = false
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.currentPage = 1
      this._updateListFunc()
    },
    handleCurrentChange (current) {
      this.currentPage = current
      this._updateListFunc()
    },
    handleSelectionChange (val) {
      this.$emit('selection-change', val)
    }
  }
}
</script>
