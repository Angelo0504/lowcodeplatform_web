<template>
  <el-drawer :visible.sync="drawer" direction="rtl" :with-header="false"
    class="drawer-container setting" size="280px">
    <el-divider>{{$t('settings.mode')}}</el-divider>
    <ul class="nav_items">
      <li v-for="(item1,index1) in imgUrl1" :key="index1" @click="checkList(item1)">
        <div class="imgItems">
          <div class="img">
            <img :src="item1.imgrurl" alt="">
            <div class="icon-checked" v-if="item1.layoutType===layoutType">
              <i class=" el-icon-check"></i>
            </div>
          </div>
        </div>
        <span>{{$t(`settings.${item1.layoutType}`)}}</span>
      </li>
    </ul>
    <el-divider>{{$t('settings.lightOrDark')}}</el-divider>
    <ul class="nav_items">
      <li v-for="(item2,index2) in imgUrl2" :key="index2" @click="checkList2(item2)">
        <div class="imgItems">
          <div class="img">
            <img :src="item2.imgrurl" alt="">
            <div class="icon-checked" v-if="item2.className === slideClass">
              <i class=" el-icon-check"></i>
            </div>
          </div>
        </div>
        <span>{{$t(`settings.${item2.className}`)}}</span>
      </li>
      <li style="cursor: default;">
        <div class="imgItems"></div>
      </li>
    </ul>
    <el-divider>{{$t('settings.theme')}}</el-divider>
    <div class="colorList">
      <el-tooltip class="item" effect="dark" :content="$t(`settings.${item3.className}`)"
        placement="top" v-for="(item3,index3) in imgUrl3" :key="index3">
        <el-tag @click="checkList3(item3)" :color="item3.color">
          <i class="el-icon-check" v-if="item3.className===themeClass"></i>
        </el-tag>
      </el-tooltip>
    </div>
    <el-divider>{{$t('settings.otherSet')}}</el-divider>
    <div class="drawer-item">
      <span>{{$t('settings.tagsView')}}</span>
      <el-switch v-model="tagsView" class="drawer-switch" />
    </div>
    <div class="drawer-item">
      <span>{{$t('settings.tagsViewIcon')}}</span>
      <el-switch v-model="tagsIcon" class="drawer-switch" />
    </div>
    <div class="drawer-item">
      <span>{{$t('settings.language')}}</span>
      <el-switch v-model="showLanguage" class="drawer-switch" />
    </div>
    <div class="drawer-item">
      <span>{{$t('settings.search')}}</span>
      <el-switch v-model="showSearch" class="drawer-switch" />
    </div>
  </el-drawer>
</template>

<script>
import { UpdateTheme } from '@/api/permission/userSetting'
import themeColor from '@/assets/scss/theme.scss'
import themeMinix from './minix'
export default {
  mixins: [themeMinix],
  name: 'Settings',
  data() {
    return {
      drawer: false,
      themeClass: '',
      imgUrl1: [
        {
          imgrurl: require('@/assets/images/settings/classic.png'),
          name: '经典款',
          layoutType: 'classic'
        },
        {
          imgrurl: require('@/assets/images/settings/functional.png'),
          name: '功能款',
          layoutType: 'functional'
        },
        {
          imgrurl: require('@/assets/images/settings/plain.png'),
          name: '简约款',
          layoutType: 'plain'
        }
      ],
      imgUrl2: [
        {
          imgrurl: require('@/assets/images/settings/dark.png'),
          name: '暗黑模式',
          className: 'dark'
        },
        {
          imgrurl: require('@/assets/images/settings/lightWhite.png'),
          name: '亮白模式',
          className: 'lightWhite'
        },
      ],
      imgUrl3: [
        {
          name: '经典蓝',
          className: 'blue',
          color: themeColor.blueTheme,
        },
        {
          name: '玫紫',
          className: 'purple',
          color: themeColor.purpleTheme,
        },
        {
          name: '湛蓝',
          className: 'azure',
          color: themeColor.azureTheme,
        },
        {
          name: '海洋',
          className: 'ocean',
          color: themeColor.oceanTheme,
        },
        {
          name: '生机',
          className: 'green',
          color: themeColor.greenTheme,
        },
        {
          name: '丰收',
          className: 'yellow',
          color: themeColor.yellowTheme,
        },
        {
          name: '阳橙',
          className: 'orange',
          color: themeColor.orangeTheme,
        },
        {
          name: '热情',
          className: 'red',
          color: themeColor.redTheme,
        },
      ]
    }
  },
  computed: {
    defaultThemeClass() {
      return this.$store.state.settings.themeClass
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "tagsView",
          value: val
        });
      }
    },
    tagsIcon: {
      get() {
        return this.$store.state.settings.tagsIcon;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "tagsIcon",
          value: val
        });
      }
    },
    showLanguage: {
      get() {
        return this.$store.state.settings.showLanguage;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showLanguage",
          value: val
        });
      }
    },
    showSearch: {
      get() {
        return this.$store.state.settings.showSearch;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSearch",
          value: val
        });
      }
    },
    slideClass: {
      get() {
        return this.$store.state.settings.slideClass;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "slideClass",
          value: val
        });
      }
    },
    layoutType: {
      get() {
        return this.$store.state.settings.layoutType;
      },
      set(val) {
        UpdateTheme({ theme: val }).then(res => {
        })
        this.$store.dispatch("settings/changeSetting", {
          key: "layoutType",
          value: val
        });
      }
    },
  },
  watch: {
    defaultThemeClass: {
      handler: function (val, oldVal) {
        if (!val) return
        this.themeClass = val
        let activeItem = this.imgUrl3.filter(o => o.className === val)[0]
        this.theme = activeItem && activeItem.color ? activeItem.color : "#1890ff"
      },
      immediate: true
    },
  },
  created() { },
  methods: {
    init() {
      this.drawer = true
    },
    checkList(item) {
      if (item.layoutType === this.layoutType) return
      this.layoutType = item.layoutType
    },
    checkList2(item) {
      if (item.className === this.slideClass) return
      this.slideClass = item.className
    },
    checkList3(item) {
      if (item.className === this.themeClass) return
      this.$store.dispatch("settings/changeSetting", {
        key: "themeClass",
        value: item.className
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  >>> .el-drawer__body {
    padding: 30px 20px;
    overflow: auto;
    overflow-x: hidden;
  }
  >>> .nav_items {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    li {
      list-style: none;
      text-align: center;
      display: flex;
      flex-direction: column;
      padding-bottom: 10px;
      cursor: pointer;
      width: 65px;
      .imgItems {
        position: relative;
        .img {
          width: 65px;
          height: 55px;
          border-radius: 10px;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .icon-checked {
          display: block;
          width: 10px;
          height: 10px;
          border: 10px solid #409eff;
          border-left: 10px solid transparent;
          border-top: 10px solid transparent;
          border-bottom-right-radius: 10px;
          position: absolute;
          transform: scale(0.8);
          right: -1px;
          bottom: -1px;
          i {
            position: absolute;
            top: -2px;
            left: -3px;
            font-size: 12px;
            color: #fff;
            transform: scale(0.8);
          }
        }
      }
      span {
        font-size: 12px;
        color: #707070;
        margin-top: 10px;
      }
    }
  }
  .drawer-title {
    margin-bottom: 15px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    margin-top: 24px;
    font-weight: bolder;
  }

  .drawer-item {
    color: #707070;
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right;
  }
  .colorList {
    padding: 10px 0;
    .el-tag {
      width: 24px;
      height: 24px;
      border: none !important;
      margin-right: 4px;
      border-radius: 2px;
      cursor: pointer;
      padding: 0;
      text-align: center;
      vertical-align: top;
    }
    .el-icon-check {
      color: #fff;
      font-size: 16px;
      line-height: 24px;
    }
  }
}
</style>