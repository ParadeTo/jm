<template>
  <div>
    <el-table
      :data="listProps || list"
      :row-key="rowKey"
      ref="table"
      v-loading="listLoading"
      element-loading-text="loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
      @current-change="handleTableCurrentChange"
    >
      <el-table-column
        v-if="hasIndex"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        v-if="multiSelection"
        type="selection"
        :reserve-selection="reserveSelection"
        width="55">
      </el-table-column>
      <el-table-column
        :key="k"
        v-for="(col, k) in cols"
        align="center"
        :label="col.label"
        :width="col.width"
        :min-width="col.minWidth"
      >
        <template slot-scope="scope">
          <img :src="scope.row[col.key]" v-if="col.img">
          <span v-else>{{getValue(col, scope.row)}}</span>
        </template>
      </el-table-column>
      <slot name="action"></slot>
    </el-table>
    <pagination :total="total" @size-change="handleSizeChange" @current-change="handlePageChange" />
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
    selected: {
      type: Array,
      default: () => []
    },
    reserveSelection: {
      type: Boolean,
      default: true
    },
    rowKey: {
      type: [String, Function]
    },
    hasIndex: {
      type: Boolean,
      default: false
    },
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
    multiSelection: {
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
      listLoading: false,
      initedPageMap: {}
    }
  },

  mounted () {
    this.updateListFunc()
  },

  methods: {
    initSelected () {
      if (this.initedPageMap[this.currentPage]) return
      this.$set(this.initedPageMap, this.currentPage, true)
      this.list.forEach(row => {
        if(this.selected.find(s => s[this.rowKey] === row[this.rowKey])) {
          this.$refs.table.toggleRowSelection(row, true)
        }
      })
    },
    getValue (col, row) {
      const value = row[col.key]
      return col.transform ? col.transform(value) : value
    },
    async updateListFunc () {
      this.listLoading = true
      const { currentPage, pageSize } = this
      const response = await this.getListApi({ currentPage, pageSize, ...this.query })
      if (response.data.data) {
        this.list = response.data.data.items
        this.total = response.data.data.pageInfo.totalCount
      } else {
        this.list = []
        this.total = 0
      }
      this.listLoading = false
      this.initSelected()
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.currentPage = 1
      this.updateListFunc()
    },
    handlePageChange (current) {
      this.currentPage = current
      this.updateListFunc()
      this.$emit('page-change', current)
    },
    handleTableCurrentChange (data) {
      this.$emit('current-change', data)
    },
    handleSelectionChange (val) {
      this.$emit('selection-change', val)
    }
  }
}
</script>
