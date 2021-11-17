<template>
  <div :class="classObj">
    <logo v-if="showLogo" :collapse="true" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="true" :unique-opened="true"
        :collapse-transition="false" mode="vertical">
        <template v-for="route in menuList">
          <el-submenu ref="subMenu" :index="route.path" popper-append-to-body
            v-if="route.children && route.children.length"
            :popper-class="`${slideClass} ${themeClass} ${layoutType}`" :key="route.path">
            <template slot="title">
              <item :icon="route.icon" :title="generateTitle(route.vueName,route.fullName)" />
              <div class="mainTitle">{{generateTitle(route.vueName,route.fullName)}}</div>
            </template>
            <sidebar-item v-for="child in route.children" :key="child.enCode" :is-nest="true"
              :item="child" :base-path="child.path" class="nest-menu" />
          </el-submenu>
          <template v-else>
            <app-link :to="route.path" :key="route.path">
              <el-menu-item :index="route.path" :class="{'submenu-title-noDropdown':true}">
                <item :icon="route.icon" />
                <div class="mainTitle">{{generateTitle(route.vueName,route.fullName)}}</div>
              </el-menu-item>
            </app-link>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import { generateTitle } from '@/utils/i18n'
import variables from '@/styles/variables.scss'
import Item from './Item'
import AppLink from './Link'

export default {
  components: { SidebarItem, Logo, Item, AppLink },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar',
      'menuList'
    ]),
    ...mapState({
      slideClass: state => state.settings.slideClass,
      themeClass: state => state.settings.themeClass,
      layoutType: state => state.settings.layoutType
    }),
    classObj() {
      return {
        [this.slideClass]: true,
        'has-logo': this.showLogo
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
  },
  methods: {
    generateTitle
  }
}
</script>