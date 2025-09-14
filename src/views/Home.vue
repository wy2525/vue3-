<template>
  <div>
    <section class="card hero">
      <div class="title">欢迎使用微商后台管理系统</div>
      <p class="subtitle muted">一站式微商店铺管理解决方案，帮助您高效管理商品、订单、客户和库存。</p>
      <div class="chips">
        <span class="chip">Vue 3 + Vite</span>
        <span class="chip">路由守卫</span>
        <span class="chip">数据统计</span>
        <span class="chip">客户管理</span>
        <span class="chip">订单处理</span>
      </div>
    </section>

    <div class="dashboard-grid">
      <section class="card quick-stats">
        <h3>今日概览</h3>
        <div class="stats-row">
          <div class="stat-item">
            <div class="stat-icon orders">📦</div>
            <div class="stat-content">
              <div class="stat-value">23</div>
              <div class="stat-label">今日订单</div>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon sales">💰</div>
            <div class="stat-content">
              <div class="stat-value">￥5,689</div>
              <div class="stat-label">今日销售</div>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon customers">👤</div>
            <div class="stat-content">
              <div class="stat-value">8</div>
              <div class="stat-label">新增客户</div>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon views">👁️</div>
            <div class="stat-content">
              <div class="stat-value">156</div>
              <div class="stat-label">商品浏览</div>
            </div>
          </div>
        </div>
      </section>

      <section class="card">
        <h3>待处理事项</h3>
        <div class="todo-list">
          <div class="todo-item">
            <div class="todo-icon pending">⏳</div>
            <div class="todo-content">
              <div class="todo-title">待付款订单</div>
              <div class="todo-count">5笔</div>
            </div>
            <RouterLink to="/orders?status=pending" class="todo-action">查看</RouterLink>
          </div>
          <div class="todo-item">
            <div class="todo-icon shipping">🚚</div>
            <div class="todo-content">
              <div class="todo-title">待发货订单</div>
              <div class="todo-count">12笔</div>
            </div>
            <RouterLink to="/orders?status=paid" class="todo-action">处理</RouterLink>
          </div>
          <div class="todo-item">
            <div class="todo-icon stock">📉</div>
            <div class="todo-content">
              <div class="todo-title">库存不足商品</div>
              <div class="todo-count">3种</div>
            </div>
            <RouterLink to="/inventory?stock=low" class="todo-action">补货</RouterLink>
          </div>
          <div class="todo-item">
            <div class="todo-icon message">💬</div>
            <div class="todo-content">
              <div class="todo-title">未回复留言</div>
              <div class="todo-count">7条</div>
            </div>
            <a href="#" class="todo-action">回复</a>
          </div>
        </div>
      </section>

      <section class="card">
        <div class="card-header">
          <h3>热销商品</h3>
          <RouterLink to="/products" class="view-all">查看全部</RouterLink>
        </div>
        <div class="hot-products">
          <div class="hot-product-item">
            <div class="hot-product-rank">1</div>
            <div class="hot-product-info">
              <div class="hot-product-name">iPhone 15 Pro</div>
              <div class="hot-product-sales">已售 18 件</div>
            </div>
            <div class="hot-product-price">￥8,999</div>
          </div>
          <div class="hot-product-item">
            <div class="hot-product-rank">2</div>
            <div class="hot-product-info">
              <div class="hot-product-name">MacBook Air</div>
              <div class="hot-product-sales">已售 12 件</div>
            </div>
            <div class="hot-product-price">￥8,999</div>
          </div>
          <div class="hot-product-item">
            <div class="hot-product-rank">3</div>
            <div class="hot-product-info">
              <div class="hot-product-name">AirPods Pro</div>
              <div class="hot-product-sales">已售 25 件</div>
            </div>
            <div class="hot-product-price">￥1,999</div>
          </div>
          <div class="hot-product-item">
            <div class="hot-product-rank">4</div>
            <div class="hot-product-info">
              <div class="hot-product-name">iPad Pro</div>
              <div class="hot-product-sales">已售 10 件</div>
            </div>
            <div class="hot-product-price">￥6,999</div>
          </div>
          <div class="hot-product-item">
            <div class="hot-product-rank">5</div>
            <div class="hot-product-info">
              <div class="hot-product-name">iPhone 15</div>
              <div class="hot-product-sales">已售 15 件</div>
            </div>
            <div class="hot-product-price">￥5,999</div>
          </div>
        </div>
      </section>

      <section class="card">
        <div class="card-header">
          <h3>最近订单</h3>
          <RouterLink to="/orders" class="view-all">查看全部</RouterLink>
        </div>
        <div class="recent-orders">
          <div class="recent-order-item">
            <div class="order-customer">张三</div>
            <div class="order-info">
              <div class="order-id">WX20230518001</div>
              <div class="order-time">今天 09:15</div>
            </div>
            <div class="order-amount">￥1,299</div>
            <div class="order-status">
              <span class="status-tag paid">已付款</span>
            </div>
          </div>
          <div class="recent-order-item">
            <div class="order-customer">李四</div>
            <div class="order-info">
              <div class="order-id">WX20230517002</div>
              <div class="order-time">昨天 14:20</div>
            </div>
            <div class="order-amount">￥5,999</div>
            <div class="order-status">
              <span class="status-tag shipped">已发货</span>
            </div>
          </div>
          <div class="recent-order-item">
            <div class="order-customer">王五</div>
            <div class="order-info">
              <div class="order-id">WX20230517003</div>
              <div class="order-time">昨天 10:30</div>
            </div>
            <div class="order-amount">￥899</div>
            <div class="order-status">
              <span class="status-tag completed">已完成</span>
            </div>
          </div>
          <div class="recent-order-item">
            <div class="order-customer">赵六</div>
            <div class="order-info">
              <div class="order-id">WX20230516004</div>
              <div class="order-time">前天 16:45</div>
            </div>
            <div class="order-amount">￥2,799</div>
            <div class="order-status">
              <span class="status-tag pending">待付款</span>
            </div>
          </div>
          <div class="recent-order-item">
            <div class="order-customer">孙七</div>
            <div class="order-info">
              <div class="order-id">WX20230516005</div>
              <div class="order-time">前天 11:10</div>
            </div>
            <div class="order-amount">￥799</div>
            <div class="order-status">
              <span class="status-tag cancelled">已取消</span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="quick-actions">
      <RouterLink to="/products" class="quick-action-btn">
        <span class="quick-action-icon">📦</span>
        <span>添加商品</span>
      </RouterLink>
      <RouterLink to="/orders" class="quick-action-btn">
        <span class="quick-action-icon">🧾</span>
        <span>查看订单</span>
      </RouterLink>
      <RouterLink to="/customers" class="quick-action-btn">
        <span class="quick-action-icon">👥</span>
        <span>客户管理</span>
      </RouterLink>
      <RouterLink to="/statistics" class="quick-action-btn">
        <span class="quick-action-icon">📊</span>
        <span>数据统计</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.hero .title { font-size: 22px; font-weight: 800; }
.hero .subtitle { margin: 6px 0 12px; }

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

h3 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: 600;
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.stat-icon.orders {
  background-color: #f0fdf4;
  color: #10b981;
}

.stat-icon.sales {
  background-color: #eff6ff;
  color: #3b82f6;
}

.stat-icon.customers {
  background-color: #eef2ff;
  color: #6366f1;
}

.stat-icon.views {
  background-color: #fef2f2;
  color: #ef4444;
}

.stat-value {
  font-weight: 700;
  font-size: 16px;
}

.stat-label {
  font-size: 12px;
  color: var(--muted);
}

.todo-list {
  display: grid;
  gap: 12px;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border);
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.todo-icon.pending {
  background-color: #fef3c7;
  color: #92400e;
}

.todo-icon.shipping {
  background-color: #dbeafe;
  color: #1e40af;
}

.todo-icon.stock {
  background-color: #fee2e2;
  color: #b91c1c;
}

.todo-icon.message {
  background-color: #f3e8ff;
  color: #7e22ce;
}

.todo-content {
  flex: 1;
}

.todo-title {
  font-weight: 500;
}

.todo-count {
  font-size: 13px;
  color: var(--muted);
}

.todo-action {
  color: var(--primary);
  font-weight: 500;
  font-size: 14px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.view-all {
  font-size: 14px;
  color: var(--primary);
}

.hot-products {
  display: grid;
  gap: 12px;
}

.hot-product-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}

.hot-product-item:last-child {
  border-bottom: none;
}

.hot-product-rank {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #f3f4f6;
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
}

.hot-product-item:nth-child(1) .hot-product-rank {
  background: #fef3c7;
  color: #92400e;
}

.hot-product-item:nth-child(2) .hot-product-rank {
  background: #e5e7eb;
  color: #4b5563;
}

.hot-product-item:nth-child(3) .hot-product-rank {
  background: #fee2e2;
  color: #b91c1c;
}

.hot-product-info {
  flex: 1;
}

.hot-product-name {
  font-weight: 500;
}

.hot-product-sales {
  font-size: 13px;
  color: var(--muted);
}

.hot-product-price {
  font-weight: 600;
  color: var(--success);
}

.recent-orders {
  display: grid;
  gap: 12px;
}

.recent-order-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}

.recent-order-item:last-child {
  border-bottom: none;
}

.order-customer {
  width: 60px;
  font-weight: 500;
}

.order-info {
  flex: 1;
}

.order-id {
  font-family: monospace;
  font-size: 13px;
  font-weight: 600;
}

.order-time {
  font-size: 12px;
  color: var(--muted);
}

.order-amount {
  font-weight: 600;
  color: var(--success);
  margin-right: 8px;
}

.status-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.status-tag.pending {
  background-color: #fef3c7;
  color: #92400e;
}

.status-tag.paid {
  background-color: #e0f2fe;
  color: #0369a1;
}

.status-tag.shipped {
  background-color: #dbeafe;
  color: #1e40af;
}

.status-tag.completed {
  background-color: #d1fae5;
  color: #065f46;
}

.status-tag.cancelled {
  background-color: #fee2e2;
  color: #b91c1c;
}

.quick-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
}

.quick-action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid var(--border);
  width: 100px;
  text-align: center;
  transition: all 0.2s ease;
}

.quick-action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.quick-action-icon {
  font-size: 24px;
}
</style>
