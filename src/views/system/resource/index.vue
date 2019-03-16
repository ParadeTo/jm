<template>
  <div class="app-container">
    <el-row style="margin-bottom: 20px;">
      <system-select v-model="systemId" @change="refreshTree" />
      <el-button
        v-waves
        type="primary"
        icon="el-icon-plus"
        :disabled="!parentResource"
        @click="add"
      >
        新增子节点
      </el-button>
    </el-row>
    <el-tree
      :data="data"
      :props="treeProps"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <!-- <span slot-scope="{ node, data }" @dblclick="() => onDoubleClick(node, data)">
        {{ data.name }}
        <el-button
          type="text"
          size="mini"
          @click="() => edit(node, data)">
          修改
        </el-button>
      </span> -->
      <span slot-scope="{ node, data }" @dblclick="() => onDoubleClick(node, data)">
        <input
          type="checkbox"
          :ref="`node${data.id}`"
          @change="() => onCheckChange(node, data)">
        {{ data.name }}
      </span>
    </el-tree>
    <resource-add
      :dialogVisible="dialogVisible"
      :resource="resource"
      :action="action"
      :parent="parentResource"
      :systemId="systemId"
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
      data: [],
      systemId: 1,
      parentResource: {name:'sdg'}
    }
  },

  mounted () {
    this.refreshTree()
  },

  methods: {
    traveseData (data, callback) {
      data.forEach(d => {
        callback(d)
        if (Array.isArray(d.childrenList)) {
          this.traveseData(d.childrenList, callback)
        }
      })
    },
    onCheckChange (node, data) {
      let checked = this.$refs[`node${data.id}`].checked
      this.parentResource = checked ? data : null
      this.traveseData(this.data, item => {
        if (item.id !== data.id && this.$refs[`node${item.id}`]) {
          this.$refs[`node${item.id}`].checked = false
        }
      })
    },
    async refreshTree () {
      const rsp = await getResourceTree({ systemId: this.systemId })
      if (rsp.data && rsp.data.data) {
        this.data = [{
          id: -1,
          childrenList: rsp.data.data
        }]
      }
    },
    onClose () {
      this.dialogVisible = false
      this.refreshTree()
    },
    findParent (item) {
      const vm = this
      this.traveseData(this.data, _item => {
        if (_item.childrenList.find(i => i.id === item.id)) {
          vm.parentResource = _item
        }
      })
    },
    onDoubleClick (node, data) {
      this.resource = data
      this.findParent(data)
      this.action = 'view'
      this.dialogVisible = true
    },
    add () {
      this.dialogVisible = true
      this.action = 'add'
      this.resource = null
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


