<template>
  <section class="card">
    <div class="toolbar">
      <h2 style="margin:0;">客户详情</h2>
      <span v-if="customer" class="badge">ID: {{ customer.id }}</span>
    </div>

    <div v-if="customer" class="customer-detail">
      <div class="customer-header">
        <div class="avatar-large">{{ customer.name.slice(0, 1) }}</div>
        <div class="customer-info">
          <div class="customer-name">{{ customer.name }}</div>
          <div class="customer-tags">
            <span v-if="customer.totalSpent > 10000" class="tag vip">VIP</span>
            <span v-if="isRecentCustomer(customer.lastOrder)" class="tag recent">活跃</span>
          </div>
          <div class="customer-contact">{{ customer.phone }}</div>
        </div>
        <div class="customer-actions">
          <button class="ghost" @click="editCustomer">编辑信息</button>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-box">
          <div class="stat-value">{{ customer.orderCount }}</div>
          <div class="stat-label">总订单数</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">￥{{ customer.totalSpent.toFixed(2) }}</div>
          <div class="stat-label">总消费额</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">￥{{ (customer.totalSpent / customer.orderCount).toFixed(2) }}</div>
          <div class="stat-label">平均客单价</div>
        </div>
        <div class="stat-box">
          <div class="stat-value">{{ formatDate(customer.lastOrder) }}</div>
          <div class="stat-label">最近下单</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">客户信息</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="label">注册时间</div>
            <div>{{ formatFullDate(customer.registerDate) }}</div>
          </div>
          <div class="info-item">
            <div class="label">会员等级</div>
            <div>{{ getMembershipLevel(customer.totalSpent) }}</div>
          </div>
          <div class="info-item">
            <div class="label">默认地址</div>
            <div>{{ customer.address || '未设置' }}</div>
          </div>
          <div class="info-item">
            <div class="label">备注</div>
            <div>{{ customer.note || '无' }}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">订单历史</div>
        <table class="order-table">
          <thead>
            <tr>
              <th>订单号</th>
              <th>下单时间</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in customerOrders" :key="order.id">
              <td class="order-id">{{ order.id }}</td>
              <td>{{ formatFullDate(order.date) }}</td>
              <td class="price">￥{{ order.total.toFixed(2) }}</td>
              <td>
                <span class="status-tag" :class="order.status">
                  {{ statusText[order.status] }}
                </span>
              </td>
              <td>
                <button class="small" @click="viewOrder(order.id)">查看</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="section">
        <div class="section-title">购买偏好</div>
        <div class="preference-chart">
          <div v-for="(category, index) in customerPreferences" :key="index" class="preference-item">
            <div class="preference-info">
              <div class="preference-name">{{ category.name }}</div>
              <div class="preference-percent">{{ category.percent }}%</div>
            </div>
            <div class="preference-bar-container">
              <div class="preference-bar" :style="{ width: `${category.percent}%`, backgroundColor: category.color }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty">未找到该客户（静态示例）。</div>
    <div style="margin-top: 16px">
      <RouterLink to="/customers"><button class="ghost">返回客户列表</button></RouterLink>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const customerId = Number(route.params.id)

const statusText = {
  pending: '待付款',
  paid: '已付款',
  shipped: '已发货',
  completed: '已完成',
  cancelled: '已取消'
}

// 模拟客户数据
function getCustomerById(id) {
  const customerList = [
    { 
      id: 1, 
      name: '张三', 
      phone: '13800138001', 
      orderCount: 5, 
      totalSpent: 12500, 
      lastOrder: '2023-05-15T10:30:00',
      registerDate: '2023-01-10T08:15:00',
      address: '北京市朝阳区某小区1号楼1单元101',
      note: '喜欢苹果产品'
    },
    { 
      id: 2, 
      name: '李四', 
      phone: '13900139002', 
      orderCount: 3, 
      totalSpent: 8999, 
      lastOrder: '2023-05-10T14:20:00',
      registerDate: '2023-02-15T14:30:00',
      address: '上海市浦东新区某花园2号楼2单元202',
      note: ''
    },
    { 
      id: 3, 
      name: '王五', 
      phone: '13700137003', 
      orderCount: 8, 
      totalSpent: 15600, 
      lastOrder: '2023-05-18T09:15:00',
      registerDate: '2022-12-05T16:45:00',
      address: '广州市天河区某大厦3单元303',
      note: '经常批量购买'
    }
  ]
  return customerList.find(c => c.id === id)
}

// 模拟客户订单数据
const customerOrders = [
  { id: 'WX20230515001', date: '2023-05-15T10:30:00', total: 5999, status: 'completed' },
  { id: 'WX20230510002', date: '2023-05-10T14:20:00', total: 1999, status: 'shipped' },
  { id: 'WX20230505003', date: '2023-05-05T09:15:00', total: 899, status: 'completed' },
  { id: 'WX20230428004', date: '2023-04-28T16:45:00', total: 2799, status: 'completed' },
  { id: 'WX20230415005', date: '2023-04-15T11:10:00', total: 799, status: 'completed' },
]

// 客户购买偏好
const customerPreferences = [
  { name: '手机', percent: 48, color: '#3b82f6' },
  { name: '配件', percent: 27, color: '#10b981' },
  { name: '平板', percent: 15, color: '#f59e0b' },
  { name: '电脑', percent: 10, color: '#6366f1' },
]

const customer = computed(() => getCustomerById(customerId))

function formatDate(dateString) {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

function formatFullDate(dateString) {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

function isRecentCustomer(dateString) {
  const orderDate = new Date(dateString)
  const now = new Date()
  const diffTime = now - orderDate
  const diffDays = diffTime / (1000 * 60 * 60 * 24)
  return diffDays < 7 // 7天内下单的客户视为活跃客户
}

function getMembershipLevel(spent) {
  if (spent >= 15000) return '钻石会员'
  if (spent >= 10000) return '金牌会员'
  if (spent >= 5000) return '银牌会员'
  return '普通会员'
}

function editCustomer() {
  alert('编辑客户信息（静态演示）')
}

function viewOrder(id) {
  router.push(`/orders/${id}`)
}
</script>

<style scoped>
.customer-detail {
  margin-top: 16px;
}

.customer-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.avatar-large {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #eff6ff;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 32px;
}

.customer-info {
  flex: 1;
}

.customer-name {
  font-size: 20px;
  font-weight: 700;
}

.customer-tags {
  display: flex;
  gap: 8px;
  margin: 6px 0;
}

.tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.tag.vip {
  background-color: #fef3c7;
  color: #92400e;
}

.tag.recent {
  background-color: #dcfce7;
  color: #166534;
}

.customer-contact {
  color: var(--muted);
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-box {
  background: #f9fafb;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 16px;
  text-align: center;
}

.stat-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
}

.stat-label {
  font-size: 14px;
  color: var(--muted);
  margin-top: 4px;
}

.section {
  margin-bottom: 24px;
  border: 1px solid var(--border);
  border-radius: 10px;
  overflow: hidden;
}

.section-title {
  padding: 12px 16px;
  font-weight: 600;
  background-color: #f9fafb;
  border-bottom: 1px solid var(--border);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  padding: 16px;
}

.info-item .label {
  font-size: 13px;
  color: var(--muted);
  margin-bottom: 4px;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
}

.order-table th, .order-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.order-table th {
  font-weight: 600;
  color: var(--muted);
}

.order-id {
  font-family: monospace;
  font-weight: 600;
}

.price {
  font-weight: 600;
  color: var(--success);
}

.status-tag {
  display: inline-block;
  padding: 4px 8px;
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

button.small {
  padding: 4px 8px;
  font-size: 12px;
}

.preference-chart {
  padding: 16px;
}

.preference-item {
  margin-bottom: 12px;
}

.preference-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.preference-name {
  font-weight: 500;
}

.preference-percent {
  font-weight: 600;
}

.preference-bar-container {
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
}

.preference-bar {
  height: 100%;
  border-radius: 4px;
}

.empty {
  padding: 24px;
  text-align: center;
  color: #6b7280;
}
</style>