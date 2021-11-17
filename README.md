# jnpf-web

## 环境要求

- Node.js 12.8.x+

## 使用说明
### 安装依赖
```bash
npm i

# 如果下载速度比较慢，可通过以下方式解决
npm i --registry=https://registry.npm.taobao.org
```
### 开发环境
- 打开`src/utils/define.js`,修改接口地址
```bash
  // 开发环境接口配置
  const APIURl = 'http://192.168.0.25:30000'
```
- 运行前端项目(默认会自动打开浏览器)
```bash
npm run dev
```

### 测试生产发布
```bash
# 构建测试环境
npm run build:staging

# 构建生产环境
npm run build
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```