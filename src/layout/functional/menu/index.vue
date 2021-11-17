<template>
  <div :class="classObj" class="top-menu" id="topMenu">
    <el-menu mode="horizontal" :unique-opened="true" :default-active="activeMenu">
      <sidebar-item v-for="route in list" :key="route.enCode" :item="route" :base-path="route.path"
        ref="sidebarItem" />
    </el-menu>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import elementResizeDetectorMaker from 'element-resize-detector'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar',
      'menuList'
    ]),
    ...mapState({
      slideClass: state => state.settings.slideClass,
    }),
    classObj() {
      return {
        // [this.slideClass]: true
      };
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if (meta.activeMenu) {
      //   return meta.activeMenu
      // }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    let _this = this
    this.$nextTick(() => {
      // 监听页面宽度变化
      let erd = elementResizeDetectorMaker({ strategy: "scroll" })
      erd.listenTo(document.getElementById('topMenu'), function (element) {
        let width = element.offsetWidth
        let newList = []
        let moreItem = {
          path: "/menuMore",
          children: [],
          fullName: '更多 ...',
          vueName: 'moreMenu',
          icon: ''
        }
        let number = Math.floor(width / 116)
        let length = _this.menuList.length
        if (number >= length) return _this.list = _this.menuList
        for (let i = 0; i < length; i++) {
          const item = _this.menuList[i];
          if (i < number - 1) {
            newList.push(item)
          } else {
            moreItem.children.push(item)
          }
        }
        if (moreItem.children.length) newList.push(moreItem)
        _this.list = newList
      });
    })
  }
}
</script>