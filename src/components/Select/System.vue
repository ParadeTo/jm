<template>
  <simple-select
    placeholder="所属系统"
    :list="systemList"
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
import { system } from '@/const'
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
      systemList: system.list
    }
  },
  methods: {
    onChange(value) {
      this.$emit("change", value);
    }
  }
};
</script>

