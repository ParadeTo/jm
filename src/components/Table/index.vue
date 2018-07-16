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
          <span v-else>{{scope.row[col.key]}}</span>
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
    cols: {
      type: Array,
      required: true
    },
    updateListFunc: {
      type: Function,
      required: true
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
      page: 1,
      limit: 10,
      list: [],
      total: 0,
      listLoading: false
    }
  },

  async beforeMount () {
    await this._updateListFunc()
  },

  methods: {
    async _updateListFunc () {
      this.listLoading = true

      const { page, limit } = this
      const data = await this.updateListFunc({page, limit})
      const { list, total } = data

      this.listLoading = false

      this.list = list
      this.total = total
    },
    handleSizeChange (size) {
      this.limit = size
      this.page = 1
      this._updateListFunc()
    },
    handleCurrentChange (current) {
      this.page = current
      this._updateListFunc()
    },
    handleSelectionChange (val) {
      this.$emit('selection-change', val)
    }
  }
}
</script>
