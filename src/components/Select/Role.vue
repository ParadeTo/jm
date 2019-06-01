<template>
  <simple-select
    clearable
    placeholder="角色"
    :list="roles"
    :value="value"
    @input="$listeners.input"
    @change="onChange"
  />
</template>

<script>
import SimpleSelect from './Simple';
import { mapGetters, mapActions } from 'vuex';

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
  computed: {
    ...mapGetters('role', ['roles'])
  },
  async mounted () {
    if (this.roles.length === 0){
      this.updateRoles()
    }
  },
  methods: {
    ...mapActions('role', ['updateRoles']),
    onChange(value) {
      this.$emit('change', value);
    }
  }
};
</script>

