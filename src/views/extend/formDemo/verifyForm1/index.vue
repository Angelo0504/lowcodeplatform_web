<template>
  <div class="CommonForm-container app-container JNPF-flex-main nohead">
    <!-- <div class="JNPF-common-head">
      <div></div>
      <div class="JNPF-common-head-right">
        <el-button type="text" @click="init">重置<i class="el-icon-refresh el-icon--right" />
        </el-button>
        <el-button type="primary" @click="dataFormSubmit()">提交验证</el-button>
      </div>
    </div> -->
    <div class="dataForm">
      <el-alert title="表单验证" type="warning" :closable="false" />
      <el-form ref="dataForm" :model="dataForm" :rules="dataRule" label-width="110px" class="mt-10">
        <el-form-item label="用户账号" prop="account">
          <el-input v-model="dataForm.account" placeholder="用户账号" />
          <span class="tip">必填,长度在6-20之间</span>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="dataForm.password" placeholder="用户密码" type="password" maxlength="20" />
          <span class="tip">必填，包含字母、数字和_-,长度在6-20之间</span>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="dataForm.password2" placeholder="确认密码" type="password"
            maxlength="20" />
          <span class="tip">必填，包含字母、数字和_-,长度在6-20之间</span>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="dataForm.email" placeholder="电子邮箱" />
          <span class="tip">请输入以@正确格式的电子邮件</span>
        </el-form-item>
        <el-form-item label="商品数量" prop="number">
          <el-input v-model="dataForm.number" placeholder="商品数量" maxlength="6" />
          <span class="tip">只能输入正整数</span>
        </el-form-item>
        <el-form-item label="信用卡号" prop="creditcard">
          <el-input v-model="dataForm.creditcard" placeholder="信用卡号" maxlength="18" />
          <span class="tip">请输入有效的信用卡号</span>
        </el-form-item>
        <el-form-item label="请求地址" prop="url">
          <el-input v-model="dataForm.url" placeholder="请求地址" />
          <span class="tip">以http:或https:开头的有效地址</span>
        </el-form-item>
        <el-form-item label="支付金额" prop="price">
          <el-input v-model="dataForm.price" placeholder="支付金额" />
          <span class="tip">只能输入大于或等于0的金额（包含小数）</span>
        </el-form-item>
        <el-form-item label="联系方式" prop="tel">
          <el-input v-model="dataForm.tel" placeholder="联系方式" />
          <span class="tip">包含手机号码和电话号码</span>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="dataForm.mobile" placeholder="手机号码" />
          <span class="tip">只能输入以13,15,18开头的手机号码</span>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="dataForm.phone" placeholder="电话号码" />
          <span class="tip">请输入有效的电话号码</span>
        </el-form-item>
        <el-form-item label="有效年龄" prop="age">
          <el-input v-model="dataForm.age" placeholder="有效年龄" />
          <span class="tip">请输入0~100有效年龄</span>
        </el-form-item>
        <el-form-item label="邮政编码" prop="zipCode">
          <el-input v-model="dataForm.zipCode" placeholder="邮政编码" />
          <span class="tip">请输入有效的邮政编码</span>
        </el-form-item>
        <el-form-item label="身份证号" prop="cardId">
          <el-input v-model="dataForm.cardId" placeholder="身份证号" />
          <span class="tip">请输入有效的身份证号</span>
        </el-form-item>
        <el-form-item label="RGB" prop="RGB">
          <el-input v-model="dataForm.RGB" placeholder="RGB" />
          <span class="tip">请输入有效的十六进制颜色RGB(如：#ffffff)</span>
        </el-form-item>
        <el-form-item label="微信号" prop="wechat">
          <el-input v-model="dataForm.wechat" placeholder="微信号" />
          <span class="tip">请输入有效的微信号</span>
        </el-form-item>
        <el-form-item label="车牌号" prop="licensePlate">
          <el-input v-model="dataForm.licensePlate" placeholder="车牌号" />
          <span class="tip">请输入有效的车牌号(如：豫H81888)</span>
        </el-form-item>
        <el-form-item label="QQ" prop="qq">
          <el-input v-model="dataForm.qq" placeholder="QQ" />
          <span class="tip">请输入有效的QQ号码</span>
        </el-form-item>
        <el-form-item label="IPv4" prop="ip">
          <el-input v-model="dataForm.ip" placeholder="IPv4" />
          <span class="tip">请输入有效的IPv4（255.255.255.255）</span>
        </el-form-item>
        <el-form-item label="英文" prop="english">
          <el-input v-model="dataForm.english" placeholder="英文" />
          <span class="tip">请输入有效的英文字母如：A~Z,a~z</span>
        </el-form-item>
        <el-form-item label="汉字" prop="chinese">
          <el-input v-model="dataForm.chinese" placeholder="汉字" />
          <span class="tip">请输入有效的汉字</span>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-input v-model="dataForm.date" placeholder="日期" />
          <span class="tip">请输入有效的日期（1900-01-01）</span>
        </el-form-item>
        <el-form-item label="浮点数小于0" prop="floatLtZero">
          <el-input v-model="dataForm.floatLtZero" placeholder="浮点数小于0" />
          <span class="tip">浮点数只能小于0（不包含0，包含小数和负整数）</span>
        </el-form-item>
        <el-form-item label="浮点数大于0" prop="intGtZero">
          <el-input v-model="dataForm.intGtZero" placeholder="浮点数大于0" />
          <span class="tip">浮点数只能大于0（不包含0，包含小数和负整数）</span>
        </el-form-item>
        <el-form-item label="浮点数" prop="intNEqZero">
          <el-input v-model="dataForm.intNEqZero" placeholder="浮点数不等于0" />
          <span class="tip">浮点数（包含0,小数和负整数）</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'extend-formDemo-verifyForm1',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.dataForm.password) {
        callback(new Error('两次密码输入不一致'));
      } else {
        callback();
      }
    };
    return {
      dataForm: {
        account: '',
        password: '',
        password2: '',
        email: '',
        number: '',
        creditcard: '',
        url: '',
        price: '',
        tel: '',
        mobile: '',
        phone: '',
        age: '',
        zipCode: '',
        cardId: '',
        RGB: '',
        wechat: '',
        licensePlate: '',
        qq: '',
        ip: '',
        english: '',
        chinese: '',
        date: '',
        floatLtZero: '',
        intGtZero: '',
        intNEqZero: '',
      },
      dataRule: {
        account: [
          { required: true, message: '用户账号不能为空', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在6-20之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '用户密码不能为空', trigger: 'blur' },
          { pattern: /^[0-9A-Za-z_-]{6,20}$/, message: '密码需包含字母、数字和_-,长度在6-20之间', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { pattern: /^[0-9A-Za-z_-]{6,20}$/, message: '密码需包含字母、数字和_-,长度在6-20之间', trigger: 'blur' },
          { validator: validatePass }
        ],
        email: [
          { pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: '请输入以@正确格式的电子邮件', trigger: 'blur' }
        ],
        number: [
          { pattern: /^\d+$/, message: '只能输入正整数', trigger: 'blur' }
        ],
        creditcard: [
          { pattern: /^(62[0-9]{14,16})$/, message: '请输入有效的信用卡号', trigger: 'blur' }
        ],
        url: [
          { pattern: /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/, message: '以http:或https:开头的有效地址', trigger: 'blur' }
        ],
        price: [
          { pattern: /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$/, message: '只能输入大于或等于0的金额（包含小数）', trigger: 'blur' }
        ],
        tel: [
          { pattern: /^1[3456789]\d{9}$|^0\d{2,3}-?\d{7,8}$/, message: '请输入正确的联系方式', trigger: 'blur' }
        ],
        mobile: [
          { pattern: /^1[358]\d{9}$/, message: '只能输入以13,15,18开头的手机号码', trigger: 'blur' }
        ],
        phone: [
          { pattern: /^0\d{2,3}-?\d{7,8}$/, message: '请输入有效的电话号码', trigger: 'blur' }
        ],
        age: [
          { pattern: /^([1-9]|[1-9]\d|100)$/, message: '请输入1~100有效年龄', trigger: 'blur' }
        ],
        zipCode: [
          { pattern: /^[1-9]\d{5}$/, message: '请输入有效的邮政编码', trigger: 'blur' }
        ],
        cardId: [
          { pattern: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/, message: '请输入有效的身份证号', trigger: 'blur' }
        ],
        RGB: [
          { pattern: /^#([a-fA-F\d]{6}|[a-fA-F\d]{3})$/, message: '请输入有效的十六进制颜色RGB(如：#ffffff)', trigger: 'blur' }
        ],
        wechat: [
          { pattern: /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/, message: '请输入有效的微信号', trigger: 'blur' }
        ],
        licensePlate: [
          { pattern: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/, message: '请输入有效的车牌号(如：豫H81888)', trigger: 'blur' }
        ],
        qq: [
          { pattern: /^[1-9]\d{4,12}$/, message: '请输入有效的QQ号码', trigger: 'blur' }
        ],
        ip: [
          { pattern: /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/, message: '请输入有效的IPv4（255.255.255.255）', trigger: 'blur' }
        ],
        english: [
          { pattern: /[A-Za-z]/, message: '请输入有效的英文字母如：A~Z,a~z', trigger: 'blur' }
        ],
        chinese: [
          { pattern: /[\u4E00-\u9FA5]/, message: '请输入有效的汉字', trigger: 'blur' }
        ],
        date: [
          { pattern: /^\d{4}-\d{1,2}-\d{1,2}$/, message: '请输入有效的日期（1900-01-01）', trigger: 'blur' }
        ],
        floatLtZero: [
          { pattern: /^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$/, message: '浮点数只能小于0（不包含0，包含小数和负整数）', trigger: 'blur' }
        ],
        intGtZero: [
          { pattern: /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/, message: '浮点数只能大于0（不包含0，包含小数和负整数', trigger: 'blur' }
        ],
        intNEqZero: [
          { pattern: /^(-?\d+)(\.\d+)?$/, message: '浮点数（包含0,小数和负整数）', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    init() {
      this.$refs['dataForm'].resetFields()
    },
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$message({
            message: '验证成功',
            type: 'success',
            duration: 1500,
          })
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.CommonForm-container {
  .JNPF-common-head {
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