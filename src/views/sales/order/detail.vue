<template>
  <!-- 复用新增模板的页面 -->
  <template-detail forOrder />
</template>

<script>
import TemplateDetail from '@/views/sales/template/detail'

export default {
  components: {
    TemplateDetail
  },

  data () {
    return {
      formModel: {
        code: '',
        brand: '',
        name: '',
        number: '',
        unit: '',
        price: ''
      },
      brandList: [{
        key: 0,
        label: '蓝月亮'
      }],
      unitList: [{
        key: 0,
        label: '瓶'
      }]
    }
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
.field {
  margin-right: 15px;
}

</style>
