<template>
  <div class="CommonForm-container app-container nohead">
    <div class="dataForm">
      <el-alert title="下拉框、多选框、单选框、树形选择" type="warning" :closable="false" />
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" class="mt-10">
        <el-form-item label="当前状态">
          <el-switch v-model="dataForm.EnabledMark">
          </el-switch>
        </el-form-item>
        <el-form-item label="请假类别">
          <el-radio-group v-model="dataForm.LeaveType">
            <el-radio :label="item" v-for="item in radioOptions" :key="item">{{item}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="运输工具">
          <el-radio-group v-model="dataForm.Conveyance">
            <el-radio :label="item" v-for="item in radioOptions1" :key="item">
              <i :class="'icon-ym icon-ym-extend-'+item" style="font-size:18px;"></i>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="传统节日">
          <el-checkbox-group v-model="dataForm.Festival">
            <el-checkbox :label="item" v-for="item in checkboxOptions" :key="item"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="角色类型">
          <el-select v-model="dataForm.RoleType" placeholder="请选择类型">
            <el-option v-for="item in options" :key="item.enCode" :label="item.fullName"
              :value="item.enCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="树形下拉框">
          <JNPF-TreeSelect :options="treeData" v-model="dataForm.parentId" @getValue="getValue"
            placeholder="请选择">
            <template slot-scope="{data}">
              <i :class="data.data.icon"></i>
              <span class="text">{{data.node.label}}</span>
            </template>
          </JNPF-TreeSelect>
        </el-form-item>
        <!-- <el-form-item label="地区">
          <el-select v-model="dataForm.RoleType" placeholder="请选择类型">
            <el-option v-for="item in options" :key="item.id" :label="item.text" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="级联选择器">
          <el-cascader v-model="dataForm.cascader" :options="options1"></el-cascader>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>
import { getPositionSelector } from '@/api/permission/position'
export default {
  name: 'extend-formDemo-fieldForm2',
  data() {
    return {
      dataForm: {
        EnabledMark: true,
        LeaveType: '年假',
        Conveyance: 'car',
        Festival: ['春节', '清明节'],
        RoleType: "",
        Position: "",
        cascader: []
      },
      dataRule: {},
      radioOptions: ['事假', '病假', '婚假', '产假', '丧假', '年假', '调休', '其他'],
      radioOptions1: ['bicycle', 'motorcycle', 'plane', 'truck', 'subway', 'car', 'bus', 'rocket', 'train', 'ambulance'],
      checkboxOptions: ['春节', '清明节', '七夕节', '五一节', '端午节', '中秋节', '重阳节', '除夕', '元旦'],
      options: [],
      treeData: [],
      options1: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }]
    }
  },
  created() {
    this.getDictionaryData()
    this.init()
  },
  methods: {
    getValue(value) {
      this.dataForm.Position = value
    },
    init() {
      // this.$refs['dataForm'].resetFields()
      getPositionSelector().then(res => {
        this.treeData = res.data.list
      })
    },
    getDictionaryData() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'RoleType' }).then((res) => {
        this.options = res
      })
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // this.$message({
          //   message: '验证成功',
          //   type: 'success',
          //   duration: 1500,
          // })
        }
      })
    },
    redy() {
      function GetRandomNum(Min, Max) {
        let Range = Max - Min;
        let Rand = Math.random();
        return (Min + Math.round(Rand * Range));
      }
      let num = GetRandomNum(1, 100);
      this.dataForm.ProductPrice = num
    }
  }
}
</script>
<style lang="scss" scoped>
.CommonForm-container {
  .JNPF-common-head {
    height: 50px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  .dataForm {
    flex: 1;
    overflow: auto;
    .el-input {
      width: 300px;
    }
    .tip {
      margin-left: 10px;
      color: darkgray;
    }
  }
}
</style>