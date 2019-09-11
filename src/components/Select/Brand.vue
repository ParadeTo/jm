<template>
  <simple-select
    clearable
    placeholder="请选择商品品牌"
    :list="brand"
    :value="value"
    :valueTrack="valueTrack"
    :labelTrack="labelTrack"
    @input="$listeners.input"
    @change="onChange"
  />
</template>

<script>
import { mapGetters } from "vuex";
import SimpleSelect from "./Simple";

export default {
  components: {
    SimpleSelect
  },
  props: {
    'value': {
      type: [String, Number, Object]
    },
    'valueTrack': {
      type: [String, Object],
      default: 'id'
    },
    'labelTrack': {
      type: String,
      default: 'name'
    }
  },
  computed: mapGetters(["brand"]),
  methods: {
    onChange(value) {
      this.$emit("change", value);
    }
  }
};
</script>

