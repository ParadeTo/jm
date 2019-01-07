<template>
  <el-select
    @change="onChange"
    @input="$listeners.input"
    :value="value"
    :placeholder="placeholder"
    filterable
  >
    <el-option
      v-for="item in list"
      :key="item.id"
      :label="item.name"
      :value="item.id"
    />
  </el-select>
</template>

<script>
export default {
  props: [
    'value',
    'list',
    'placeholder'
  ],
  methods: {
    onChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>

