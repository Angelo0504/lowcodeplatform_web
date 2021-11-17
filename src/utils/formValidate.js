/*
 * 正则库
 */
const regularList = {
  'iphone': {
    rule: /^1[3456789]\d{9}$/,
    msg: '请正确输入您的手机号'
  },
  'password': {
    rule: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
    msg: '6-16位字符的密码（数字和字母组成）'
  },
  'idCard': {
    rule: /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/,
    msg: '请正确输入您的身份证号码'
  },
  'email': {
    rule: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
    msg: '请正确输入您的邮箱地址'
  },
  'plateNumber': {
    rule: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,
    msg: '请正确输入您的车牌号'
  },
  'chinese': {
    rule: /^[\u4e00-\u9fa5]+$/,
    msg: '请正确输入中文'
  },
  'enCode': { // 编码校验
    rule: /^[a-zA-Z0-9]([a-zA-Z0-9]+|\.)*[a-zA-Z0-9]$/,
    msg: '编码只能输入英文、数字和小数点且小数点不能放在首尾'
  },
  'userAccount': { // 岗位编码
    rule: /^[A-Za-z0-9]+$/,
    msg: '只能输入数字英文'
  },
  'fullName': { // 名称
    rule: /^([\u4e00-\u9fa5]|[a-zA-Z0-9])+$/,
    msg: '名称不能含有特殊符号'
  },
  'userCode': { // 数字编码
    rule: /^([0-9]+)$/,
    msg: '编码只能输入数字'
  },
  'allDate': { //判断请假时间和小时是否为0.5的倍数
    rule: /^[1-9]\d*\.[5]$|0\.[5]$|\.[0]$|^[1-9]\d*$/,
    msg: '时间只能是整数和0.5的倍数'
  },
  'bigInt': { // 正整数（不含0）
    rule: /^[1-9]*[1-9][0-9]*$/,
    msg: '请输入正整数'
  },
}
/*
 * 内置规则
 * @param {String} type - {pattern}中预定义正则名称 or 自定义正则
 * @param {String} msg - 正则校验不通过提示
 * 用法
 * 1、{ validator: this.formValidate('fullName', '用户名由字母、数字、下划线以及短横线组成。'), trigger: 'blur' }
 * 2、{ validator: this.formValidate('/^([w-]+|[u4e00-u9fa5]+)$/', '用户名由字母、数字、下划线以及短横线组成。'), trigger: 'blur' }
 */

const formValidate = (type, msg) => {
  return (rule, value, callback) => {
    let reg = regularList[type] && regularList[type].rule ? regularList[type].rule : type
    msg = msg ? msg : (regularList[type] && regularList[type].msg) ? regularList[type].msg : ''
    if (!reg.test(value)) {
      callback(new Error(msg))
    } else {
      callback()
    }
  }
}

export default formValidate