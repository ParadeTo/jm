<template>

</template>

<script>
import { mapGetters } from "vuex";
import SimpleSelect from "@/components/Select/Simple";

export default {
  components: {
    SimpleSelect
  },
  props: {
    'value': {
      type: [String, Number, Object]
    },
    // 'valueTrack': {
    //   type: [String, Object],
    //   default: 'id'
    // },
    // 'labelTrack': {
    //   type: String,
    //   default: 'name'
    // }
  },
  computed: mapGetters(["brand"]),
  methods: {
    onChange(value) {
      this.$emit("change", value);
    }
  }
};
</script>

<template>
  <simple-select
    placeholder="商品品牌"
    :list="templateParams.types"
    :value="value"
    valueTrack="code"
    labelTrack="desc"
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
  computed: mapGetters(['templateParams']),
  mounted() {
    if (!this.templateParams) this.updateTemplateParams();
  },
  methods: {
    ...mapActions([
      'updateTemplateParams'
    ]),
    onChange(value) {
      this.$emit('change', value);
    }
  }
};
</script>



