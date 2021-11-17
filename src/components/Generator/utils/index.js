/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/**
 * num 小于0，左缩进num*2个空格； 大于0，右缩进num*2个空格。
 * @param {string} str 代码
 * @param {number} num 缩进次数
 * @param {number} len 【可选】缩进单位，空格数
 */
export function indent(str, num, len = 2) {
  if (num === 0) return str
  const isLeft = num < 0;
  const result = [];
  let reg;
  let
    spaces = ''
  if (isLeft) {
    num *= -1
    reg = new RegExp(`(^\\s{0,${num * len}})`, 'g')
  } else {
    for (let i = 0; i < num * len; i++) spaces += ' '
  }

  str.split('\n').forEach(line => {
    line = isLeft ? line.replace(reg, '') : spaces + line
    result.push(line)
  })
  return result.join('\n')
}

// 首字母大小
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, L => L.toUpperCase())
}

// 下划转驼峰
export function camelCase(str) {
  return str.replace(/-[a-z]/g, str1 => str1.substr(-1).toUpperCase())
}

export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}

export const exportDefault = 'export default '

export const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
}

function stringify(obj) {
  return JSON.stringify(obj, (key, val) => {
    if (typeof val === 'function') {
      return `${val}`
    }
    return val
  })
}

function parse(str) {
  JSON.parse(str, (k, v) => {
    if (v.indexOf && v.indexOf('function') > -1) {
      return eval(`(${v})`)
    }
    return v
  })
}

export function jsonClone(obj) {
  return parse(stringify(obj))
}

// 深拷贝对象
export function deepClone(obj) {
  const _toString = Object.prototype.toString

  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  // DOM Node
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true)
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime())
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    const flags = []
    if (obj.global) { flags.push('g') }
    if (obj.multiline) { flags.push('m') }
    if (obj.ignoreCase) { flags.push('i') }

    return new RegExp(obj.source, flags.join(''))
  }

  const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}

  for (const key in obj) {
    result[key] = deepClone(obj[key])
  }

  return result
}

/**
 * 金额转中文
 * 思路：                       
 *                              个
 *      十     百      千       万
 *      十万   百万    千万     亿 
 *      十亿   百亿    千亿    
 *                              
 *                              1
 *      2      3       4        5
 *      6      7       8        9   
 *      10
 * 
 * 计算步骤
 * 1. 获取当前数值大小
 * 2. 排除个位后 数值按个，十，百，千有规律的重复 所以计算其和4的余数 pos % 4
 * 3. pos = 0 ~ 3 没有最大单位
 *    pos = 4 ~ 7 最大单位是万
 *    pos = 8 ~ 11 最大单位是亿
 * pos / 4 的整数就是最大单位
 * 
 */
export function getAmountChinese(val) {
  const amount = +val
  if (Number.isNaN(amount) || amount < 0) return ''
  const NUMBER = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const N_UNIT1 = ['', '拾', '佰', '仟']
  const N_UNIT2 = ['', '万', '亿']
  const D_UNIT = ['角', '分', '厘', '毫']
  let [integer, decimal] = amount.toString().split('.')
  if (integer && integer.length > 12) return '金额过大无法计算'
  let res = ''
  // 整数部分
  if (integer) {
    for (let i = 0, len = integer.length; i < len; i++) {
      const num = integer.charAt(i)
      const pos = len - i - 1 // 排除个位后 所处的索引位置
      if (num === '0') { // 当前位 等于 0 且下一位也等于 0 则可跳过计算
        if (i === len - 1) {
          if (integer.length === 1) res += '零' // 0.35 这种情况不可跳过计算
          break
        }
        if (integer.charAt(i + 1) === '0') continue
      }
      res += NUMBER[num]
      if (parseInt(num)) res += N_UNIT1[(pos) % 4]
      if (pos % 4 === 0) res += N_UNIT2[Math.floor(pos / 4)]
    }
  }
  res += '圆'
  // 小数部分
  if (parseInt(decimal)) {
    for (let i = 0; i < 4; i++) {
      const num = decimal.charAt(i)
      if (parseInt(num)) res += NUMBER[num] + D_UNIT[i]
    }
  } else {
    res += '整'
  }
  return res
}
/**
 * 将用户输入的连续单个数字合并为一个数
 * @param {Array} expressions - 记录计算表达式的数组
 * @returns {Array} 新的数组
 */
export const mergeNumberOfExps = expressions => {
  const res = []
  const isNumChar = n => /^[\d|\.]$/.test(n)
  for (let i = 0; i < expressions.length; i++) {
    if (i > 0 && isNumChar(expressions[i - 1]) && isNumChar(expressions[i])) {
      res[res.length - 1] += expressions[i]
      continue
    }
    res.push(expressions[i])
  }
  return res
}
/**
 * 校验表达式是否符合计算法则
 * @param {Array} expressions - 合并数字后的表达式数组
 * @returns {Boolean}
 */
export const validExp = (expressions, mergeNum = true) => {
  const temp = mergeNum ? mergeNumberOfExps(expressions) : expressions
  const arr = temp.filter(t => !'()'.includes(t))
  // 去括号后 length应该为奇数  并且第一个字符和最后一个字符应该为数字而非计算符号
  if (temp.length % 2 === 0 || arr.length % 2 === 0 || Number.isNaN(+arr[0]) || Number.isNaN(+arr[arr.length - 1])) {
    return false
  }
  for (let i = 0; i < arr.length - 1; i += 2) {
    if (typeof(+arr[i]) !== 'number' || !Number.isNaN(+arr[i + 1])) return false
  }
  return true
}
/**
 * 中缀转后缀（逆波兰 Reverse Polish Notation）
 * @param {Array} exps - 中缀表达式数组
 */
export const toRPN = exps => {
  const s1 = [] // 符号栈
  const s2 = [] // 输出栈
  const getTopVal = (stack) => stack.length > 0 ? stack[stack.length - 1] : null
  const levelCompare = (c1, c2) => {
    const getIndex = c => ['+-', '×÷', '()'].findIndex(t => t.includes(c))
    return getIndex(c1) - getIndex(c2)
  }
  exps.forEach(t => {
    if (typeof t === 'string' && Number.isNaN(Number(t))) { // 是符号
      if (t === '(') {
        s1.push(t)
      } else if (t === ')') {
        let popVal
        do {
          popVal = s1.pop()
          popVal !== '(' && s2.push(popVal)
        } while (s1.length && popVal !== '(')
      } else {
        let topVal = getTopVal(s1)
        if (!topVal) { // s1 为空 直接push
          s1.push(t)
        } else {
          while (topVal && topVal !== '(' && levelCompare(topVal, t) >= 0) { // 优先级 >= t 弹出到s2
            s2.push(s1.pop())
            topVal = getTopVal(s1)
          }
          s1.push(t)
        }
      }
      return
    }
    s2.push(t) // 数字直接入栈
  })
  while (s1.length) {
    s2.push(s1.pop())
  }
  return s2
}
/**
 * 计算后缀表达式的值
 * @param {Array} rpnExps - 后缀表达式
 */
export const calcRPN = rpnExps => {
  rpnExps = rpnExps.concat()
  const calc = (x, y, type) => {
    let a1 = Number(x),
      a2 = Number(y)
    switch (type) {
      case '+':
        return a1 + a2;
      case '-':
        return a1 - a2;
      case '×':
        return a1 * a2;
      case '÷':
        return a1 / a2;
    }
  }
  for (let i = 2; i < rpnExps.length; i++) {
    if ('+-×÷'.includes(rpnExps[i])) {
      let val = calc(rpnExps[i - 2], rpnExps[i - 1], rpnExps[i])
      rpnExps.splice(i - 2, 3, val)
      i = i - 2
    }
  }
  return rpnExps[0]
}
/**
 * 简易防抖函数
 * @param {Function} func -防抖目标函数
 * @param {Number} gap - 防抖时间间隔
 */
export const debounce = (func, gap) => {
  let timer
  return function() {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, arguments)
    }, gap)
  }
}