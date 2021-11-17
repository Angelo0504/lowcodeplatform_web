<template>
  <el-aside width="300px" class="right-box">
    <div class="cap-wrapper">控件属性</div>
    <el-scrollbar class="aside-scrollbar">
      <el-form size="small" label-width="60px" labelPosition="left">
        <template v-if="activeData">
          <el-form-item v-if="activeData.title !== undefined" label="标题">
            <el-input v-model="activeData.title" placeholder="请输入标题" />
          </el-form-item>
          <template v-if="activeData.jnpfKey === 'commonFunc'">
            <el-divider>选项</el-divider>
            <div v-for="(item, index) in activeData.list" :key="index" class="select-item">
              <JNPF-TreeSelect :options="menuList" v-model="item.id" placeholder="请选择菜单" lastLevel
                lastLevelKey='type' :lastLevelValue='2' clearable
                @getValue="getSelectValue(arguments,index)">
              </JNPF-TreeSelect>
              <div class="close-btn select-line-icon" @click="delSelectItem(index)">
                <i class="el-icon-remove-outline" />
              </div>
            </div>
            <el-button icon="el-icon-circle-plus-outline" type="text" @click="addSelectItem"
              v-if="activeData.list.length<10">添加选项</el-button>
          </template>
          <template v-if="activeData.jnpfKey === 'dataBoard'">
            <div v-for="(item, index) in activeData.list" :key="index" class="dataBoard-item">
              <el-divider v-if="index>0"></el-divider>
              <p>选项{{index+1}}</p>
              <el-form-item label="标题">
                <el-input v-model="item.fullName" placeholder="请输入标题" />
              </el-form-item>
              <el-form-item label="数值">
                <el-input v-model="item.num" placeholder="请输入数值" />
              </el-form-item>
              <el-form-item label="图标">
                <el-input v-model="item.icon" placeholder="请输入图标名称">
                  <el-button slot="append" @click="openIconsDialog(index)">
                    选择</el-button>
                </el-input>
              </el-form-item>
            </div>
          </template>
          <template v-if="activeData.jnpfKey && activeData.jnpfKey.indexOf('Chart')>-1">
            <el-form-item label="数据源">
              <el-button @click="showData(activeData.option)">查看</el-button>
            </el-form-item>
          </template>
        </template>
      </el-form>
    </el-scrollbar>
    <JSONArea v-if="areaVisible" ref="JSONArea" @refresh="updataOption" />
    <iconBox :visible.sync="iconsVisible" :current="current" @choiceIcon="setIcon" />
  </el-aside>
</template>
<script>
import draggable from 'vuedraggable'
import { getSelectorAll } from '@/api/system/menu'
import iconBox from '@/components/JNPF-iconBox'
import JSONArea from './JSONArea'
export default {
  props: ['activeData'],
  components: { draggable, iconBox, JSONArea },
  data() {
    return {
      iconsVisible: false,
      areaVisible: false,
      currentIndex: 0,
      current: '',
      menuList: []
    }
  },
  created() {
    this.getMenuList()
  },
  methods: {
    getMenuList() {
      getSelectorAll({ category: 'Web' }).then(res => {
        this.menuList = res.data.list
      })
    },
    getSelectValue(data, i) {
      if (!data[0]) {
        this.activeData.list[i] = { fullName: '', id: '', urlAddress: '', icon: '', iconBackgroundColor: '' }
      } else {
        let iconBackgroundColor = ''
        if (data[1].propertyJson) {
          let propertyJson = JSON.parse(data[1].propertyJson)
          iconBackgroundColor = propertyJson.iconBackgroundColor || ''
        }
        this.activeData.list[i] = {
          fullName: data[1].fullName,
          id: data[1].id,
          urlAddress: data[1].urlAddress,
          icon: data[1].icon,
          iconBackgroundColor: iconBackgroundColor
        }
      }
    },
    addSelectItem() {
      this.activeData.list.push({ fullName: '', id: '', urlAddress: '', icon: '', iconBackgroundColor: '' })
    },
    delSelectItem(index) {
      if (this.activeData.list.length < 3) {
        this.$message({
          message: '选项最少要保留两项',
          type: 'warning'
        });
        return
      }
      this.activeData.list.splice(index, 1)
    },
    openIconsDialog(index) {
      this.iconsVisible = true
      this.currentIndex = index
      this.current = this.activeData.list[this.currentIndex].icon
    },
    setIcon(val) {
      this.activeData.list[this.currentIndex].icon = val
    },
    showData(option) {
      this.areaVisible = true
      this.$nextTick(() => {
        this.$refs.JSONArea.init(option)
      })
    },
    updataOption(data) {
      let option = data ? JSON.parse(data) : {}
      this.activeData.option = option
    }
  }
}
</script>
<style lang="scss" scoped>
.right-box {
  background: #fff;
  border-radius: 4px;
  .cap-wrapper {
    text-align: center;
  }
  >>> .el-scrollbar__view {
    padding: 15px;
  }
  .select-item {
    display: flex;
    border: 1px dashed #fff;
    box-sizing: border-box;
    & .close-btn {
      cursor: pointer;
      color: #f56c6c;
    }
    .el-select {
      flex: 1;
    }
  }
  .select-line-icon {
    line-height: 32px;
    font-size: 22px;
    padding: 0 4px;
    color: #777;
  }
  .dataBoard-item {
    .el-form-item--small.el-form-item {
      margin-bottom: 10px;
    }
    .el-divider--horizontal {
      margin: 14px 0;
    }
  }
}
</style>