import store from '@/store'
import dayjs from 'dayjs'
import context from '@/main'
const STORAGEPREFIX = 'jnpf_'
const STORAGETYPE = window.localStorage

const jnpf = {
  toDateText(dateTimeStamp) {
    let result = ''
    let minute = 1000 * 60; //把分，时，天，周，半个月，一个月用毫秒表示
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    let halfamonth = day * 15;
    let month = day * 30;
    let now = new Date().getTime(); //获取当前时间毫秒
    let diffValue = now - dateTimeStamp; //时间差
    if (diffValue < 0) return
    let minC = diffValue / minute; //计算时间差的分，时，天，周，月
    let hourC = diffValue / hour;
    let dayC = diffValue / day;
    let weekC = diffValue / week;
    let monthC = diffValue / month;
    if (monthC >= 1 && monthC <= 3) {
      result = " " + parseInt(monthC) + "月前"
    } else if (weekC >= 1 && weekC <= 3) {
      result = " " + parseInt(weekC) + "周前"
    } else if (dayC >= 1 && dayC <= 6) {
      result = " " + parseInt(dayC) + "天前"
    } else if (hourC >= 1 && hourC <= 23) {
      result = " " + parseInt(hourC) + "小时前"
    } else if (minC >= 1 && minC <= 59) {
      result = " " + parseInt(minC) + "分钟前"
    } else if (diffValue >= 0 && diffValue <= minute) {
      result = "刚刚"
    } else {
      let datetime = new Date();
      datetime.setTime(dateTimeStamp);
      let Nyear = datetime.getFullYear();
      let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
      let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
      let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
      let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
      let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
      result = Nyear + "-" + Nmonth + "-" + Ndate
    }
    return result;
  },
  getDate(format, strInterval, number) {
    var myDate = new Date();
    var dtTmp = new Date();
    if (!!strInterval) {
      switch (strInterval) {
        case 's':
          myDate = new Date(Date.parse(dtTmp) + (1000 * number)); // 秒
          break;
        case 'n':
          myDate = new Date(Date.parse(dtTmp) + (60000 * number)); // 分
          break;
        case 'h':
          myDate = new Date(Date.parse(dtTmp) + (3600000 * number)); // 小时
          break;
        case 'd':
          myDate = new Date(Date.parse(dtTmp) + (86400000 * number)); // 天
          break;
        case 'w':
          myDate = new Date(Date.parse(dtTmp) + ((86400000 * 7) * number)); // 星期
          break;
        case 'q':
          myDate = new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + number * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); // 季度
          break;
        case 'm':
          myDate = new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + number, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); // 月
          break;
        case 'y':
          myDate = new Date((dtTmp.getFullYear() + number), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()); // 年
          break;
        default:
      }
    }
    return jnpf.toDate(myDate, format);
  },
  toDate(v, format) {
    format = format ? format : "yyyy-MM-dd HH:mm"
    if (!v) return "";
    var d = v;
    if (typeof v === 'string') {
      if (v.indexOf("/Date(") > -1)
        d = new Date(parseInt(v.replace("/Date(", "").replace(")/", ""), 10));
      else
        d = new Date(Date.parse(v.replace(/-/g, "/").replace("T", " ").split(".")[0]));
    } else {
      d = new Date(v)
    }
    var o = {
      "M+": d.getMonth() + 1,
      "d+": d.getDate(),
      "h+": d.getHours(),
      "H+": d.getHours(),
      "m+": d.getMinutes(),
      "s+": d.getSeconds(),
      "q+": Math.floor((d.getMonth() + 3) / 3),
      "S": d.getMilliseconds()
    };
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
    return format;
  },
  getThatDay(space) {
    if (space == undefined) {
      space = 0
    }

    let date = new Date()
    date.setTime(date.getTime() + 86400000 * space)
    return this.assemblyDay({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate()
    })
  },
  assemblyDay(data) {
    let year = data.year.toString()
    data.month = Number(data.month + 1)
    let month = this.complement(data.month)
    let date = this.complement(data.date)
    return year + '-' + month + '-' + date
  },
  complement(value, digit) {
    digit = digit ? digit : 2
    value = Number(value)
    if (value < Math.pow(10, digit - 1)) {
      let text = ''
      for (let i = 0; i < digit - value.toString().length; i++) {
        text = text + '0'
      }
      return text + value
    } else {
      return value.toString()
    }
  },
  toTreeViewJson(data, id, parentIdText, idText) {
    parentIdText = parentIdText ? parentIdText : 'parentId'
    idText = idText ? idText : 'id'
    id = id ? id : 0
    let treeJson = [];
    let childNode = data.filter(v => v[parentIdText] == id);
    if (childNode.length > 0) {
      for (let i = 0; i < childNode.length; i++) {
        let treeModel = {
          ...childNode[i],
          hasChildren: !!data.filter(v => v[parentIdText] == childNode[i][idText]).length,
          ChildNodes: jnpf.toTreeViewJson(data, childNode[i][idText], parentIdText, idText),
          isexpand: childNode[i].isexpand == undefined ? true : childNode[i].isexpand,
          complete: true,
        }
        treeJson.push(treeModel);
      }
    }
    return treeJson;
  },
  toFileSize(size) {
    if (size == null || size == "") {
      return "";
    }
    if (size < 1024.00)
      return jnpf.toDecimal(size) + " 字节";
    else if (size >= 1024.00 && size < 1048576)
      return jnpf.toDecimal(size / 1024.00) + " KB";
    else if (size >= 1048576 && size < 1073741824)
      return jnpf.toDecimal(size / 1024.00 / 1024.00) + " MB";
    else if (size >= 1073741824)
      return jnpf.toDecimal(size / 1024.00 / 1024.00 / 1024.00) + " GB";
  },
  toDecimal(num) {
    if (num == null) {
      num = "0";
    }
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
      num = "0";
    var sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    var cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
      cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
      num = num.substring(0, num.length - (4 * i + 3)) + '' +
      num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
  },
  toUrl(url) {
    return process.env.VUE_APP_BASE_API + url;
  },
  getAuth() {
    return store.getters.token;
  },
  // 基于dayjs日期格式化,时间戳(毫秒)转日期
  dateFormat(date, format) {
    format = format || 'YYYY-MM-DD HH:mm'
    if (!date) return ''
    return dayjs(date).format(format)
  },
  // 基于dayjs日期格式化,日期转时间戳(毫秒)
  timestamp(val) {
    return dayjs(val).valueOf()
  },
  // 基于dayjs日期格式化, 表格专用
  tableDateFormat(row, column, cellValue) {
    let format = 'YYYY-MM-DD HH:mm'
    if (!cellValue) return ''
    return dayjs(cellValue).format(format)
  },
  storageSet(obj) {
    for (let i in obj) {
      cacheItem(i, obj[i])
    }

    function cacheItem(key, val) {
      key = STORAGEPREFIX + key
      let valType = typeof(val)
      if (val !== null) {
        var valConstructor = val.constructor
      }
      if (valType === 'string' || valType === 'number' || valType === 'boolean') {
        if (valConstructor === String) {
          val = val + '|String'
        } else if (valConstructor === Number) {
          val = val + '|Number'
        } else if (valConstructor === Boolean) {
          val = val + '|Boolean'
        }
        STORAGETYPE.setItem(key, val)
      } else if (valType === 'object') {
        if (val === null) {
          val = JSON.stringify(val) + '|Null'
          STORAGETYPE.setItem(key, val)
        } else {
          if (valConstructor === Array) {
            val = JSON.stringify(val) + '|Array'
          } else if (valConstructor === Object) {
            val = JSON.stringify(val) + '|Object'
          }
          STORAGETYPE.setItem(key, val)
        }
      }
    }
  },
  storageGet(key) {
    key = STORAGEPREFIX + key
    let keyName = STORAGETYPE.getItem(key)
    if (keyName === null) {
      return null
    }
    let valArr = keyName.split('|')
    let getDataType = valArr[valArr.length - 1]
    valArr.splice(valArr.length - 1, 1)
    let val = valArr.join('')
    if (getDataType === 'Number') {
      val = parseInt(val)
    } else if (getDataType === 'Boolean') {
      if (val === 'true') {
        val = true
      } else {
        val = false
      }
    } else if (getDataType === 'Array' || getDataType === 'Object' || getDataType === 'Null') {
      val = JSON.parse(val)
    }
    return val
  },
  storageRemove(key) {
    STORAGETYPE.removeItem(STORAGEPREFIX + key)
  },
  storageClear() {
    for (let i in STORAGETYPE) {
      if (i.indexOf(STORAGEPREFIX) !== -1) {
        STORAGETYPE.removeItem(i)
      }
    }
  },
  hasP(enCode) {
    const permissionList = store.getters && store.getters.permissionList
    const modelId = context.$route.meta.modelId || ''
    if (!modelId) return false
    const list = permissionList.filter(o => o.modelId === modelId)
    if (!list.length) return false
    const columnList = list[0] && list[0].column ? list[0].column : []
    if (!columnList.length) return false
    const hasPermission = columnList.some(column => column.enCode === enCode)
    if (hasPermission) return true
    return false
  },
  hasBtnP(enCode) {
    const permissionList = store.getters && store.getters.permissionList
    const modelId = context.$route.meta.modelId || ''
    if (!modelId) return false
    const list = permissionList.filter(o => o.modelId === modelId)
    if (!list.length) return false
    const btnList = list[0] && list[0].button ? list[0].button : []
    if (!btnList.length) return false
    const hasPermission = btnList.some(btn => btn.enCode === enCode)
    if (hasPermission) return true
    return false
  }
}
export default jnpf