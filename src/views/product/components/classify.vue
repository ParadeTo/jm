<template>
  <div>
    <el-row style="margin-bottom: 20px;">
      <el-button type="primary" v-waves icon="el-icon-plus" @click="dialogVisible = true">新增</el-button>
      <category-select v-model="category" />
    </el-row>
    <tree-table
      :data="tree"
      :columns="columns"
      :expandAll="true"
      childrenTrack="childrenList"
      border
    >
      <!-- <el-table-column label="排序" width="200">
        <template slot-scope="scope" v-if="!scope.row.noSort">
          <i class="el-icon-upload2 icon" @click="up(scope.row)"></i>
          <i class="el-icon-download icon" @click="down(scope.row)"></i>
        </template>
      </el-table-column> -->
      <el-table-column label="操作" width="200">
        <template slot-scope="scope" v-if="scope.row.id !== -1">
          <el-button type="text" @click="edit(scope.row)">新增子类</el-button>
          <el-button type="text" @click="edit(scope.row)" v-if="scope.row.id !== -1">修改</el-button>
          <el-button type="text" @click="view(scope.row)" v-if="scope.row.id !== -1">查看</el-button>
        </template>
      </el-table-column>
    </tree-table>

    <classify-add
      :dialogVisible="dialogVisible"
      :classify="classify"
      :parentClassify="parentClassify"
      :ancestorClassify="ancestorClassify"
      @close="dialogVisible = false"
    />

  </div>
</template>

<script>
import ClassifyAdd from './classifyAdd'
import { getAllClassify } from '@/api/product/classify'
import { findParentInTree, findAncestorInTree } from '@/utils'

export default {
  components: {
    ClassifyAdd
  },

  data () {
    return {
      dialogVisible: false,
      columns: [
        {
          text: '分类',
          value: 'name',
          width: 200
        }
      ],
      tree: [],
      classify: null,
      parentClassify: null,
      ancestorClassify: null
    }
  },

  mounted () {
    this.refreshTree()
  },

  methods: {
    async refreshTree () {
      const rsp = await getAllClassify()
      if (rsp.data && rsp.data.data) {
        this.tree = rsp.data.data
      }
    },
    edit (row) {
      console.log(row)
    },
    view (row) {
      this.dialogVisible = true
      this.classify = row
      this.parentClassify = findParentInTree(this.tree, row)
      this.ancestorClassify = findAncestorInTree(this.tree, row)
    },
    findIndex (arr, row) {
      let index
      for (let i = 0, len = arr.length; i < len; i++) {
        if (row.id === arr[i].id) {
          index = i
        }
      }
      return index
    },
    up (row) {
      const arr = row.parent.children
      const index = this.findIndex(arr, row)
      arr.splice(index, 1)
      arr.splice(index - 1, 0, row)
    },
    down (row) {
      const arr = row.parent.children
      const index = this.findIndex(arr, row)
      arr.splice(index, 1)
      arr.splice(index + 1, 0, row)
    }
  }
}
</script>

<style scoped>
.icon {
  font-size: 1.2rem;
}

.icon:hover {
  cursor: pointer;
  color: #409EFF;
}
</style>

