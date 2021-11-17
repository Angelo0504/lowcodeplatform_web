<template>
  <el-dropdown class="international" @command="handleSetLanguage">
    <div>
      <i class="icon-ym icon-ym-header-language"></i>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">
        简体中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='zhtw'" command="zhtw">
        繁体中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">
        English
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { UpdateLanguage } from '@/api/permission/userSetting'
import getPageTitle from '@/utils/get-page-title'
export default {
  computed: {
    language() {
      return this.$store.getters.language
    }
  },
  methods: {
    handleSetLanguage(lang) {
      UpdateLanguage({ language: lang }).then(res => { })
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      let text = '切换成功'
      if (lang === 'en') text = 'Switch Language Success'
      if (lang === 'zhtw') text = '切換成功'
      document.title = getPageTitle(this.$route.meta.title, this.$route.meta.zhTitle)
      this.$message({
        message: text,
        type: 'success'
      })
    }
  }
}
</script>
