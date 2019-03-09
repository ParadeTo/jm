<template>
  <el-select
    @change="onChange"
    @input="$listeners.input"
    :value="value"
    :placeholder="placeholder"
    :multiple="multiple"
    :clearable="clearable"
    value-key="id"
    filterable
  >
    <el-option
      v-for="item in list"
      :key="item.id"
      :label="item[labelTrack]"
      :value="getValueTrack(item)"
    />
  </el-select>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number, Object, Array]
    },
    list: {
      type: Array
    },
    placeholder: {
      type: String
    },
    valueTrack: {
      type: [String, Object],
      default: 'id'
    },
    labelTrack: {
      type: String,
      default: 'name'
    },
    multiple: {
      type: Boolean
    },
    clearable: {
      type: Boolean
    }
  },
  methods: {
    getValueTrack (item) {
      return typeof this.valueTrack === 'object' ? item : item[this.valueTrack]
    },
    onChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>

