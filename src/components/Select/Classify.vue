<template>
  <simple-select
    placeholder="商品分类"
    :list="classify"
    :value="value"
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
  props: ["value"],
  computed: mapGetters(["classify"]),
  methods: {
    onChange(value) {
      this.$emit("change", value);
    }
  }
};
</script>

