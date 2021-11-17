<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main user-form">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack" content="组织架构图" />
        <div class="options">
          <el-button @click="goBack">{{$t('common.cancelButton')}} </el-button>
        </div>
      </div>
      <div class="main">
        <organization-chart :datasource="ds"></organization-chart>
      </div>
    </div>
  </transition>
</template>

<script>
import { getDepartmentSelector } from '@/api/permission/department'
import OrganizationChart from 'vue-organization-chart'
import 'vue-organization-chart/dist/orgchart.css'

export default {
  components: {
    OrganizationChart
  },
  data() {
    return {
      ds: {}
    }
  },
  methods: {
    init() {
      getDepartmentSelector().then(res => {
        let data = res.data.list
        let _this = this
        const loop = list => {
          for (let i = 0; i < list.length; i++) {
            _this.$set(list[i], 'name', list[i].fullName)
            if (list[i].children && Array.isArray(list[i].children) && list[i].children.length) {
              loop(list[i].children)
            }
          }
        }
        loop(data)
        this.$nextTick(() => {
          if (data.length > 1) {
            data = {
              name: '组织架构图',
              children: data
            }
          }
          this.ds = data
        })
      })
    },
    goBack() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
>>> .orgchart-container {
  height: 95%;
  border: none !important;
  .orgchart {
    background: none !important;
    .node {
      &:hover {
        background-color: transparent !important;
      }
      .title {
        background-color: #1890ff;
      }
      .content {
        border: 1px solid #1890ff;
      }
    }
  }
  .orgchart .lines {
    .rightLine {
      border-right: 1px solid #1890ff;
    }
    .leftLine {
      border-left: 1px solid #1890ff;
    }
    .topLine {
      border-top: 2px solid #1890ff;
    }
    .downLine {
      background-color: #1890ff;
    }
  }
}
</style>