<template>
  <div>
    <el-row style="margin-bottom: 20px;">
      <el-button type="primary" v-waves icon="el-icon-plus" @click="dialogVisible = true">新增</el-button>
      <category-add :dialogVisible="dialogVisible" @close="dialogVisible = false" />
    </el-row>
    <tree-table :data="data" :columns="columns" :expandAll="true" border>
      <el-table-column label="排序" width="200">
        <template slot-scope="scope" v-if="!scope.row.noSort">
          <i class="el-icon-upload2 icon" @click="up(scope.row)"></i>
          <i class="el-icon-download icon" @click="down(scope.row)"></i>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">修改</el-button>
          <el-button type="text" @click="view(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>

<script>
import CategoryAdd from './categoryAdd'

export default {
  components: {
    CategoryAdd
  },

  data () {
    return {
      dialogVisible: false,
      columns: [
        {
          text: '分类',
          value: 'event',
          width: 200
        }
      ],
      data: {
        id: 1,
        event: '事件1',
        timeLine: 100,
        comment: '无',
        noSort: true,
        children: [
          {
            id: 2,
            event: '事件2',
            timeLine: 10,
            comment: '无'
          },
          {
            id: 3,
            event: '事件3',
            timeLine: 90,
            comment: '无',
            children: [
              {
                id: 4,
                event: '事件4',
                timeLine: 5,
                comment: '无'
              },
              {
                id: 5,
                event: '事件5',
                timeLine: 10,
                comment: '无'
              },
              {
                id: 6,
                event: '事件6',
                timeLine: 75,
                comment: '无',
                children: [
                  {
                    id: 7,
                    event: '事件7',
                    timeLine: 50,
                    comment: '无',
                    children: [
                      {
                        id: 71,
                        event: '事件71',
                        timeLine: 25,
                        comment: 'xx'
                      },
                      {
                        id: 72,
                        event: '事件72',
                        timeLine: 5,
                        comment: 'xx'
                      },
                      {
                        id: 73,
                        event: '事件73',
                        timeLine: 20,
                        comment: 'xx'
                      }
                    ]
                  },
                  {
                    id: 8,
                    event: '事件8',
                    timeLine: 25,
                    comment: '无'
                  }
                ]
              }
            ]
          },
          {
            id: 40,
            event: '事件4',
            timeLine: 90,
            comment: '无',
            children: [
              {
                id: 41,
                event: '事件4-1',
                timeLine: 25,
                comment: '无'
              }
            ]
          }
        ]
      }
    }
  },

  methods: {
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


