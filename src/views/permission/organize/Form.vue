<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main org-form">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack"
          :content="!dataForm.id ? $t(`Organize.addCompany`) : $t(`Organize.editCompany`)" />
        <div class="options">
          <el-button type="primary" :loading="btnLoading" @click="handleConfirm()">
            {{$t('common.confirmButton')}}</el-button>
          <el-button @click="goBack">{{$t('common.cancelButton')}}</el-button>
        </div>
      </div>
      <div class="main" v-loading="formLoading" :element-loading-text="$t('common.loadingText')">
        <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px">
          <div class="JNPF-common-title mb-20">
            <h2 class="bold">基础信息</h2>
          </div>
          <el-row :gutter="20" class="custom-row">
            <el-col :sm="12" :xs="24">
              <el-form-item label="上级公司" prop="parentId">
                <JNPF-TreeSelect v-model="dataForm.parentId" :options="treeData"
                  placeholder="选择上级公司" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="公司名称" prop="fullName">
                <el-input v-model="dataForm.fullName" placeholder="输入名称" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="公司编码" prop="enCode">
                <el-input v-model="dataForm.enCode" placeholder="输入公司编码" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="公司简称" prop="propertyJson.shortName">
                <el-input v-model="dataForm.propertyJson.shortName" placeholder="输入公司简称" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="公司性质" prop="propertyJson.enterpriseNature">
                <JNPF-TreeSelect v-model="dataForm.propertyJson.enterpriseNature"
                  :options="natureData" placeholder="请选择公司性质" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="所属行业" prop="propertyJson.industry">
                <JNPF-TreeSelect v-model="dataForm.propertyJson.industry" :options="industryData"
                  placeholder="请选择所属行业" style="width: 100%" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="成立时间" prop="propertyJson.foundedTime">
                <el-date-picker v-model="dataForm.propertyJson.foundedTime" type="date"
                  value-format="timestamp" placeholder="选择日期" :picker-options="pickerOptions"
                  style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="公司电话" prop="propertyJson.telePhone">
                <el-input v-model="dataForm.propertyJson.telePhone" placeholder="输入公司电话" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="公司传真" prop="propertyJson.fax">
                <el-input v-model="dataForm.propertyJson.fax" placeholder="输入公司传真" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="公司主页" prop="propertyJson.webSite">
                <el-input v-model="dataForm.propertyJson.webSite" placeholder="输入公司主页" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="公司地址" prop="propertyJson.address">
                <el-input v-model="dataForm.propertyJson.address" placeholder="输入公司地址" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="排序" prop="sortCode">
                <el-input-number :min="0" :max="9999" v-model="dataForm.sortCode" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="公司备注" prop="description">
                <el-input v-model="dataForm.description" type="textarea" :rows="6" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="JNPF-common-title mb-20">
            <h2 class="bold">经营信息</h2>
          </div>
          <el-row :gutter="20" class="custom-row">
            <el-col :sm="12" :xs="24">
              <el-form-item label="公司法人" prop="propertyJson.managerName">
                <el-input v-model="dataForm.propertyJson.managerName" placeholder="输入公司法人" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="联系电话" prop="propertyJson.managerTelePhone">
                <el-input v-model="dataForm.propertyJson.managerTelePhone" placeholder="输入联系电话" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="联系手机" prop="propertyJson.managerMobilePhone">
                <el-input v-model="dataForm.propertyJson.managerMobilePhone" placeholder="输入联系手机" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="联系邮箱" prop="propertyJson.manageEmail">
                <el-input v-model="dataForm.propertyJson.manageEmail" placeholder="输入联系邮箱" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="开户银行" prop="propertyJson.bankName">
                <el-input v-model="dataForm.propertyJson.bankName" placeholder="输入开户银行" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="银行账户" prop="propertyJson.bankAccount">
                <el-input v-model="dataForm.propertyJson.bankAccount" placeholder="输入银行账户" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="经营范围" prop="propertyJson.businessscope">
                <el-input v-model="dataForm.propertyJson.businessscope" type="textarea" :rows="6" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  getOrganizeSelector,
  createOrganize,
  updateOrganize,
  getOrganizeInfo
} from '@/api/permission/organize'

export default {
  data() {
    return {
      visible: false,
      btnLoading: false,
      formLoading: false,
      dataForm: {
        id: '',
        parentId: '',
        fullName: '',
        enCode: '',
        enabledMark: 1,
        sortCode: 0,
        description: '',
        propertyJson: {
          shortName: '',
          enterpriseNature: '',
          industry: '',
          foundedTime: '',
          telePhone: '',
          fax: '',
          webSite: '',
          address: '',
          managerName: '',
          managerTelePhone: '',
          managerMobilePhone: '',
          manageEmail: '',
          bankName: '',
          bankAccount: '',
          businessscope: ''
        }
      },
      treeData: [],
      natureData: [],
      industryData: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      dataRule: {
        parentId: [
          { required: true, message: '上级公司不能为空', trigger: 'input' }
        ],
        fullName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { validator: this.formValidate('fullName', '公司名称不能含有特殊符号'), trigger: 'blur' },
          { max: 50, message: '公司名称最多为50个字符！', trigger: 'blur' }
        ],
        enCode: [
          { required: true, message: '请输入公司编码', trigger: 'blur' },
          { validator: this.formValidate('enCode', '公司编码只能输入英文、数字和小数点且小数点不能放在首尾'), trigger: 'blur' },
          { max: 50, message: '公司编码最多为50个字符！', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    init(id) {
      this.visible = true
      this.dataForm.id = id || ''
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        // 获取公司下拉列表
        getOrganizeSelector().then(res => {
          let topItem = {
            fullName: "顶级节点",
            hasChildren: true,
            id: "-1",
            icon: "icon-ym icon-ym-tree-organization3",
            children: res.data.list
          }
          this.treeData = [topItem]
        })

        // 获取公司性质
        this.$store.dispatch('base/getDictionaryData', { sort: 'EnterpriseNature' }).then(res => {
          this.natureData = res
        })

        // 获取所属行业
        this.$store.dispatch('base/getDictionaryData', { sort: 'IndustryType' }).then(res => {
          this.industryData = res
        })

        if (this.dataForm.id) {
          this.formLoading = true
          getOrganizeInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
            const propertyJson = JSON.parse(res.data.propertyJson)
            this.dataForm.propertyJson = propertyJson
            this.dataForm.propertyJson.enterpriseNature = propertyJson.enterpriseNature
            this.dataForm.propertyJson.industry = propertyJson.industry
            this.formLoading = false
          }).catch(() => { this.formLoading = false })
        }
      })
    },
    goBack() {
      this.$emit('close')
    },
    handleConfirm() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? updateOrganize : createOrganize
          formMethod(this.dataForm).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                this.btnLoading = false
                this.$emit('close', true)
              }
            })
          }).catch(() => {
            this.btnLoading = false
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  padding: 10px 30px 0;
}
</style>