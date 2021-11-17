import Vue from 'vue'
import VueI18n from 'vue-i18n'
import jnpf from '@/utils/jnpf'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import elementZhTWLocale from 'element-ui/lib/locale/lang/zh-TW' // element-ui lang
import enLocale from './en'
import zhLocale from './zh'
import zhtwLocale from './zhtw'

Vue.use(VueI18n)

const messages = {
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zhtw: {
    ...zhtwLocale,
    ...elementZhTWLocale
  }
}
export function getLanguage() {
  const chooseLanguage = jnpf.storageGet('language')
  if (chooseLanguage) return chooseLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'zh'
}
const i18n = new VueI18n({
  // options: zh | zhtw | en
  locale: getLanguage(),
  silentTranslationWarn: true,
  // set locale messages
  messages
})

export default i18n