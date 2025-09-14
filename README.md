# 商品后台管理系统（静态示例，Vue 3 + Vite）

功能：
- 登录页（任意账号密码即可登录，前端本地 token）
- 首页
- 商品列表（本地新增/删除）
- 商品详情（静态示例，示意为主）

## 本地运行

1. 安装依赖（需要 Node.js 18+）
```bash
npm install
```

2. 启动开发服务器
```bash
npm run dev
```

3. 打包构建
```bash
npm run build
npm run preview
```

## 目录结构

```
├─ index.html
├─ package.json
├─ vite.config.js
└─ src
   ├─ main.js
   ├─ App.vue
   ├─ assets
   │  └─ base.css
   ├─ components
   │  └─ NavBar.vue
   ├─ router
   │  └─ index.js
   └─ views
      ├─ Home.vue
      ├─ Login.vue
      ├─ ProductDetail.vue
      └─ ProductList.vue
```

## 说明
- 本项目目前为静态页面示例，新增/删除仅在前端内存中生效；刷新页面即会恢复初始数据。
- 如需接入真实后端（登录鉴权、商品增删改查 API），我可以继续为你扩展。
