// 开发环境接口配置
const APIURl = 'http://localhost:30000'

module.exports = {
  APIURl: APIURl,
  timeout: process.env.NODE_ENV === 'development' ? 10000 : 1000000,
  WebSocketUrl: process.env.NODE_ENV === 'development' ? APIURl.replace('http', 'ws') + '/api/system/Message/websocket' : process.env.VUE_APP_BASE_WSS,
  comUploadUrl: process.env.VUE_APP_BASE_API + '/api/file/Uploader',
  comUrl: process.env.VUE_APP_BASE_API,
  // 大屏应用前端路径
  dataV: process.env.NODE_ENV === 'development' ? 'http://localhost:8100/DataV' : process.env.VUE_APP_BASE_API + '/DataV',
  // 数据报表
  reportServer: process.env.NODE_ENV === 'development' ? 'http://localhost:9000' : process.env.VUE_APP_BASE_API + '/ReportServer',
  report: process.env.NODE_ENV === 'development' ? 'http://localhost:8200' : process.env.VUE_APP_BASE_API + '/Report',
  version: '3.1'
}
