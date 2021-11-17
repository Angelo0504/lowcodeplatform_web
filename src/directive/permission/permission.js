import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const permissionList = store.getters && store.getters.permissionList
    if (!value) return el.parentNode && el.parentNode.removeChild(el)
    const modelId = vnode.context._routerRoot._route.meta.modelId || ''
    if (!modelId) return el.parentNode && el.parentNode.removeChild(el)
    const list = permissionList.filter(o => o.modelId === modelId)
    if (!list.length) return el.parentNode && el.parentNode.removeChild(el)
    const btnList = list[0] && list[0].button ? list[0].button : []
    if (!btnList.length) {
      el.parentNode && el.parentNode.removeChild(el)
    } else {
      const hasPermission = btnList.some(btn => btn.enCode === value)
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }
}