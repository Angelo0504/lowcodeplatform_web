export default {
  options(h, conf, key) {
    const list = []
    conf.__slot__.options.forEach(item => {
      list.push(<el-option label={item[conf.__config__.props.label]} value={item[conf.__config__.props.value]} disabled={item.disabled}></el-option>)
    })
    return list
  }
}
