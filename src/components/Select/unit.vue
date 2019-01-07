<template>
  <simple-select
    placeholder="单位"
    :list="unit"
    :value="value"
    @input="$listeners.input"
    @change="onChange"
  />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['value'],
  computed: mapGetters(['unit']),
  mounted () {
    if (this.unit.length === 0) this.updateUnit()
  },
  methods: {
    ...mapActions(['updateUnit']),
    onChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>
