<template>
  <div class="jnpf-table-opts">
    <!--左侧插槽-->
    <slot name="left" />
    <template v-if="isJudgePer">
      <el-button size="mini" type="text" @click="edit()" v-if="hasEdit" :disabled="editDisabled"
        v-has="editPerCode">{{ editText === '编辑' ? $t(`common.editBtn`) : editText }}</el-button>
    </template>
    <template v-else>
      <el-button size="mini" type="text" @click="edit()" v-if="hasEdit" :disabled="editDisabled">
        {{ editText === '编辑' ? $t(`common.editBtn`) : editText }}</el-button>
    </template>
    <!-- 中间插槽 -->
    <slot name="center" />
    <template v-if="isJudgePer">
      <el-button size="mini" type="text" class="JNPF-table-delBtn" @click="del()" v-if="hasDel"
        :disabled="delDisabled" v-has="delPerCode">
        {{ delText === '删除' ? $t(`common.delBtn`) : delText }}</el-button>
    </template>
    <template v-else>
      <el-button size="mini" type="text" class="JNPF-table-delBtn" @click="del()" v-if="hasDel"
        :disabled="delDisabled">{{ delText === '删除' ? $t(`common.delBtn`) : delText }}</el-button>
    </template>
    <!-- 默认右侧插槽 -->
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    delText: {
      type: String,
      default: '删除'
    },
    editText: {
      type: String,
      default: '编辑'
    },
    // 是否展示编辑按钮
    hasEdit: {
      type: Boolean,
      default: true
    },
    // 是否展示删除按钮
    hasDel: {
      type: Boolean,
      default: true
    },
    editDisabled: {
      type: Boolean,
      default: false
    },
    delDisabled: {
      type: Boolean,
      default: false
    },
    // 编辑按钮权限标识
    editPerCode: {
      type: String,
      default: 'btn_edit'
    },
    // 删除按钮权限标识
    delPerCode: {
      type: String,
      default: 'btn_remove'
    },
    // 是否开启权限判断
    isJudgePer: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {}
  },
  methods: {
    del() {
      this.$emit('del')
    },
    edit() {
      this.$emit('edit')
    }
  }
}
</script>