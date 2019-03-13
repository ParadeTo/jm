<template>
  <div>
    <el-row style="margin-bottom: 20px;">
      <el-button type="primary" v-waves icon="el-icon-plus" @click="dialogVisible = true">新增</el-button>
    </el-row>
    <el-tree
      :data="data"
      :props="treeProps"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span slot-scope="{ node, data }" @dblclick="() => onDoubleClick(node, data)">
        {{ data.name }}
      </span>
    </el-tree>

    <resource-add
      :dialogVisible="dialogVisible"
      :resource="resource"
      :action="action"
      @close="onClose"
    />
  </div>
</template>

<script>
import { getResourceTree } from '@/api/ma/resource'
import ResourceAdd from './add'

export default {
  components: {
    ResourceAdd
  },

  data () {
    return {
      dialogVisible: false,
      resource: null,
      action: 'view',
      treeProps: {
        label: 'name',
        children: 'childrenList'
      },
      data: []
    }
  },

  async mounted () {
    const rsp = await getResourceTree()
    if (rsp.data && rsp.data.data) {
      this.data = rsp.data.data
    }
  },

  methods: {
    onClose () {
      this.dialogVisible = false
    },
    onDoubleClick (node, data) {
      console.log(data)
      this.resource = data
      this.dialogVisible = true
    },
    edit (row) {
      console.log(row)
    },
    view (row) {
      console.log(row)
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


