<template>
  <div class="pagination-container">
    <el-pagination 
      background @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 20, 30, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: ['total'],
  data () {
    return {
      page: 1
    }
  },
  methods: {
    handleSizeChange (size) {
      this.$emit('size-change', size)
      console.log(size)
    },
    handleCurrentChange (current) {
      this.page = current
      this.$emit('current-change', current)
      console.log(current)
    }
  }
}
</script>

