<template>
  <div class="app-container">
    <el-row>
      <el-input
        @keyup.enter.native="handleFilter"
        style="width: 200px;"
        placeholder="客户名称"
        v-model="query.keyword" />
      <!-- <el-select @change='handleFilter' style="width: 130px" v-model="query.category" placeholder="商品类目">
        <el-option v-for="item in typeList" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select> -->
      <el-button type="primary" v-waves icon="el-icon-search" @click="handleFilter">查询</el-button>
    </el-row>

    <el-row style="margin: 20px 0;">
      <el-button type="success" v-waves icon="el-icon-plus" @click="dialogVisible = true" v-if="!isForSelect">新增客户</el-button>
      <client-add :dialogVisible="dialogVisible" @close="dialogVisible = false" />
    </el-row>

    <my-table
      :cols="cols"
      :getListApi="getMyMemberByPage"
      :query="query"
      ref="table"
      @current-change="handleTableCurrentChange"
    >
      <!-- <el-table-column slot="action" align="center" label="动作" min-width="140" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="view(scope.row)">查看</el-button>
          <el-button type="default" size="mini" @click="edit(scope.row)">修改</el-button>
        </template>
      </el-table-column> -->
    </my-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ClientAdd from './components/clientAdd'
import { getMyMemberByPage, saveMyMember } from '@/api/ma/member'

export default {
  components: {
    ClientAdd
  },

  props: {
    multiSelection: {
      type: Boolean,
      default: false
    },
    isForSelect: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      category: [],
      dialogVisible: false,
      query: {
        keyword: ''
        // type: '',
      },
      typeList: [{
        key: 0,
        label: '全部'
      }],
      cols: [{
        label: '客户名称',
        key: 'name'
      }, {
        label: '联系人',
        key: 'contacts'
      }, {
        label: '联系电话',
        key: 'contactNumber'
      }, {
        label: '行业',
        key: 'scopeOfBusiness'
      }, {
        label: '经营范围',
        key: 'businessType',
        transform: val => {
          const item = this.category.find(c => Number(c.id) === Number(val))
          return item && item.name
        }
      }, {
        label: '地址',
        key: 'address'
      }, {
        label: '备注',
        key: 'remark'
      }]
    }
  },

  // computed: mapGetters('product', ['category']),

  async mounted () {
    this.category = await this.$getCategory()
  },

  methods: {
    // ...mapActions('product', ['updateCategory']),
    getMyMemberByPage,
    handleTableCurrentChange (selection) {
      this.$emit('current-change', selection)
    },
    handleFilter () {
      this.$refs.table.updateListFunc()
    },
    add () {
      this.$router.push({name: 'productAdd'})
    },
    view () {

    },
    edit () {

    },
    setting () {
      this.$router.push({ name: 'productSetting' })
    },
    async updateTableFunc ({page, limit}) {

    }
  }
}
</script>

<style scoped>
