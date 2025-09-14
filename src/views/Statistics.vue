<template>
  <div>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon sales">💰</div>
        <div class="stat-content">
          <div class="stat-title">今日销售额</div>
          <div class="stat-value">￥{{ todaySales.toFixed(2) }}</div>
          <div class="stat-trend" :class="{ up: salesTrend > 0, down: salesTrend < 0 }">
            {{ salesTrend > 0 ? '↑' : '↓' }} {{ Math.abs(salesTrend) }}% 较昨日
          </div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon orders">📦</div>
        <div class="stat-content">
          <div class="stat-title">今日订单数</div>
          <div class="stat-value">{{ todayOrders }}</div>
          <div class="stat-trend" :class="{ up: ordersTrend > 0, down: ordersTrend < 0 }">
            {{ ordersTrend > 0 ? '↑' : '↓' }} {{ Math.abs(ordersTrend) }}% 较昨日
          </div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon customers">👤</div>
        <div class="stat-content">
          <div class="stat-title">今日新增客户</div>
          <div class="stat-value">{{ todayCustomers }}</div>
          <div class="stat-trend" :class="{ up: customersTrend > 0, down: customersTrend < 0 }">
            {{ customersTrend > 0 ? '↑' : '↓' }} {{ Math.abs(customersTrend) }}% 较昨日
          </div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon profit">📈</div>
        <div class="stat-content">
          <div class="stat-title">今日利润</div>
          <div class="stat-value">￥{{ todayProfit.toFixed(2) }}</div>
          <div class="stat-trend" :class="{ up: profitTrend > 0, down: profitTrend < 0 }">
            {{ profitTrend > 0 ? '↑' : '↓' }} {{ Math.abs(profitTrend) }}% 较昨日
          </div>
        </div>
      </div>
    </div>

    <div class="chart-grid">
      <section class="card chart-card">
        <div class="chart-header">
          <h3>销售趋势</h3>
          <div class="chart-actions">
            <button class="chart-btn" :class="{ active: salesPeriod === 'week' }" @click="salesPeriod = 'week'">周</button>
            <button class="chart-btn" :class="{ active: salesPeriod === 'month' }" @click="salesPeriod = 'month'">月</button>
            <button class="chart-btn" :class="{ active: salesPeriod === 'year' }" @click="salesPeriod = 'year'">年</button>
          </div>
        </div>
        <div class="chart-container">
          <div class="chart-placeholder">
            <div class="chart-bars">
              <div v-for="(item, index) in salesData" :key="index" class="chart-bar-container">
                <div class="chart-bar" :style="{ height: `${item.value / maxSalesValue * 100}%` }"></div>
                <div class="chart-label">{{ item.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="card chart-card">
        <div class="chart-header">
          <h3>热销商品</h3>
          <div class="chart-actions">
            <button class="chart-btn" :class="{ active: productPeriod === 'week' }" @click="productPeriod = 'week'">周</button>
            <button class="chart-btn" :class="{ active: productPeriod === 'month' }" @click="productPeriod = 'month'">月</button>
          </div>
        </div>
        <div class="top-products">
          <div v-for="(product, index) in topProducts" :key="index" class="top-product-item">
            <div class="product-rank">{{ index + 1 }}</div>
            <div class="product-info">
              <div class="product-name">{{ product.name }}</div>
              <div class="product-spec">{{ product.spec }}</div>
            </div>
            <div class="product-sales">
              <div class="product-count">{{ product.count }}件</div>
              <div class="product-amount">￥{{ product.amount.toFixed(2) }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <section class="card">
      <div class="chart-header">
        <h3>订单状态分布</h3>
      </div>
      <div class="status-distribution">
        <div class="status-item" v-for="(status, index) in orderStatus" :key="index">
          <div class="status-color" :style="{ backgroundColor: status.color }"></div>
          <div class="status-info">
            <div class="status-name">{{ status.name }}</div>
            <div class="status-count">{{ status.count }}单</div>
          </div>
          <div class="status-percent">{{ status.percent }}%</div>
          <div class="status-bar-container">
            <div class="status-bar" :style="{ width: `${status.percent}%`, backgroundColor: status.color }"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 今日统计数据
const todaySales = ref(5689.50)
const todayOrders = ref(23)
const todayCustomers = ref(8)
const todayProfit = ref(2345.75)

// 趋势数据
const salesTrend = ref(12.5)
const ordersTrend = ref(8.3)
const customersTrend = ref(-5.2)
const profitTrend = ref(15.8)

// 销售趋势图表
const salesPeriod = ref('week')
const weekSalesData = [
  { label: '周一', value: 3200 },
  { label: '周二', value: 4500 },
  { label: '周三', value: 3800 },
  { label: '周四', value: 5100 },
  { label: '周五', value: 5689.5 },
  { label: '周六', value: 0 },
  { label: '周日', value: 0 },
]

const monthSalesData = [
  { label: '5/1', value: 3200 },
  { label: '5/5', value: 4500 },
  { label: '5/10', value: 3800 },
  { label: '5/15', value: 5100 },
  { label: '5/20', value: 5689.5 },
  { label: '5/25', value: 4200 },
  { label: '5/30', value: 4800 },
]

const yearSalesData = [
  { label: '1月', value: 32000 },
  { label: '2月', value: 45000 },
  { label: '3月', value: 38000 },
  { label: '4月', value: 51000 },
  { label: '5月', value: 56895 },
  { label: '6月', value: 0 },
  { label: '7月', value: 0 },
  { label: '8月', value: 0 },
  { label: '9月', value: 0 },
  { label: '10月', value: 0 },
  { label: '11月', value: 0 },
  { label: '12月', value: 0 },
]

const salesData = computed(() => {
  if (salesPeriod.value === 'week') return weekSalesData
  if (salesPeriod.value === 'month') return monthSalesData
  return yearSalesData
})

const maxSalesValue = computed(() => {
  return Math.max(...salesData.value.map(item => item.value)) * 1.2
})

// 热销商品
const productPeriod = ref('week')

const weekTopProducts = [
  { name: 'iPhone 15 Pro', spec: '256GB 原色钛金属', count: 5, amount: 44995 },
  { name: 'AirPods Pro', spec: '第二代', count: 8, amount: 15992 },
  { name: 'MacBook Air', spec: 'M2 8+256GB 深空灰', count: 3, amount: 26997 },
  { name: 'iPad Air', spec: '64GB WIFI版 蓝色', count: 4, amount: 19196 },
  { name: 'Apple Watch SE', spec: '40mm GPS版', count: 6, amount: 13794 },
]

const monthTopProducts = [
  { name: 'iPhone 15 Pro', spec: '256GB 原色钛金属', count: 18, amount: 161982 },
  { name: 'MacBook Air', spec: 'M2 8+256GB 深空灰', count: 12, amount: 107988 },
  { name: 'AirPods Pro', spec: '第二代', count: 25, amount: 49975 },
  { name: 'iPad Pro', spec: '128GB WIFI版 银色', count: 10, amount: 69990 },
  { name: 'iPhone 15', spec: '128GB 黑色', count: 15, amount: 89985 },
]

const topProducts = computed(() => {
  return productPeriod.value === 'week' ? weekTopProducts : monthTopProducts
})

// 订单状态分布
const orderStatus = [
  { name: '已完成', count: 156, percent: 52, color: '#10b981' },
  { name: '已发货', count: 64, percent: 21, color: '#3b82f6' },
  { name: '已付款', count: 45, percent: 15, color: '#6366f1' },
  { name: '待付款', count: 28, percent: 9, color: '#f59e0b' },
  { name: '已取消', count: 9, percent: 3, color: '#ef4444' },
]
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.stat-card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 16px rgba(15,23,42,.06);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.stat-icon.sales {
  background-color: #eff6ff;
  color: #3b82f6;
}

.stat-icon.orders {
  background-color: #f0fdf4;
  color: #10b981;
}

.stat-icon.customers {
  background-color: #eef2ff;
  color: #6366f1;
}

.stat-icon.profit {
  background-color: #fef2f2;
  color: #ef4444;
}

.stat-content {
  flex: 1;
}

.stat-title {
  font-size: 14px;
  color: var(--muted);
}

.stat-value {
  font-size: 20px;
  font-weight: 700;
  margin: 4px 0;
}

.stat-trend {
  font-size: 13px;
  font-weight: 500;
}

.stat-trend.up {
  color: #10b981;
}

.stat-trend.down {
  color: #ef4444;
}

.chart-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .chart-grid {
    grid-template-columns: 1fr;
  }
}

.chart-card {
  height: 360px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.chart-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.chart-actions {
  display: flex;
  gap: 8px;
}

.chart-btn {
  background: #f3f4f6;
  color: var(--muted);
  border: none;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  box-shadow: none;
}

.chart-btn.active {
  background: var(--primary);
  color: #fff;
}

.chart-container {
  height: calc(100% - 40px);
  display: flex;
  align-items: flex-end;
}

.chart-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding-bottom: 24px;
}

.chart-bars {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: flex-end;
  justify-content: space-around;
}

.chart-bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
}

.chart-bar {
  width: 40px;
  max-width: 80%;
  background: var(--primary);
  border-radius: 4px 4px 0 0;
  transition: height 0.3s ease;
}

.chart-label {
  margin-top: 8px;
  font-size: 12px;
  color: var(--muted);
}

.top-products {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.top-product-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--border);
}

.top-product-item:last-child {
  border-bottom: none;
}

.product-rank {
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

.top-product-item:nth-child(1) .product-rank {
  background: #fef3c7;
  color: #92400e;
}

.top-product-item:nth-child(2) .product-rank {
  background: #e5e7eb;
  color: #4b5563;
}

.top-product-item:nth-child(3) .product-rank {
  background: #fee2e2;
  color: #b91c1c;
}

.product-info {
  flex: 1;
}

.product-name {
  font-weight: 600;
  font-size: 14px;
}

.product-spec {
  font-size: 12px;
  color: var(--muted);
  margin-top: 2px;
}

.product-sales {
  text-align: right;
}

.product-count {
  font-size: 12px;
  color: var(--muted);
}

.product-amount {
  font-weight: 600;
  color: var(--success);
}

.status-distribution {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.status-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.status-info {
  width: 100px;
}

.status-name {
  font-size: 14px;
  font-weight: 500;
}

.status-count {
  font-size: 12px;
  color: var(--muted);
}

.status-percent {
  font-weight: 600;
  width: 40px;
}

.status-bar-container {
  flex: 1;
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
}

.status-bar {
  height: 100%;
  border-radius: 4px;
  transition: width 0.3s ease;
}
</style>