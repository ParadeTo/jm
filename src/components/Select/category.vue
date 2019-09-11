<template>
  <simple-select
    clearable
    placeholder="请选择商品类目"
    :list="category"
    :value="value"
    @input="$listeners.input"
    @change="onChange"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SimpleSelect from './Simple';

export default {
  components: {
    SimpleSelect
  },
  props: ['value'],
  data () {
    return {
      category: []
    }
  },
  async mounted () {
    this.category = await this.$getCategory()
  },
  methods: {
    onChange(value) {
      this.$emit('change', value);
    }
  }
};
</script>

