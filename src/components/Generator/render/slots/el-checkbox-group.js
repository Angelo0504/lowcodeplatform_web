export default {
  options(h, conf, key) {
    const list = []
    conf.__slot__.options.forEach(item => {
      if (conf.__config__.optionType === 'button') {
        list.push(<el-checkbox-button label={item[conf.__config__.props.value]}>{item[conf.__config__.props.label]}</el-checkbox-button>)
      } else {
        list.push(<el-checkbox label={item[conf.__config__.props.value]} border={conf.__config__.border}>{item[conf.__config__.props.label]}</el-checkbox>)
      }
    })
    return list
  }
}
