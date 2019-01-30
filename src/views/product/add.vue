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
                <classify-select v-model="model.classifyId"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="商品品牌">
                <brand-select v-model="model.brand" :valueTrack="{}"/>
              </el-form-item>
            </el-col>
            <el-button
              type="primary"
              v-waves
              @click="dialogVisible = true"
              style="margin-left: 10px"
            >新增分类</el-button>
            <category-add :dialogVisible="dialogVisible" @close="dialogVisible = false"/>
          </el-row>
        </el-col>
        <!-- <el-col :span="6">上传图片</el-col> -->
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
              <el-input v-model="model.attrValue"/>
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
                <el-table-column align="center" label>
                  <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="条码" min-width="180">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.model.barcode"/>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="单位">
                  <template slot-scope="scope">
                    <unit-select v-model="scope.row.model.unitId" @change="onChange"/>
                  </template>
                  <!-- <template slot-scope="scope">
                    <span>{{scope.row.number}}</span>
                  </template>-->
                </el-table-column>
                <el-table-column align="center" label="单位关系">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.model.conversion"/>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="价格">
                  <template slot-scope="scope">
                    <el-input type="number" v-model="scope.row.model.price"/>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                  <template slot-scope="scope" v-if="scope.$index === skuReqListBasic.length - 1">
                    <el-button
                      v-if="skuReqListBasic.length < 3"
                      type="text"
                      @click="() => handleUnitOperation('add')"
                    >添加</el-button>
                    <el-button
                      v-if="scope.row.type==='auxiliary'"
                      type="text"
                      @click="() => handleUnitOperation('del', scope)"
                    >删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </div>

          <!-- 多规格商品 -->
          <div v-if="model.productType===2">
            <el-form-item label="基本单位">
              <unit-select v-model="model.unitId"/>
            </el-form-item>
            <el-form-item label="商品规格">
              <div v-for="(attr, index) in attrListSelected" :key="index">
                <simple-select
                  placeholder="商品规格"
                  v-model="attr.attr"
                  :list="attrList"
                  :valueTrack="{}"
                  @change="() => handleAttrChange(attr)"
                />
                <simple-select
                  multiple
                  placeholder="规格值"
                  v-model="attr.attrValueListSelected"
                  :list="attr.attrValueList"
                  :valueTrack="{}"
                  @change="() => handleAttrValueChange(attr)"
                />
              </div>
              <i class="el-icon-circle-plus icon" @click="addAttr">新增规格</i>
            </el-form-item>
            <el-form-item>
              <cartesian-table :value="cartesianData" :cols="cartesianCols" />
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
          </el-form-item>-->
          <el-form-item label="商品备注">
            <textarea v-model="model.remark" style="width:100%" rows="10"></textarea>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row style="text-align: rigxht">
        <el-col :span="4" :offset="14">
          <el-button type="primary" v-waves @click="save">保存</el-button>
          <el-button type="default" v-waves @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CategoryAdd from './components/categoryAdd'
import CartesianTable from './components/cartesianTable'
import { saveProduct } from '@/api/product/index'
import { getAllCategory } from '@/api/product/category'
import { getAllBrand } from '@/api/product/brand'
import { getAllClassify } from '@/api/product/classify'
import { getAttributeAndValueList } from '@/api/product/attribute'
import { getUnitList } from '@/api/product/unit'

export default {
  components: {
    CategoryAdd,
    CartesianTable
  },

  data() {
    return {
      brandList: [],
      classifyList: [],
      attrList: [],
      attrListSelected: [
        {
          attr: null,
          attrValueList: [],
          attrValueListSelected: []
        }
      ],
      cartesianData: [],
      cartesianCols: [],
      model: {
        name: "",
        attrValue: "",
        productType: 1,
        owncode: "",
        brand: null,
        cateId: "",
        classifyId: "",
        unitId: "", // 多规格商品需要
        images: ""
      },
      categoryList: [
        {
          key: 0,
          label: "日用百货"
        }
      ],
      skuReqListBasic: [
        {
          name: "基本单位",
          type: "basic",
          model: {
            barcode: "",
            conversion: "",
            price: "",
            unitId: "",
            unitType: 0
          }
        },
        {
          name: `辅助单位1`,
          type: "auxiliary",
          model: {
            barcode: "",
            conversion: "",
            price: "",
            unitId: "",
            unitType: 1
          }
        }
      ],
      attrs: [],
      tableLoading: false,
      dialogVisible: false
    }
  },

  methods: {
    ...mapActions([
      'updateBrand',
      'updateClassify'
    ]),
    onTypeChange() {},
    handleUnitOperation(operation, scope) {
      const len = this.skuReqListBasic.length
      if (operation === "add") {
        this.skuReqListBasic.push({
          name: `辅助单位${len}`,
          type: "auxiliary",
          model: {
            barcode: "",
            conversion: "",
            price: "",
            unitId: "",
            unitType: len
          }
        })
      } else {
        this.skuReqListBasic.splice(scope.$index, 1)
      }
    },
    save() {
      const { id, name } = this.model.brand
      const data = {
        ...this.model,
        brandId: id,
        brandName: name,
        skuReqList: []
      }
      delete data.brand
      if (this.model.productType === 1) {
        this.skuReqListBasic.forEach(s => {
          data.skuReqList.push(s.model)
        })
      } else if (this.model.productType === 2) {
        this.cartesianData.forEach(c => {
          const row = {
            barcode: c.barcode,
            price: c.price,
            attrValueList: []
          }
          for (let k in c) {
            if (c[k].attrId) {
              row.attrValueList.push(c[k])
            }
          }
          data.skuReqList.push(row)
        })
      }
      saveProduct(data)
    },
    cancel() {},
    onChange() {
      console.log(this.unitList)
    },
    addAttr() {
      this.attrListSelected.push(
        {
          attrId: "",
          attrValueList: [],
          attrValueListSelected: []
        }
      )
    },
    handleCateChange(cateId) {
      this.model.brandId = ""
      this.model.classifyId = ""
      this.updateAttributeList(cateId)
      this.updateBrand(cateId)
      this.updateClassify(cateId)
    },
    findAttrValue (attrId) {
      const attr = this.attrList.find(attr => attr.id === attrId)
      return attr && attr.attrValueList
    },
    handleAttrChange(attr) {
      attr.attrValueList = this.findAttrValue(attr.attr.id)
    },
    getCartesian(attrListSelected, list = [], idx = 0, cols = []) {
      const {
        attr,
        attrValueListSelected
      } = attrListSelected[idx]
      const attrId = attr.id
      const attrName = attr.name
      cols.push({
        label: attrName,
        key: attrId
      })
      if (attrListSelected.length - 1 === idx) {
        cols.push({
          label: '条码',
          minWidth: 180,
          input: true,
          key: 'barcode'
        }, {
          label: '价格',
          input: true,
          key: 'price'
        })
      }

      const cartesian = []
      for (let i = 0; i < attrValueListSelected.length; i++) {
        const {
          id,
          name
        } = attrValueListSelected[i]

        let row = {
          [attrId]: {
            attrId: attrId,
            attrValueId: id,
            attrValueName: name
          }
        }
        if (attrListSelected.length - 1 === idx) {
          row.barcode = ''
          row.price = ''
        }
        if (list.length === 0) cartesian.push(row)
        else {
          for (let j = 0; j < list.length; j++) {
            cartesian.push({ ...list[j], ...row })
          }
        }
      }
      if (attrListSelected.length - 1 === idx) return { cartesian, cols }
      return this.getCartesian(attrListSelected, cartesian, idx + 1, cols)
    },
    handleAttrValueChange(attr) {
      const { cartesian, cols } = this.getCartesian(this.attrListSelected)
      this.cartesianData = cartesian
      this.cartesianCols = cols
    },
    async updateAttributeList(cateId) {
      const { data } = await getAttributeAndValueList({ cateId })
      if (Array.isArray(data.data.items)) this.attrList = data.data.items
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
.icon {
  &:hover {
    cursor: pointer;
  }
  color: #409EFF;
}
</style>

