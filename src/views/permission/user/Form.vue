<template>
  <transition name="el-zoom-in-center">
    <div class="JNPF-preview-main user-form">
      <div class="JNPF-common-page-header">
        <el-page-header @back="goBack"
          :content="!dataForm.id ?$t(`user.addUser`) : $t(`user.editUser`)" />
        <div class="options">
          <el-button type="primary" :loading="btnLoading" @click="handleConfirm()">
            {{$t('common.confirmButton')}}</el-button>
          <el-button @click="goBack">{{$t('common.cancelButton')}} </el-button>
        </div>
      </div>
      <div class="main" v-loading="formLoading" :element-loading-text="$t('common.loadingText')">
        <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="80px">
          <div class="JNPF-common-title mb-20">
            <h2 class="bold">基础信息</h2>
          </div>
          <el-row :gutter="20" class="custom-row">
            <el-col :sm="12" :xs="24">
              <el-form-item label="账户" prop="account">
                <el-input v-model="dataForm.account" placeholder="账户名称" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="姓名" prop="realName">
                <el-input v-model="dataForm.realName" placeholder="真实姓名" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="性别" prop="gender">
                <el-select v-model="dataForm.gender" placeholder="选择性别">
                  <el-option v-for="item in genderTreeData" :key="item.enCode"
                    :label="item.fullName" :value="item.enCode" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="电子邮箱" prop="email">
                <el-input v-model="dataForm.email" placeholder="电子邮箱" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="部门" prop="organizeId">
                <JNPF-TreeSelect v-model="dataForm.organizeId" :options="departmentTreeData"
                  lastLevel lastLevelKey='type' lastLevelValue='department' placeholder="选择部门"
                  clearable />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="主管" prop="managerId">
                <JNPF-TreeSelect v-model="dataForm.managerId" :options="managerTreeData" lastLevel
                  lastLevelKey='type' lastLevelValue='user' placeholder="选择主管" clearable />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="岗位" prop="positionId">
                <JNPF-TreeSelect v-model="dataForm.positionId" :options="positionTreeData" multiple
                  lastLevel lastLevelKey='type' lastLevelValue='position' placeholder="选择岗位"
                  clearable />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="角色" prop="roleId">
                <el-select v-model="roleId" multiple placeholder="请选择" @change="roleIdChange"
                  filterable>
                  <el-option-group v-for="group in roleTreeDataAll" :key="group.id"
                    :label="group.fullName+'【'+group.count+'】'">
                    <el-option v-for="item in group.children" :key="item.id" :label="item.fullName"
                      :value="item.id">
                    </el-option>
                  </el-option-group>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序" prop="sortCode">
                <el-input-number :min="0" :max="9999" v-model="dataForm.sortCode" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" prop="enabledMark">
                <el-switch v-model="dataForm.enabledMark" :active-value="1" :inactive-value="0" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="description">
                <el-input v-model="dataForm.description" type="textarea" :rows="6" />
              </el-form-item>
            </el-col>
          </el-row>
          <div class="JNPF-common-title mb-20">
            <h2 class="bold">扩展信息</h2>
          </div>
          <el-row :gutter="20" class="custom-row">
            <el-col :span="24">
              <el-form-item label="头像" prop="headIcon">
                <el-upload class="avatar-uploader" :action="define.comUploadUrl+'/userAvatar'"
                  :show-file-list="false" :on-success="handleAvatarSuccess" accept="image/*">
                  <img v-if="dataForm.headIcon"
                    :src="define.comUrl +'/api/file/Image/userAvatar/' + dataForm.headIcon"
                    class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="民族" prop="nation">
                <el-select v-model="dataForm.nation" placeholder="选择民族" filterable>
                  <el-option v-for="item in nationTreeData" :key="item.id" :label="item.fullName"
                    :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="籍贯" prop="nativePlace">
                <el-input v-model="dataForm.nativePlace" placeholder="籍贯" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="入职时间" prop="entryDate">
                <el-date-picker v-model="dataForm.entryDate" type="date" placeholder="选择入职时间"
                  value-format="timestamp">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="证件类型" prop="certificatesType">
                <el-select v-model="dataForm.certificatesType" placeholder="选择证件类型">
                  <el-option v-for="item in certificatesTypeTreeData" :key="item.id"
                    :label="item.fullName" :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="证件号码" prop="certificatesNumber">
                <el-input v-model="dataForm.certificatesNumber" placeholder="证件号码" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="文化程度" prop="education">
                <el-select v-model="dataForm.education" placeholder="选择文化程度">
                  <el-option v-for="item in educationTreeData" :key="item.id" :label="item.fullName"
                    :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="出生年月" prop="birthday">
                <el-date-picker v-model="dataForm.birthday" type="date" placeholder="选择出生年月"
                  value-format="timestamp">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="办公电话" prop="telePhone">
                <el-input v-model="dataForm.telePhone" placeholder="办公电话" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="办公座机" prop="landline">
                <el-input v-model="dataForm.landline" placeholder="办公座机" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="手机号码" prop="mobilePhone">
                <el-input v-model="dataForm.mobilePhone" placeholder="手机号码" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="紧急联系" prop="urgentContacts">
                <el-input v-model="dataForm.urgentContacts" placeholder="紧急联系人" />
              </el-form-item>
            </el-col>
            <el-col :sm="12" :xs="24">
              <el-form-item label="紧急电话" prop="urgentTelePhone">
                <el-input v-model="dataForm.urgentTelePhone" placeholder="紧急联系人电话" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="通讯地址" prop="postalAddress">
                <el-input v-model="dataForm.postalAddress" type="textarea" :rows="6" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </transition>
</template>

<script>
import { getDepartmentSelector } from '@/api/permission/department'
import { getPositionSelector } from '@/api/permission/position'
import { getRoleSelector } from '@/api/permission/role'
import { getUserSelector, createUser, updateUser, getUserInfo } from '@/api/permission/user'

export default {
  data() {
    return {
      visible: false,
      btnLoading: false,
      dataForm: {
        id: '',
        sortCode: 0,
        enabledMark: 1,
        account: '',
        realName: '',
        organizeId: '',
        managerId: '',
        positionId: '',
        roleId: '',
        description: '',
        headIcon: '',
        gender: null,
        nationId: '',
        nativePlace: '',
        entryDate: Number,
        certificatesType: '',
        certificatesNumber: '',
        education: '',
        birthday: Number,
        telePhone: '',
        landline: '',
        mobilePhone: '',
        email: '',
        urgentContacts: '',
        urgentTelePhone: '',
        postalAddress: ''
      },
      roleId: [],
      departmentTreeData: [],
      managerTreeData: [],
      positionTreeData: [],
      roleTreeData: [],
      genderTreeData: [],
      nationTreeData: [],
      educationTreeData: [],
      certificatesTypeTreeData: [],
      roleTypeList: [],
      roleTreeDataAll: [],
      formLoading: false,
      genderProps: {
        value: 'enCode',
        label: 'fullName'
      },
      dataRule: {
        account: [
          { required: true, message: '请输入账户名称', trigger: 'blur' },
          { validator: this.formValidate('userAccount', '账户名称只能是数字英文'), trigger: 'blur' },
          { max: 50, message: '账户名称最多为50个字符！', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { validator: this.formValidate('fullName', '真实姓名不能含有特殊符号'), trigger: 'blur' },
          { max: 50, message: '真实姓名最多为50个字符！', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        organizeId: [
          { required: true, message: '请选择部门', trigger: 'change' }
        ],
        positionId: [
          { required: true, message: '请选择岗位', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    init(id, organizeId) {
      this.visible = true
      this.dataForm.id = id || ''
      this.roleId = []
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()

        // 获取公司+部门
        getDepartmentSelector().then(res => {
          this.departmentTreeData = res.data.list
        })
        // 获取主管
        getUserSelector().then(res => {
          this.managerTreeData = res.data.list
        })

        // 获取岗位
        getPositionSelector().then(res => {
          this.positionTreeData = res.data.list
        })

        // 获取角色分类
        this.$store.dispatch('base/getDictionaryData', { sort: 'RoleType' }).then(data => {
          this.roleTypeList = data
        }).then(() => {
          // 获取角色
          getRoleSelector().then(res => {
            this.roleTreeData = res.data.list
            this.roleTreeDataAll = JSON.parse(JSON.stringify(this.roleTypeList))
            for (let i = 0; i < this.roleTreeDataAll.length; i++) {
              let child = this.roleTreeData.filter(o => this.roleTreeDataAll[i].enCode === o.type)
              let count = child.length
              this.$set(this.roleTreeDataAll[i], 'children', child)
              this.$set(this.roleTreeDataAll[i], 'count', count)
            }
            this.roleTreeDataAll = this.roleTreeDataAll.filter(o => o.children.length)
          })
        })

        // 获取民族
        this.$store.dispatch('base/getDictionaryData', { sort: 'Nation' }).then(res => {
          this.nationTreeData = res
        })

        // 获取学历
        this.$store.dispatch('base/getDictionaryData', { sort: 'Education' }).then(res => {
          this.educationTreeData = res
        })

        // 获取证件类型
        this.$store.dispatch('base/getDictionaryData', { sort: 'certificateType' }).then(res => {
          this.certificatesTypeTreeData = res
        })

        // 获取性别
        this.$store.dispatch('base/getDictionaryData', { sort: 'sex' }).then(res => {
          this.genderTreeData = res
        })

        if (this.dataForm.id) {
          this.formLoading = true
          getUserInfo(this.dataForm.id).then(res => {
            this.dataForm = res.data
            this.roleId = this.dataForm.roleId.split(',')
            this.formLoading = false
          }).catch(() => this.formLoading = false)
        } else {
          this.dataForm.organizeId = organizeId
        }
      })
    },
    goBack() {
      this.$emit('close')
    },
    roleIdChange() {
      this.dataForm.roleId = this.roleId.toString()
    },
    handleAvatarSuccess(res) {
      if (res.code === 200) {
        this.dataForm.headIcon = res.data.name
      } else {
        this.$message.error('头像上传失败');
      }
    },
    handleConfirm() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const formMethod = this.dataForm.id ? updateUser : createUser
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
.user-form {
  .main {
    padding: 10px 30px 0;
  }
  >>> .el-select,
  >>> .el-date-editor {
    width: 100%;
  }
  >>> .avatar-uploader {
    .el-upload {
      border: 1px dashed #dcdfe6;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 130px;
    height: 130px;
    line-height: 130px;
    text-align: center;
  }
  .avatar {
    width: 130px;
    height: 130px;
    display: block;
  }
}
</style>
