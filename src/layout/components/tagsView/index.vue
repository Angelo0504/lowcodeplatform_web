<template>
  <div id="tags-view-container" class="tags-view-container">
    <el-link icon="icon-ym icon-ym-nav-prev" class="el-tabs__nav-prev el-tabs__btn"
      :underline="false" @click="prevBtn" />
    <el-link icon="icon-ym icon-ym-nav-next" class="el-tabs__nav-next el-tabs__btn"
      :underline="false" @click="nextBtn" />
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @scroll="handleScroll">
      <router-link v-for="tag in visitedViews" ref="tag" :key="tag.path"
        :class="isActive(tag)?'active':''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }" tag="span"
        class="tags-view-item" @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
        @contextmenu.prevent.native="openMenu(tag,$event)">
        <template v-if="tag.path==='/home'">
          <i :class="tag.meta.icon" class="tag-icon" v-if="tag.meta && tag.meta.icon"></i>
        </template>
        <template v-else>
          <i :class="tag.meta.icon" class="tag-icon"
            v-if="(tag.meta && tag.meta.icon )&& tagsIcon"></i><span>{{ generateTitle(tag.meta.title,tag.meta.zhTitle) }}</span>
        </template>
        <span v-if="!isAffix(tag)" class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">{{ $t('tagsView.refresh') }}</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        {{ $t('tagsView.close') }}</li>
      <li @click="closeOthersTags">{{ $t('tagsView.closeOthers') }}</li>
      <li @click="closeAllTags(selectedTag)">{{ $t('tagsView.closeAll') }}</li>
    </ul>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import ScrollPane from './ScrollPane'
import { generateTitle } from '@/utils/i18n'
import path from 'path'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    ...mapState({
      tagsIcon: state => state.settings.tagsIcon,
    }),
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    routes() {
      return this.$store.state.permission.routes
    }
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    prevBtn() {
      const tags = this.$refs.tag;
      this.$refs.scrollPane.moveToTarget(tags[0]);
    },
    nextBtn() {
      const tags = this.$refs.tag;
      const lenght = tags.length;
      this.$refs.scrollPane.moveToTarget(tags[lenght - 1]);
    },
    generateTitle, // generateTitle by vue-i18n
    isActive(route) {
      // return route.path === this.$route.path
      return route.fullPath === this.$route.fullPath
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        let { fullPath } = view
        // 对外链刷新的处理，：需要转义
        if (fullPath.indexOf(':') > -1) {
          fullPath = fullPath.replace('/', '')
          fullPath = '/' + encodeURIComponent(fullPath)
        }
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeOthersTags() {
      if (this.selectedTag.path !== this.$route.path) this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 39px;
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #e8eaec;
  .el-tabs__btn {
    display: inline-block;
    width: 40px;
    height: 38px;
    line-height: 38px;
    text-align: center;
    cursor: pointer;
    background-color: #fff;
    z-index: 10;
    position: absolute;
    &:first-of-type {
      border-right: 1px solid #e8eaec;
    }
    &:last-of-type {
      border-left: 1px solid #e8eaec;
    }
    >>> .icon-ym {
      font-size: 20px;
    }
  }
  .tags-view-wrapper {
    box-sizing: border-box;
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 38px;
      line-height: 38px;
      border-right: 1px solid #e8eaec;
      color: #666;
      background-color: #fff;
      padding: 0 18px;
      font-size: 14px;
      .tag-icon {
        vertical-align: middle;
        font-size: 18px;
      }
      .tag-icon + span {
        line-height: 38px;
        vertical-align: middle;
        margin-left: 4px;
      }
      &:first-of-type {
        margin-left: 40px;
      }
      &:last-of-type {
        margin-right: 40px;
      }
      &:hover {
        color: #409eff;
      }
      &.active {
        background-color: #ebeef5;
        color: #409efe;
        height: 40px;
        &::after {
          position: absolute;
          left: 0;
          bottom: -1px;
          height: 1px;
          width: 100%;
          display: block;
          content: '';
          background: #ebeef5;
          z-index: 100;
        }
      }
      .el-icon-close {
        border-radius: 50%;
        text-align: center;
        position: relative;
        cursor: pointer;
        font-size: 12px;
        height: 16px;
        width: 16px;
        line-height: 16px;
        vertical-align: middle;
        top: 0px;
        right: -2px;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

