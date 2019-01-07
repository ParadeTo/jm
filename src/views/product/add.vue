<template>
  <div class="app-container">
    <el-form label-position="right" label-width="100px" :model="model">
      <el-row>
        <el-col :span="4">
          <h3 class="subtitle">基本信息</h3>
        </el-col>
        <el-col :span="14">
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品名称">
                <el-input v-model="model.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品编码">
                <el-input v-model="model.owncode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品类目">
                <category-select v-model="model.cateId" @change="handleCateChange"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商品分类">
                <simple-select placeholder="商品分类" v-model="model.classifyId" :list="classifyList" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品品牌">
                <simple-select placeholder="商品分类" v-model="model.brandId" :list="brandList" />
              </el-form-item>
            </el-col>
            <el-button type="primary" v-waves @click="dialogVisible = true" style="margin-left: 10px;">新增分类</el-button>
            <category-add :dialogVisible="dialogVisible" @close="dialogVisible = false" />
          </el-row>
        </el-col>
        <el-col :span="6">
          上传图片
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">
          <h3 class="subtitle">商品类型</h3>
        </el-col>
        <el-col :span="14">
          <el-form-item label="商品类型">
            <el-radio-group v-model="model.productType" @change="onTypeChange">
              <el-radio :label="1">标准商品</el-radio>
              <el-radio :label="2">多规格商品</el-radio>
              <!-- <el-radio :label="3">称重商品</el-radio> -->
            </el-radio-group>
          </el-form-item>
          <!-- 标准商品 -->
          <div v-if="model.productType===1">
            <el-form-item label="商品规格">
              <el-input v-model="model.attrValue" />
            </el-form-item>
            <el-form-item label="辅助单位">
              <el-table
                :data="skuReqListBasic"
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
                    <el-input v-model="scope.row.model.barcode" />
                  </template>
                </el-table-column>
                <el-table-column align="center" label="单位">
                  <template slot-scope="scope">
                    <unit-select v-model="scope.row.model.unitId" @change="onChange" />
                  </template>
                  <!-- <template slot-scope="scope">
                    <span>{{scope.row.number}}</span>
                  </template> -->
                </el-table-column>
                <el-table-column align="center" label="单位关系">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.model.conversion" />
                  </template>
                </el-table-column>
                <el-table-column align="center" label="价格">
                  <template slot-scope="scope">
                    <el-input type="number" v-model="scope.row.model.price" />
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope" v-if="scope.$index === skuReqListBasic.length - 1">
                    <el-button v-if="skuReqListBasic.length < 3" type="text" @click="() => handleUnitOperation('add')">
                      添加
                    </el-button>
                    <el-button v-if="scope.row.type==='auxiliary'" type="text" @click="() => handleUnitOperation('del', scope)">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </div>
          <!-- 多规格商品 -->
          <div v-if="model.productType===2">
            <el-form-item label="基本单位">
              <select-unit v-model="model.unitId" />
            </el-form-item>
            <el-form-item label="商品规格">
              <select-unit v-model="model.unitId" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4">
          <h3 class="subtitle">其他信息</h3>
        </el-col>
        <el-col :span="14">
          <!-- <el-form-item label="自动上下架">
            <el-switch
              v-model
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item> -->
          <el-form-item label="商品备注">
            <textarea v-model="model.remark" style="width:100%;" rows="10"></textarea>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="text-align: rigxht;">
        <el-col :span="4" :offset="14">
          <el-button type="primary" v-waves @click="save">保存</el-button>
          <el-button type="default" v-waves @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import CategoryAdd from './components/categoryAdd'
import { saveProduct } from '@/api/product'
import { getAllCategory } from '@/api/category'
import { getAllBrand } from '@/api/brand'
import { getAllClassify } from '@/api/classify'
import { getAttributeList } from '@/api/attribute'
import { getUnitList } from '@/api/unit'

export default {
  components: {
    CategoryAdd
  },

  data () {
    return {
      brandList: [],
      classifyList: [],
      model: {
        name: '',
        attrValue: '',
        productType: 1,
        owncode: '',
        brandId: '',
        cateId: '',
        classifyId: '',
        unitId: '', // 多规格商品需要
        images: ''
      },
      specificationList: [{
        key: 0,
        label: '4L'
      }],
      categoryList: [{
        key: 0,
        label: '日用百货'
      }],
      skuReqListBasic: [{
        name: '基本单位',
        type: 'basic',
        model: {
          barcode: '',
          conversion: '',
          price: '',
          unitId: '',
          unitType: 0
        }
      }, {
        name: `辅助单位1`,
        type: 'auxiliary',
        model: {
          barcode: '',
          conversion: '',
          price: '',
          unitId: '',
          unitType: 1
        }
      }],
      attrs: [],
      tableLoading: false,
      dialogVisible: false
    }
  },

  methods: {
    onTypeChange () {},
    handleUnitOperation (operation, scope) {
      const len = this.skuReqListBasic.length
      if (operation === 'add') {
        this.skuReqListBasic.push({
          name: `辅助单位${len}`,
          type: 'auxiliary',
          model: {
            barcode: '',
            conversion: '',
            price: '',
            unitId: '',
            unitType: len
          }
        })
      } else {
        this.skuReqListBasic.splice(scope.$index, 1)
      }
    },
    save () {
      const data = { ...this.model, skuReqList: [] }
      this.skuReqListBasic.forEach(s => {
        data.skuReqList.push(s.model)
      })
      saveProduct(data)
    },
    cancel () {},
    onChange () { console.log(this.unitList) },
    handleCateChange (cateId) {
      this.model.brandId = ''
      this.model.classifyId = ''
      this.updateBrand(cateId)
      this.updateClassify(cateId)
    },
    async updateBrand (cateId) {
      const rsp = await getAllBrand({cateId})
      if (Array.isArray(rsp.data)) this.brandList = rsp.data
    },
    async updateClassify (cateId) {
      const rsp = await getAllClassify({cateId})
      if (Array.isArray(rsp.data)) this.classifyList = rsp.data
    },
    async updateAttribute ({ commit }) {
      const rsp = await getAttributeList({})
      commit('UPDATE_ATTRIBUTE', rsp.data)
    },
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

