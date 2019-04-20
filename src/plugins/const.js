import { getAllCategory } from '@/api/product/category'
import { sessionStorage } from '@/utils/storage'

export default function install (Vue, options) {
  Vue.prototype.$getCategory = async () => {
    let category = sessionStorage.getJson('category')
    if (!category) {
      const { data } = await getAllCategory({})
      if (data.data.length) {
        category = data.data
        sessionStorage.setJson('category', category)
      }
    }
    return category
  }
}
