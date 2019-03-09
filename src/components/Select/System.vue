<template>
  <simple-select
    placeholder="所属系统"
    :list="systemList"
    :value="value"
    :valueTrack="valueTrack"
    :labelTrack="labelTrack"
    :clearable="false"
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
      default: 'label'
    }
  },
  data () {
    return {
      systemList: [{
        id: 1,
        label: '平台'
      }, {
        id: 2,
        label: '供应商'
      }, {
        id: 3,
        label: '门店'
      }]
    }
  },
  methods: {
    onChange(value) {
      this.$emit("change", value);
    }
  }
};
</script>

