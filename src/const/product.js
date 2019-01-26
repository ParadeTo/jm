export const productCols = [
  {
    label: '条码',
    key: 'barcode'
  },
  {
    label: '商品图片',
    key: 'images'
  },
  {
    label: '商品名称',
    key: 'skuName'
  },
  {
    label: '商品品牌',
    key: 'brand'
  },
  {
    label: '商品类目',
    key: 'img'
  },
  {
    label: '商品分类',
    key: 'img'
  },
  {
    label: '单位',
    key: 'img'
  },
  {
    label: '库存',
    key: 'img'
  },
  {
    label: '销售价',
    key: 'price'
  },
  {
    label: '上下架状态',
    key: 'delFlag',
    transform: value => (value === 1 ? '已删除' : '可用')
  }
]
