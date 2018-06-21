<template>
  <div class="app-container">
    <el-row>
      <el-col span="4">
        <h3 class="subtitle">基本信息</h3>
      </el-col>
      <el-col span="14">
        <el-form label-position="right" label-width="100px" :model="baseInfoModel">
          <el-row>
            <el-col span="12">
              <el-form-item label="商品名称">
                <el-input v-model="baseInfoModel.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="商品编码">
                <el-input v-model="baseInfoModel.number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col span="12">
              <el-form-item label="商品品牌">
                <el-input v-model="baseInfoModel.brand"></el-input>
              </el-form-item>
            </el-col>
            <el-col span="12">
              <el-form-item label="商品类目">
                <el-select v-model="baseInfoModel.category" placeholder="请选择">
                  <el-option v-for="item in categoryList" :key="item.key" :label="item.label" :value="item.key">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
      <el-col span="6">
        上传图片
      </el-col>
    </el-row>

    <el-row>
      <el-col span="4">
        <h3 class="subtitle">商品类型</h3>
      </el-col>
      <el-col span="14">
        <el-form label-position="right" label-width="100px" :model="typeModel">
          <el-form-item label="商品类型">
            <el-radio-group v-model="typeModel.type">
              <el-radio label="0">标准商品</el-radio>
              <el-radio label="1">多规格商品</el-radio>
              <el-radio label="2">称重商品</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="商品规格">
            <el-select v-model="baseInfoModel.specification" placeholder="请选择">
              <el-option v-for="item in specificationList" :key="item.key" :label="item.label" :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="辅助单位">
            <el-table
              :data="tableList"
              v-loading="tableLoading"
              element-loading-text="loading"
              border
              fit
              highlight-current-row
            >
              <el-table-column align="center" label="">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="条码">
                <template slot-scope="scope">
                  <span>{{scope.row.number}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="条码">
                <template slot-scope="scope">
                  <span>{{scope.row.number}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="单位">
                <template slot-scope="scope">
                  <span>{{scope.row.number}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="单位关系">
                <template slot-scope="scope">
                  <span>{{scope.row.number}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="价格">
                <template slot-scope="scope">
                  <span>{{scope.row.number}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <span>{{scope.row.number}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row>
      <el-col span="4">
        <h3 class="subtitle">其他信息</h3>
      </el-col>
      <el-col span="14">
        <el-form label-position="right" label-width="100px" :model="otherModel">
          <el-form-item label="自动上下架">
            <el-switch
              v-model="otherModel.onOff"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          <el-form-item label="商品备注">
            <textarea v-model="otherModel.remarks" style="width:100%;" rows="10"></textarea>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-row style="text-align: right;">
      <el-col span="4" offset="14">
        <el-button type="primary" v-waves @click="look(scope.row)">保存</el-button>
        <el-button type="default" v-waves @click="look(scope.row)">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      baseInfoModel: {
        name: '',
        number: '',
        brand: '',
        category: '',
      },
      typeModel: {
        type: '',
        specification: ''
      },
      otherModel: {
        onOff: '',
        remarks: ''
      },
      specificationList: [{
        key: 0,
        label: '4L'
      }],
      categoryList: [{
        key: 0,
        label: '日用百货'
      }],
      tableList: [{

      }],
      tableLoading: false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.subtitle {
  line-height: 1;
  margin-top: 0.5rem;
  text-align: right;
  font-size: 1.1rem;
}
</style>

