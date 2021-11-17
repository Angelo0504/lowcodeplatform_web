import permission from './permission'

const install = function(Vue) {
  Vue.directive('has', permission)
}

if (window.Vue) {
  window['has'] = permission
  Vue.use(install); // eslint-disable-line
}

permission.install = install
export default permission