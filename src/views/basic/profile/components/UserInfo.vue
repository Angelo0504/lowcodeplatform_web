<template>
  <div class="userInfo">
    <el-tabs class="JNPF-el_tabs">
      <el-tab-pane label="基本信息">
        <el-col :span="18">
          <el-form :model="form" label-width="100px">
            <el-form-item label="账户">
              <el-input v-model="form.account" readonly />
            </el-form-item>
            <el-form-item label="公司">
              <el-input v-model="form.company" readonly />
            </el-form-item>
            <el-form-item label="部门">
              <el-input v-model="form.organize" readonly />
            </el-form-item>
            <el-form-item label="岗位">
              <el-input v-model="form.position" readonly />
            </el-form-item>
            <el-form-item label="主管">
              <el-input v-model="form.manager" readonly />
            </el-form-item>
            <el-form-item label="角色">
              <el-input v-model="form.roleId" readonly />
            </el-form-item>
            <el-form-item label="注册时间">
              <el-input v-model="creatorTime" readonly />
            </el-form-item>
            <el-form-item label="上次登录时间">
              <el-input v-model="prevLogTime" readonly />
            </el-form-item>
            <el-form-item label="入职日期">
              <el-input v-model="entryDate" readonly />
            </el-form-item>
          </el-form>
        </el-col>
      </el-tab-pane>
      <el-tab-pane label="扩展信息">
        <el-form ref="dataForm" :model="form2" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="户名">
                <el-input v-model="form2.realName" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别">
                <el-select v-model="form2.gender" placeholder="选择性别">
                  <el-option v-for="item in genderOptions" :key="item.enCode" :label="item.fullName"
                    :value="item.enCode" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="民族">
                <el-select v-model="form2.nation" placeholder="选择民族" filterable>
                  <el-option v-for="item in nationOptions" :key="item.id" :label="item.fullName"
                    :value="item.id" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="籍贯">
                <el-input v-model="form2.nativePlace" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件类型">
                <el-select v-model="form2.certificatesType" placeholder="请选择类型">
                  <el-option v-for="item in certificatesTypeOptions" :key="item.id"
                    :label="item.fullName" :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="证件号码">
                <el-input v-model="form2.certificatesNumber" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文化程度">
                <el-select v-model="form2.education" placeholder="请选择学历">
                  <el-option v-for="item in educationOptions" :key="item.id" :label="item.fullName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="出生年月">
                <el-date-picker v-model="form2.birthday" type="date" placeholder="选择日期"
                  value-format="timestamp" format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="办公电话">
                <el-input v-model="form2.telePhone" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="办公座机">
                <el-input v-model="form2.landline" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码">
                <el-input v-model="form2.mobilePhone" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电子邮箱">
                <el-input v-model="form2.email" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="紧急联系">
                <el-input v-model="form2.urgentContacts" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="紧急电话">
                <el-input v-model="form2.urgentTelePhone" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="通讯地址">
                <el-input v-model="form2.postalAddress" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="自我介绍">
                <el-input v-model="form2.signature" type="textarea" :rows="3" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" @click="dataFormSubmit()">保 存</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import { UpdateUser } from '@/api/permission/userSetting'
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      form: {},
      form2: {
        realName: '',
        signature: '',
        gender: 1,
        nation: '',
        nativePlace: '',
        certificatesType: '',
        certificatesNumber: '',
        education: '',
        birthday: null,
        telePhone: '',
        landline: '',
        mobilePhone: '',
        email: '',
        urgentContacts: '',
        urgentTelePhone: '',
        postalAddress: '',
      },
      certificatesTypeOptions: [],
      educationOptions: [],
      genderOptions: [],
      nationOptions: []
    }
  },
  computed: {
    creatorTime() {
      return this.jnpf.toDate(this.form.creatorTime)
    },
    entryDate() {
      return this.jnpf.toDate(this.form.entryDate)
    },
    prevLogTime() {
      return this.jnpf.toDate(this.form.prevLogTime)
    },
  },
  created() {
    this.getOptions()
    this.getInfo()
  },
  methods: {
    getOptions() {
      this.$store.dispatch('base/getDictionaryData', { sort: 'Education' }).then((res) => {
        this.educationOptions = JSON.parse(JSON.stringify(res))
      })
      this.$store.dispatch('base/getDictionaryData', { sort: 'certificateType' }).then((res) => {
        this.certificatesTypeOptions = JSON.parse(JSON.stringify(res))
      })
      this.$store.dispatch('base/getDictionaryData', { sort: 'sex' }).then(res => {
        this.genderOptions = JSON.parse(JSON.stringify(res))
      })
      this.$store.dispatch('base/getDictionaryData', { sort: 'Nation' }).then(res => {
        this.nationOptions = JSON.parse(JSON.stringify(res))
      })
    },
    getInfo() {
      this.form = this.user
      for (let key of Object.keys(this.form2)) {
        this.form2[key] = this.form[key]
      }
    },
    dataFormSubmit() {
      UpdateUser(this.form2).then(res => {
        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1500
        })
        this.$store.commit('user/SET_USERINFO_USERNAME', this.form2.realName)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.userInfo {
  height: 100%;
  overflow: hidden;
  >>> .el-tabs__nav-scroll {
    padding-top: 0 !important;
  }
}
</style>