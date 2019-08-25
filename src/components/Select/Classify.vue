<template>
  <el-cascader
    clearable
    placeholder="商品分类"
    expand-trigger="click"
    :options="classify"
    :value="valueArr"
    :props="{label: 'name', value: 'id', children: 'childrenList'}"
    change-on-select
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
  computed: {
    ...mapGetters(["classify"]),
    valueArr () {
      return this.findPath(this.value, this.classify)
    }
  },
  methods: {
    onChange(value) {
      this.$emit("input", value[value.length - 1]);
    },
    findPath (id, children) {
      if (!Array.isArray(children) || children.length === 0) return []
      for (let i = 0; i < children.length; i++) {
        if (Number(id) === Number(children[i].id)) {
          return [id]
        }
        const path = this.findPath(id, children[i].childrenList)
        if (path.length === 0) continue
        return [children[i].id, ...path]
      }
      return []
    }
  }
};
</script>

