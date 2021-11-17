<template>
  <el-dialog :title="!dataForm.id ? '新建菜单' : '编辑菜单'" :close-on-click-modal="false"
    :close-on-press-escape="false" :visible.sync="visible" lock-scroll
    class="JNPF-dialog JNPF-dialog_center" width="600px">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px"
      v-loading="formLoading" :element-loading-text="$t('common.loadingText')" class="menuForm">
      <el-form-item label="分类" prop="category">
        <el-input v-model="dataForm.category" disabled />
      </el-form-item>
      <el-form-item label="上级" prop="parentId">
        <JNPF-TreeSelect v-model="dataForm.parentId" :options="treeData" placeholder="选择上级菜单" />
      </el-form-item>
      <el-form-item label="名称" prop="fullName">
        <el-input v-model="dataForm.fullName" placeholder="输入名称" />
      </el-form-item>
      <el-form-item label="编码" prop="enCode">
        <el-input v-model="dataForm.enCode" placeholder="输入编码" />
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-row type="flex">
          <div style="flex:1;margin-right:10px">
            <el-input v-model="dataForm.icon" placeholder="请选择图标" readonly
              :suffix-icon="dataForm.icon">
              <el-button slot="append" @click="openIconBox">选择</el-button>
            </el-input>
          </div>
          <el-color-picker v-model="dataForm.propertyJson.iconBackgroundColor"
            :predefine="['#188ae2', '#35b8e0', '#26bf8c','#f9c851','#ff5b5b', '#5b69bc', '#ff8acc', '#3b3e47','#282828' ]" />
        </el-row>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="dataForm.type" placeholder="请选择类型" @change="changeMenuType">
          <el-option v-for="item in typeData" :key="item.enCode" :label="item.fullName"
            :value="item.enCode">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="dataForm.type == 2 || dataForm.type == 7" label="地址" prop="urlAddress">
        <el-input v-model="dataForm.urlAddress" placeholder="填写地址">
          <el-select slot="append" v-model="dataForm.linkTarget" style="width: 90px;"
            v-if="dataForm.category ==='Web' && dataForm.type == 7">
            <el-option label="_self" value="_self" />
            <el-option label="_blank" value="_blank" />
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item v-if="[3,4,5,6].indexOf(dataForm.type)>-1" label="关联"
        prop="propertyJson.moduleId">
        <JNPF-TreeSelect v-model="dataForm.propertyJson.moduleId" :options="tempData"
          placeholder="请选择" lastLevel @getValue="handleSelectModule" />
      </el-form-item>
      <el-form-item label="排序" prop="sortCode">
        <el-input-number :min="0" :max="9999" v-model="dataForm.sortCode" />
      </el-form-item>
      <el-form-item label="状态" prop="enabledMark">
        <el-switch v-model="dataForm.enabledMark" :active-value="1" :inactive-value="0" />
      </el-form-item>
      <el-form-item label="说明" prop="bodyText">
        <el-input v-model="dataForm.description" type="textarea" :rows="4" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{$t('common.cancelButton')}}</el-button>
      <el-button type="primary" :loading="btnLoading" @click="dataFormSubmit()">
        {{$t('common.confirmButton')}}</el-button>
    </span>
    <icon-box :visible.sync="iconBoxVisible" ref="iconBox" :current="dataForm.icon"
      @choiceIcon="choiceIcon" />
  </el-dialog>
</template>

<script>
import { getMenuSelector, createMenu, updateMenu, getMenuInfo } from '@/api/system/menu'
import { getFeatureSelector } from '@/api/onlineDev/visualDev'
import { getDictionaryType } from '@/api/systemData/dictionary'
import { getDataReportSelector } from '@/api/onlineDev/dataReport'
import { getDataVSelector } from '@/api/onlineDev/dataV'
import iconBox from '@/components/JNPF-iconBox'
const typeData = [{
  enCode: 1,
  fullName: "目录"
}, {
  enCode: 2,
  fullName: "页面"
}, {
  enCode: 3,
  fullName: "功能"
}, {
  enCode: 4,
  fullName: "字典"
}, {
  enCode: 5,
  fullName: "报表"
}, {
  enCode: 6,
  fullName: "大屏"
}, {
  enCode: 7,
  fullName: "外链"
}]

export default {
  components: { iconBox },
  data() {
    return {
      visible: false,
      formLoading: false,
      btnLoading: false,
      treeData: [],
      typeData: [],
      featureWebData: [],
      featureAppData: [],
      dictionaryData: [],
      reportData: [],
      screenData: [],
      tempData: [],
      labelName: '',
      related: false,
      oldUrlAddress: '',
      dataForm: {
        id: '',
        parentId: '',
        fullName: '',
        enCode: '',
        sortCode: 0,
        icon: '',
        type: null,
        urlAddress: '',
        category: 'Web',
        linkTarget: '_self',
        isButtonAuthorize: 0,
        isColumnAuthorize: 0,
        isDataAuthorize: 0,
        enabledMark: 1,
        description: '',
        propertyJson: {
          moduleId: '',
          iconBackgroundColor: '',
          isTree: 0
        }
      },
      iconBoxVisible: false,
      dataRule: {
        parentId: [
          { required: true, message: '上级菜单不能为空', trigger: 'input' }
        ],
        fullName: [
          { required: true, message: '菜单名称不能为空', trigger: 'blur' },
          { max: 50, message: '菜单名称最多为50个字符！', trigger: 'blur' }
        ],
        enCode: [
          { required: true, message: '菜单编码不能为空', trigger: 'blur' },
          { max: 50, message: '菜单编码最多为50个字符！', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '菜单图标不能为空', trigger: 'click' }
        ],
        type: [
          { required: true, message: '请选择菜单类型', trigger: 'change' }
        ],
        category: [
          { required: true, message: '请选择菜单分类', trigger: 'input' }
        ],
        urlAddress: [
          { required: true, message: '地址不能为空', trigger: 'blur' }
        ],
        'propertyJson.moduleId': [
          { required: true, message: '关联不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    init(id, category) {
      Object.assign(this.$data, this.$options.data())
      this.dataForm.id = id || ''
      this.related = false
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.dataForm.category = category
        // 获取上级菜单
        getMenuSelector({ category }).then(res => {
          let topItem = {
            fullName: "顶级节点",
            hasChildren: true,
            id: "-1",
            children: res.data.list
          }
          this.treeData = [topItem]
        })

        // 获取菜单类型
        this.fetchMenuTypeList()

        // 获取表单数据
        if (this.dataForm.id) {
          this.formLoading = true
          getMenuInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
            const propertyJson = res.data.propertyJson ? JSON.parse(res.data.propertyJson) : null
            this.dataForm.propertyJson = propertyJson || { moduleId: '', iconBackgroundColor: '' }
            const menuType = this.dataForm.type
            this.oldUrlAddress = res.data.urlAddress
            this.switchType(menuType)
            this.$nextTick(() => { this.formLoading = false })
          }).catch(() => { })
        }

      })
    },
    // 获取类型
    fetchMenuTypeList() {
      let newType = typeData
      if (this.dataForm.category === 'App') {
        newType = typeData.filter(o => [1, 2, 3, 7].includes(o.enCode))
      }
      this.typeData = newType
    },
    // 功能列表
    fetchFeatureList() {
      // WEB设计分类
      if (this.dataForm.category === 'Web') {
        if (this.featureWebData.length === 0) {
          getFeatureSelector({ type: 1 }).then(res => {
            this.featureWebData = res.data.list
            this.tempData = this.featureWebData
          })
        }
        this.tempData = this.featureWebData
      }
      // APP设计分类
      if (this.dataForm.category === 'App') {
        if (this.featureAppData.length === 0) {
          getFeatureSelector({ type: 2 }).then(res => {
            this.featureAppData = res.data.list
            this.tempData = this.featureAppData
          })
        }
        this.tempData = this.featureAppData
      }
    },
    // 字典类型
    fetchDictionaryType() {
      if (this.dictionaryData.length === 0) {
        getDictionaryType().then(res => {
          this.dictionaryData = res.data.list
          this.tempData = this.dictionaryData
        })
      } else {
        this.tempData = this.dictionaryData
      }
    },
    // 报表列表
    fetchDataReportList() {
      if (this.reportData.length === 0) {
        this.$store.dispatch('base/getDictionaryData', { sort: 'ReportSort' }).then(t => {
          const ReportSortTypeList = JSON.parse(JSON.stringify(t))

          getDataReportSelector().then(res => {
            let reportData = res.data.list
            this.reportData = ReportSortTypeList
            this.$nextTick(() => {
              for (let i = 0; i < this.reportData.length; i++) {
                let child = reportData.filter(o => this.reportData[i].id === o.categoryId)
                this.$set(this.reportData[i], 'children', child)
              }
              this.reportData = this.reportData.filter(o => o.children.length)
              this.tempData = this.reportData
            })
          })
        })
      } else {
        this.tempData = this.reportData
      }
    },
    // 大屏列表
    fetchDataVList() {
      if (this.screenData.length === 0) {
        getDataVSelector().then(res => {
          this.screenData = res.data.list
          this.tempData = this.screenData
        })
      }
      this.tempData = this.screenData
    },
    switchType(val) {
      switch (val) {
        case 3:
          this.fetchFeatureList()
          break
        case 4:
          this.fetchDictionaryType()
          break
        case 5:
          this.fetchDataReportList()
          break
        case 6:
          this.fetchDataVList()
          break
      }
    },
    // 切换类型
    changeMenuType(val) {
      // 重置关联下拉框的值及链接处理
      this.dataForm.propertyJson.moduleId = ''
      const menuId = this.dataForm.id
      if (menuId) this.dataForm.urlAddress = ''
      this.switchType(this.dataForm.type)
    },
    // 树转数组
    treeToArray(list, newArr = []) {
      list.forEach((item) => {
        const { children } = item
        if (children) {
          // delete item.children
          if (children.length) {
            newArr.push(item)
            return this.treeToArray(children, newArr)
          }
        }
        newArr.push(item)
      });
      return newArr
    },
    handleSelectModule(val) {
      if (this.dataForm.type == 4) {
        const item = this.treeToArray(this.dictionaryData).filter(o => o.id === val)
        this.dataForm.propertyJson.isTree = item[0].isTree
      }
    },
    dataFormSubmit() {

      this.$refs['dataForm'].validate((valid) => {
        const menuEnCode = (this.dataForm.enCode).replace('.', '')
        const moduleId = this.dataForm.propertyJson.moduleId

        if (this.dataForm.category === 'Web') {
          switch (this.dataForm.type) {
            case 2:
              this.dataForm.isButtonAuthorize = 1
              this.dataForm.isColumnAuthorize = 1
              this.dataForm.isDataAuthorize = 1
              this.dataForm.linkTarget = '_self'
              break
            case 3: // 功能
              this.dataForm.isButtonAuthorize = 1
              this.dataForm.isColumnAuthorize = 1
              this.dataForm.isDataAuthorize = 1
              this.dataForm.urlAddress = `model/${menuEnCode}`
              this.dataForm.linkTarget = '_self'
              break
            case 4: // 字典
              this.dataForm.isButtonAuthorize = 1
              this.dataForm.isColumnAuthorize = 1
              this.dataForm.isDataAuthorize = 1
              this.dataForm.urlAddress = `dictionary/${menuEnCode}`
              this.dataForm.linkTarget = '_self'
              break
            case 5: // 报表
              this.dataForm.urlAddress = `dataReport/${menuEnCode}`
              this.dataForm.linkTarget = '_self'
              break
            case 6: // 大屏
              this.dataForm.urlAddress = `dataScreen/${menuEnCode}`
              this.dataForm.linkTarget = '_blank'
              break
          }
        } else {
          if (this.dataForm.type == 3) {
            this.dataForm.urlAddress = `/pages/apply/apply/features/index?id=${moduleId}`
          }
        }
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? updateMenu : createMenu
          formMethod(this.dataForm).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.btnLoading = false
                this.$emit('refreshDataList')
              }
            })
          }).catch(() => {
            this.btnLoading = false
          })
        }
      })
    },
    openIconBox() {
      this.iconBoxVisible = true
    },
    choiceIcon(value) {
      this.dataForm.icon = value
    }
  }
}
</script>
<style lang="scss" scoped>
.menuForm {
  >>> .el-input-group__prepend {
    background-color: #fff;
    padding: 0 10px;
    i {
      display: inline-block;
      width: 20px;
      font-size: 18px;
    }
  }
}
</style>
