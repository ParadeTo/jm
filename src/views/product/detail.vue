<template>
  <div class="app-container">
    <el-form label-position="right" label-width="100px" :model="model">
      <!-- <el-row v-if="isView">
        <el-col :span="4" style="text-align: right;">
          <el-button @click="delProduct" type="danger" v-waves>删除商品</el-button>
         </el-col>
      </el-row> -->
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
            <!-- <category-add :dialogVisible="dialogVisible" @close="dialogVisible = false"/> -->
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
            <el-radio-group v-model="model.productType">
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
                    <el-input :disabled="scope.row.type==='basic'" v-model="scope.row.model.conversion"/>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="价格">
                  <template slot-scope="scope">
                    <el-input type="number" v-model="scope.row.model.price" />
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
                  :value="attr.attr"
                  @input="()=>{}"
                  :list="attrList"
                  :valueTrack="{}"
                  @change="(value) => handleAttrChange(attr, value)"
                />
                <simple-select
                  multiple
                  placeholder="规格值"
                  v-model="attr.attrValueListSelected"
                  :list="attr.attrValueList"
                  :valueTrack="{}"
                  @change="() => handleAttrValueChange(attr)"
                />
                <i class="el-icon-remove icon" @click="removeAttr(index)" v-if="index!==0" />
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

      <el-row style="text-align: rigxht" v-if="!isView">
        <el-col :span="4" :offset="14">
          <el-button type="primary" v-waves @click="save">保存</el-button>
          <el-button type="default" v-waves @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import ClassifyAdd from './components/classifyAdd'
import CartesianTable from './components/cartesianTable'
import { saveProduct, editProduct, getProductDetail } from '@/api/product/index'
import { getAllCategory } from '@/api/product/category'
import { getAllBrand } from '@/api/product/brand'
import { getAllClassify } from '@/api/product/classify'
import { getAttributeAndValueList } from '@/api/product/attribute'
import { delSku } from '@/api/product/sku'
import { getUnitList } from '@/api/product/unit'
import { deepEq, deepmerge } from '@/utils/index'

const MULTI_ATTR_TABLE_COLS = [{
  label: '条码',
  minWidth: 180,
  input: true,
  key: 'barcode'
}, {
  label: '价格',
  input: true,
  key: 'price'
}]

const UNIT_TYPE = {
  0: {
    label: '基本单位',
    key: 'basic'
  },
  1: {
    label: '辅助单位1',
    key: 'auxiliary'
  },
  2: {
    label: '辅助单位2',
    key: 'auxiliary'
  }
}

export default {
  components: {
    ClassifyAdd,
    CartesianTable
  },

  data() {
    return {
      id: null,
      isView: false,
      brandList: [],
      classifyList: [],
      productAttributeList: [],
      attrList: [],
      attrListSelected: [
        {
          attr: null,
          attrValueList: [],
          attrValueListSelected: []
        }
      ],
      cartesianData: [],
      originCartesianData: [],
      cartesianCols: [],
      model: {
        name: "",
        attrValue: "",
        productType: 1,
        owncode: "",
        brand: null,
        cateId: "",
        classifyId: [],
        unitId: "", // 多规格商品需要
        images: "",
        remark: ""
      },
      categoryList: [],
      skuReqListBasic: [
        {
          name: "基本单位",
          type: "basic",
          model: {
            barcode: "",
            conversion: 1,
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
      originSkuReqListBasic: [],
      // attrs: [],
      tableLoading: false,
      dialogVisible: false
    }
  },

  mounted () {
    this.id = Number(this.$route.params.id)
    if (this.$route.name === 'productDetail') this.isView = true
    if (this.id) this.initDate()
  },

  computed: mapGetters(["brand"]), // brandList

  methods: {
    ...mapActions([
      'updateBrand',
      'updateClassify'
    ]),

    ...mapMutations([
      'UPDATE_BRAND',
      'UPDATE_CLASSIFY'
    ]),

    delProduct () {
      delSku(this.id)
    },

    async initDate () {
      const loading = this.$loading()
      const { model } = this
      const rsp = await getProductDetail(this.id)
      if (rsp && rsp.data.data) {
        const {
          brandId,
          classifyId,
          cateId,
          name,
          owncode,
          productType,
          unitId,
          productAttributeList,
          attrValue,
          remark,
          skuList
        } = rsp.data.data
        model.cateId = cateId
        model.classifyId = classifyId
        model.name = name
        model.owncode = owncode
        model.productType = productType
        model.unitId = unitId
        model.attrValue = attrValue
        model.remark = remark
        await this.updateAccordingToCate(cateId)
        this.initBrand(brandId)
        if (productType === 2) {
          this.productAttributeList = productAttributeList
          this.initAttrListAndTabelCols(productAttributeList)
          this.initCartesianData(skuList)
        } else {
          this.initSkuReqListBasic(skuList)
        }
      }
      loading.close()
    },

    initSkuReqListBasic(skuList) {
      this.skuReqListBasic = skuList.map(({
        attrValueList,
        barcode,
        conversion,
        id,
        price,
        unitId,
        unitType
      }) => {
        return {
          name: UNIT_TYPE[unitType].label,
          type: UNIT_TYPE[unitType].key,
          model: {
            id,
            barcode,
            conversion,
            price,
            unitId,
            unitType
          }
        }
      })
      this.originSkuReqListBasic = deepmerge(null, this.skuReqListBasic)
    },

    initBrand (brandId) {
      this.model.brand = this.brand.find(b => b.id === brandId)
    },

    initAttrListAndTabelCols (productAttributeList) {
      this.attrListSelected = []
      productAttributeList.forEach(attribute => {
        const attr = this.attrList.find(_attr => _attr.id === attribute.attrId)
        const { attrValueList, name, id } = attr
        const attrValueListSelected = attrValueList.filter(attrValue =>
          attribute.attrValueList.includes(attrValue.id)
        )
        this.attrListSelected.push({
          attr,
          attrValueList,
          attrValueListSelected
        })
        this.cartesianCols.push({
          label: name,
          key: id
        })
      })
      this.cartesianCols.push(...MULTI_ATTR_TABLE_COLS)
    },

    initCartesianData (skuList) {
      this.cartesianData = skuList.map(sku => {
        const {
          price,
          id: skuId,
          barcode,
          attrValueList
        } = sku

        const row = {
          price,
          barcode,
          id: skuId
        }
        for (let i = 0, len = this.cartesianCols.length; i < len; i++) {
          const col = this.cartesianCols[i]
          if (this.attrListSelected.find(({ attr }) => attr.id === col.key)) {
            const {
              attrId,
              attrValueId,
              attrValueName,
              atrrValueName
            } = attrValueList.find(attrValue => attrValue.attrId === col.key)
            row[attrId] = {
              attrId,
              attrValueId,
              attrValueName: attrValueName || atrrValueName
            }
          }
        }
        return row
      })
      this.originCartesianData = this.cartesianData
    },

    handleUnitOperation(operation, scope) {
      const len = this.skuReqListBasic.length
      const originLen = this.originSkuReqListBasic.length
      if (operation === "add") {
        let sku = {
          name: `辅助单位${len}`,
          type: "auxiliary",
          model: {
            barcode: "",
            conversion: "",
            price: "",
            unitId: "",
            unitType: len
          }
        }
        if (len < originLen) sku = deepmerge(null, this.originSkuReqListBasic[len])
        this.skuReqListBasic.push(sku)
      } else {
        this.skuReqListBasic.splice(scope.$index, 1)
      }
    },
    async save() {
      const { id, name } = this.model.brand
      const data = {
        ...this.model,
        brandId: id,
        brandName: name,
        skuList: []
      }
      delete data.brand
      if (this.model.productType === 1) {
        this.skuReqListBasic.forEach(s => {
          data.skuList.push(s.model)
        })
      } else if (this.model.productType === 2) {
        data.productAttributeList = this.genProductAttrbuteList()
        this.cartesianData.forEach(c => {
          const row = {
            barcode: c.barcode,
            price: c.price,
            attrValueList: []
          }
          if (c.id !== undefined) row.id = c.id
          for (let k in c) {
            if (c[k].attrId) {
              row.attrValueList.push(c[k])
            }
          }
          data.skuList.push(row)
        })
      }

      if (this.id) {
        data.productId = this.id
      }

      if (this.id) {
        await editProduct(data)
      } else {
        await saveProduct(data)
      }
      this.$router.push({ name: 'productList' })
    },
    genProductAttrbuteList () {
      if (!this.id) { // add
        this.productAttributeList = this.attrListSelected.filter(attr =>
          attr.attrValueListSelected.length > 0
        ).map(attr => ({
          productId: null,
          attrId: attr.attr.id
        }))
      } else { // edit
        this.productAttributeList = this.attrListSelected.map(attr => {
          const productAttr = this.productAttributeList.find(productAttr =>
            productAttr.attrId === attr.attr.id
          )
          if (productAttr) {
            return {
              ...productAttr,
              attrValueList: attr.attrValueListSelected.map(attrValue => attrValue.id)
            }
          } else {
            return {
              productId: this.id,
              attrValueList: attr.attrValueListSelected.map(attrValue => attrValue.id),
              attrId: attr.attr.id
            }
          }
        })
      }
      return this.productAttributeList
    },
    cancel() {},
    onChange() {
      console.log(this.unitList)
    },
    addAttr() {
      this.attrListSelected.push(
        {
          attr: null,
          attrValueList: [],
          attrValueListSelected: []
        }
      )
    },
    removeAttr(index) {
      this.attrListSelected.splice(index, 1)
      this.updateCartesianData()
    },
    handleCateChange(cateId) {
      this.model.brandId = ""
      this.model.classifyId = ""
      this.updateAccordingToCate(cateId)
    },
    async updateAccordingToCate (cateId) {
      if (Number(cateId) === 0) {
        this.UPDATE_BRAND([])
        this.UPDATE_CLASSIFY([])
        return
      }
      await Promise.all([
        this.updateAttributeList(cateId),
        this.updateBrand(cateId),
        this.updateClassify(cateId)
      ])
    },
    findAttrValue (attrId) {
      const attr = this.attrList.find(attr => attr.id === attrId)
      return attr && attr.attrValueList
    },
    handleAttrChange(attr, value) {
      const selected = this.attrListSelected.find(_attr =>
        (_attr && _attr.attr && _attr.attr.id) === (value.id)
      )
      if (selected) {
        this.$message({
          message: '已选择过该规格',
          type: 'info'
        })
        return
      }
      attr.attr = value
      attr.attrValueList = this.findAttrValue(value.id)
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
        cols.push(...MULTI_ATTR_TABLE_COLS)
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
      this.updateCartesianData()
    },

    isRowEqual (a, b) {
      const aKeys = Object.keys(a).filter(k => !isNaN(k))
      const bKeys = Object.keys(b).filter(k => !isNaN(k))
      let key
      let len = aKeys.length

      if (bKeys.length !== len) return false
      while (len--) {
        key = aKeys[len]
        if (!(b.hasOwnProperty(key) && a[key].attrValueId === b[key].attrValueId)) return false
      }
      return true
    },

    updateCartesianData () {
      const { cartesian, cols } = this.getCartesian(this.attrListSelected)
      // 修改时候要保留上次的price和barcode
      this.cartesianData = cartesian.map(newRow => {
        this.originCartesianData.forEach(oldRow => {
          if (this.isRowEqual(
            newRow, oldRow
          )) {
            newRow.barcode = oldRow.barcode
            newRow.price = oldRow.price
            newRow.id = oldRow.id
          }
        })
        return newRow
      })
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

