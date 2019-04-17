<template>
  <simple-select
    clearable
    placeholder="商品类目"
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
  computed: mapGetters(['category']),
  mounted() {
    if (this.category.length === 0) this.updateCategory();
  },
  methods: {
    ...mapActions([
      'updateCategory'
    ]),
    onChange(value) {
      this.$emit('change', value);
    }
  }
};
</script>

