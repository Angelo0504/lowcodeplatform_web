<template>
  <div class="password">
    <div class="JNPF-common-title mb-20">
      <h2 class="bold">修改密码</h2>
    </div>
    <el-row>
      <el-col :span="16">
        <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="100px">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="dataForm.oldPassword" placeholder="旧密码" show-password />
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input v-model="dataForm.password" placeholder="新密码" show-password />
          </el-form-item>
          <el-form-item label="重复密码" prop="password2">
            <el-input v-model="dataForm.password2" placeholder="重复密码" show-password />
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-col :span="17">
              <el-input v-model="dataForm.code" placeholder="验证码">
              </el-input>
            </el-col>
            <el-col :span="6" :offset="1" style="height:32px">
              <img id="imgcode" alt="点击切换验证码" title="点击切换验证码" :src="define.comUrl+imgUrl"
                @click="changeImg">
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dataFormSubmit()">保 存</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import md5 from 'js-md5';
import { UpdatePassword } from '@/api/permission/userSetting'
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('新密码不能为空'));
      } else {
        if (this.dataForm.password2 !== '') {
          this.$refs.dataForm.validateField('password2');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.dataForm.password) {
        callback(new Error('两次密码输入不一致'));
      } else {
        callback();
      }
    };
    return {
      dataForm: {
        oldPassword: '',
        password: '',
        password2: '',
        code: '',
      },
      imgUrl: "",
      timestamp: '',
      dataRule: {
        oldPassword: [
          { required: true, message: '旧密码不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '重复密码不能为空', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    this.changeImg()
  },
  methods: {
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let query = {
            oldPassword: md5(this.dataForm.oldPassword),
            password: md5(this.dataForm.password),
            code: this.dataForm.code,
            timestamp: this.timestamp
          }
          UpdatePassword(query).then(res => {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.$store.dispatch('user/resetToken').then(() => {
                  this.$router.push(`/login`)
                })
              }
            })
          }).catch(() => {
            this.changeImg()
          })
        }
      })
    },
    changeImg() {
      let timestamp = Math.random()
      this.timestamp = timestamp
      this.imgUrl = `/api/file/ImageCode/${timestamp}`
    }
  }

}
</script>
<style lang="scss" scoped>
.password {
  >>> .el-input-group__append {
    padding: 0;
    height: 30px;
  }
  #imgcode {
    width: 100px;
    height: 32px;
    overflow: hidden;
    object-fit: cover;
    cursor: pointer;
    margin: 0;
    padding: 0;
  }
}
</style>
