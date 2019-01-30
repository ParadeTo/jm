<template>
  <el-table :data="list" border fit highlight-current-row>
    <el-table-column
      v-for="col in cols"
      :key="col.key"
      align="center"
      :label="col.label"
      :width="col.width"
      :min-width="col.minWidth"
    >
      <template slot-scope="scope">
        <el-input v-if="col.input" v-model="scope.row[col.key]" @input="handleInput" />
        <span v-else>{{scope.row[col.key].attrValueName}}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: ['value', 'cols'],
  data() {
    return {
      list: this.value.slice()
    }
  },
  watch: {
    value() {
      this.list = this.value.slice()
    }
  },
  methods: {
    handleInput() {
      console.log(this.list)
    }
  }
}
</script>

