<template>
  <div class="app-container">
    <el-form :rules="rules" ref="dataForm" :model="formModel" label-position="right" label-width="100px" style='width: 400px; margin-left:50px;'>
      <el-form-item label="隐私设置" label-width="150px">
        <el-checkbox style="margin-left: 24px;" v-model="formModel.addMe">添加我为客户时需要验证</el-checkbox>
        <el-tree ref="searchTree" node-key="id" show-checkbox :data="searchTree" @check="handleCheckChange1"></el-tree>
        <el-tree ref="searchTree" node-key="id" show-checkbox :data="viewProductTree" @check="handleCheckChange2"></el-tree>      
      </el-form-item>
      <el-form-item label="系统托盘" label-width="150px">
        <el-tree ref="searchTree" node-key="id" show-checkbox :data="systemTrayTree" @check="handleCheckChange2"></el-tree>      
      </el-form-item>
      <el-form-item label="其他" label-width="150px" style="width: 800px">
        <el-checkbox style="margin-left: 24px;" v-model="formModel.providerUpdate">供应商商品信息更新提醒</el-checkbox>
        <div class="note">关闭后，供应商有更新商品售价、新商品时将不再提醒。</div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formModel: {
        addMe: '',
        searchMe: '',
        providerUpdate: ''
      },
      searchTree: [{
        label: '可通过以下方式搜索到我',
        id: 'all',
        children: [{
          label: '可搜索手机号',
          id: 'tel'
        }, {
          label: '可搜索名称',
          id: 'name'
        }, {
          label: '可搜索商品',
          id: 'product'
        }]
      }],
      viewProductTree: [{
        label: '允许陌生人查看我的商品列表',
        children: [{
          label: '允许查看商品库存'
        }]
      }],
      systemTrayTree: [{
        label: '在系统托盘区显示图标',
        children: [{
          label: '最小化到系统托盘',
          id: 'tel'
        }, {
          label: '关闭窗口时最小化到系统托盘',
          id: 'name'
        }, {
          label: '开启消息闪动提醒',
          id: 'product'
        }]
      }]
    }
  },

  methods: {
    handleCheckChange (data, checked) {
      console.log(checked)
      // console.log(this.$refs.searchTree.getCheckedKeys())
      if (checked) {
        this.formModel.searchMe = data
      } else {
        this.formModel.searchMe = {}
      }
      // console.log(data, checked, indeterminate)
    },
    handleCheckChange2 (data, checked) {

    }
  }
}
</script>

<style lang="scss">
.note {
  font-size: 0.8rem;
  color: gray;
  padding-left: 46px;
  font-style: italic;
}
</style>

