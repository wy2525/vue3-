# 商品后台管理系统

这是一个基于 Vue 3 和 Express 的商品后台管理系统，使用 MySQL 作为数据库。

## 项目结构

- `src/` - 前端 Vue 应用
- `server/` - 后端 Express 服务器

## 数据库设置

1. 确保你已经安装了 MySQL 数据库服务器
2. 使用以下命令导入初始数据库结构：

```bash
mysql -u root -p < server/init-db.sql
```

或者手动在 MySQL 客户端中执行 `server/init-db.sql` 文件中的 SQL 语句。

## 后端服务器设置

1. 进入 server 目录：

```bash
cd server
```

2. 安装依赖：

```bash
npm install
```

3. 修改数据库连接配置（如果需要）：

打开 `server/index.js` 文件，找到 `dbConfig` 对象，根据你的 MySQL 配置修改用户名和密码：

```javascript
const dbConfig = {
  host: 'localhost',
  user: 'root',      // 修改为你的 MySQL 用户名
  password: '',      // 修改为你的 MySQL 密码
  database: 'product_admin'
};
```

4. 启动后端服务器：

```bash
npm run dev
```

服务器将在 http://localhost:3000 上运行。

## 前端应用设置

1. 在项目根目录下安装依赖：

```bash
npm install
```

2. 启动开发服务器：

```bash
npm run dev
```

前端应用将在 http://localhost:5173 上运行。

## API 端点

- `GET /api/products` - 获取所有商品
- `GET /api/products/:id` - 获取单个商品
- `POST /api/products` - 添加新商品
- `PUT /api/products/:id` - 更新商品
- `DELETE /api/products/:id` - 删除商品
- `GET /api/test` - 测试数据库连接
- `POST /api/login` - 登录
- `POST /api/register` - 注册
- `POST /api/logout` - 退出登录