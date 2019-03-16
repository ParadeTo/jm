<template>
  <simple-select
    placeholder="资源类型"
    :list="resourceTypeList"
    :value="value"
    :clearable="false"
    :disabled="disabled"
    valueTrack="id"
    labelTrack="label"
    @input="$listeners.input"
    @change="onChange"
  />
</template>

<script>
import { resourceType } from '@/const'
import SimpleSelect from "./Simple"

export default {
  components: {
    SimpleSelect
  },
  props: {
    value: {
      type: [String, Number, Object]
    },
    disabled: {
      type: Boolean
    }
  },
  data () {
    return {
      resourceTypeList: resourceType.list
    }
  },
  methods: {
    onChange(value) {
      this.$emit("change", value);
    }
  }
};
</script>

