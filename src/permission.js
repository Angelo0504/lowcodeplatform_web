import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken, setToken } from '@/utils/auth'
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/jump'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title, to.meta.zhTitle)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (store.getters.isLock && to.path !== '/lockScreen' && to.path !== '/login') {
      next({
        path: '/lockScreen'
      })
      NProgress.done()
    } else if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      if (to.path === '/home') {
        if (to.query.token) {
          store.commit('user/SET_TOKEN', to.query.token)
          setToken(to.query.token)
        }
      }
      const hasMenu = store.getters.menuList && store.getters.menuList.length > 0
      if (hasMenu) {
        next()
      } else {
        try {
          // get user info
          let res = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', res)
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          if (error && typeof(error) == 'string') Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else if (to.path === '/home') {
      if (to.query.token) {
        store.commit('user/SET_TOKEN', to.query.token)
        setToken(to.query.token)
        const hasMenu = store.getters.menuList && store.getters.menuList.length > 0
        if (hasMenu) {
          next()
        } else {
          try {
            let res = await store.dispatch('user/getInfo')
            const accessRoutes = await store.dispatch('permission/generateRoutes', res)
            router.addRoutes(accessRoutes)
            next('/home')
          } catch (error) {
            next(`/login`)
            NProgress.done()
          }
        }
      } else {
        next(`/login`)
        NProgress.done()
      }
    } else {
      // other pages that do not have permissionEle to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})