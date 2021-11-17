<template>
  <el-col :span="item.__config__.span"
    :class="{'item-card':item.__config__.jnpfKey==='card','item-table':item.__config__.jnpfKey==='table'}">
    <template v-if="item.__config__.layout==='colFormItem'">
      <template v-if="item.__config__.jnpfKey==='divider'">
        <el-divider :content-position="item['content-position']">{{item.__slot__.default}}
        </el-divider>
      </template>
      <template v-else-if="item.__config__.jnpfKey==='JNPFText'">
        <el-form-item label-width="0">
          <JNPFText :lineHeight="item.lineHeight" :fontSize="item.fontSize"
            v-model="item.__config__.defaultValue" :textStyle="item.textStyle" />
        </el-form-item>
      </template>
      <template v-else-if="item.__config__.jnpfKey==='groupTitle'">
        <el-form-item label-width="0">
          <groupTitle :content="item.content" :content-position="item['content-position']" />
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item :prop="item.__vModel__"
          :label-width="item.__config__.labelWidth?`${item.__config__.labelWidth}px`: null"
          :label="item.__config__.showLabel ? item.__config__.label : '' "
          v-if="!item.__config__.noShow">
          <template v-if="item.__config__.jnpfKey==='uploadFz'">
            <div class="dy-fileList">
              <el-link :underline="false" class="dy-fileList-item"
                v-for="(cItem,ci) in item.__config__.defaultValue" :key="ci"
                @click="downloadFile(cItem)"><i class="el-icon-document"></i>{{cItem.name}}
              </el-link>
            </div>
          </template>
          <template v-else-if="item.__config__.jnpfKey==='uploadImg'">
            <JNPFenlarge :img="define.comUrl+cItem.url"
              v-for="(cItem,ci) in item.__config__.defaultValue" :key="ci" />
          </template>
          <template v-else-if="item.__config__.jnpfKey==='colorPicker'">
            <el-color-picker v-model="item.__config__.defaultValue" :show-alpha="item['show-alpha']"
              :color-format="item['color-format']" :size="item.size" disabled />
          </template>
          <template v-else-if="item.__config__.jnpfKey==='rate'">
            <el-rate v-model="item.__config__.defaultValue" :max="item.max"
              :allow-half="item['allow-half']" :show-text="item['show-text']"
              :show-score="item['show-score']" disabled />
          </template>
          <template v-else-if="item.__config__.jnpfKey==='switch'">
            <el-switch v-model="item.__config__.defaultValue" :active-value="item['active-value']"
              :active-color="item['active-color']" :active-text="item['active-text']"
              :inactive-color="item['inactive-color']" :inactive-text="item['inactive-text']"
              :inactive-value="item['inactive-value']" disabled />
          </template>
          <template v-else-if="item.__config__.jnpfKey==='slider'">
            <div class="slider-box">
              <el-slider v-model="item.__config__.defaultValue" :range='item.range'
                :show-stops="item['show-stops']" />
              <div class="slider-mark"></div>
            </div>
          </template>
          <template v-else-if="item.__config__.jnpfKey==='editor'">
            <div v-html="item.__config__.defaultValue"></div>
          </template>
          <template v-else-if="item.__config__.jnpfKey==='relationForm'">
            <el-link :underline="false" @click.native="toDetail(item)" type="primary">
              {{ item.name }}</el-link>
          </template>
          <template v-else-if="item.__config__.jnpfKey==='relationFormAttr'">
            <p class="dynamicDetail-text">
              {{ relationData[item.relationField] &&relationData[item.relationField][item.showField] ? relationData[item.relationField][item.showField] : '' }}
            </p>
          </template>
          <template v-else>
            <p class="dynamicDetail-text">{{ getValue(item) }}</p>
          </template>
        </el-form-item>
      </template>
    </template>
    <template v-else>
      <template v-if="item.__config__.jnpfKey==='card'">
        <el-card :shadow="item.shadow" class="mb-20">
          <Item v-for="(childItem, childIndex) in item.__config__.children" :key="childIndex"
            :item="childItem" v-bind="$props" v-on="$listeners" />
        </el-card>
      </template>
      <template v-if="item.__config__.jnpfKey==='row'">
        <el-row :gutter="formConf.gutter">
          <Item v-for="(childItem, childIndex) in item.__config__.children" :key="childIndex"
            :item="childItem" v-bind="$props" v-on="$listeners" />
        </el-row>
      </template>
      <template v-if="item.__config__.jnpfKey==='table'">
        <el-form-item label-width="0">
          <div class="JNPF-common-title" v-if="item.__config__.showTitle">
            <h2>{{item.__config__.label}}</h2>
          </div>
          <JNPF-table :data="item.__config__.defaultValue">
            <el-table-column v-for="(column,columnIndex) in item.__config__.children"
              :key="columnIndex" :prop="column.__vModel__" :label="column.__config__.label" />
          </JNPF-table>
        </el-form-item>
      </template>
    </template>
  </el-col>
</template>
<script>
import JNPFenlarge from "@/components/JNPF-enlarge"
import { getDownloadUrl } from '@/api/common'

export default {
  name: 'Item',
  components: { JNPFenlarge },
  props: {
    item: {
      type: Object,
      required: true
    },
    formConf: {
      type: Object,
      required: true
    },
    relationData: {
      type: Object,
      default: () => { }
    }
  },
  methods: {
    toDetail(item) {
      this.$emit('toDetail', item)
    },
    downloadFile(file) {
      if (!file.fileId) return
      getDownloadUrl('annex', file.fileId).then(res => {
        if (res.data.url) window.location.href = this.define.comUrl + res.data.url
      })
    },
    getValue(item) {
      if (Array.isArray(item.__config__.defaultValue)) {
        if (['timeRange', 'dateRange'].includes(item.__config__.jnpfKey)) {
          return item.__config__.defaultValue.join('')
        }
        return item.__config__.defaultValue.join()
      }
      return item.__config__.defaultValue
    }
  }
}
</script>