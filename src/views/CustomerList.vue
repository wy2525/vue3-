<template>
  <section class="card">
    <div class="toolbar">
      <div class="row" style="gap:12px;">
        <h2 style="margin:0;">客户管理</h2>
        <span class="badge">共 {{ customers.length }} 位</span>
      </div>
      <div class="row" style="gap:8px;">
        <input v-model.trim="keyword" placeholder="搜索客户姓名/手机号" />
        <select v-model="sortBy">
          <option value="default">默认排序</option>
          <option value="nameAsc">姓名 A-Z</option>
          <option value="orderCount">订单数量</option>
          <option value="totalSpent">消费金额</option>
          <option value="recent">最近下单</option>
        </select>
      </div>
    </div>

    <div class="toolbar" style="margin-top:12px;">
      <div class="row muted">新增客户</div>
      <div class="row" style="gap:8px;">
        <input v-model.trim="newCustomer.name" placeholder="客户姓名" />
        <input v-model.trim="newCustomer.phone" placeholder="手机号码" />
        <button @click="addCustomer">新增</button>
      </div>
    </div>

    <div v-if="filteredCustomers.length === 0" class="empty">暂无客户数据</div>

    <div v-else class="customer-grid">
      <div v-for="customer in filteredCustomers" :key="customer.id" class="customer-card">
        <div class="customer-header">
          <div class="avatar">{{ customer.name.slice(0, 1) }}</div>
          <div class="customer-info">
            <div class="customer-name">{{ customer.name }}</div>
            <div class="customer-phone">{{ customer.phone }}</div>
          </div>
          <div class="customer-tags">
            <span v-if="customer.totalSpent > 10000" class="tag vip">VIP</span>
            <span v-if="isRecentCustomer(customer.lastOrder)" class="tag recent">活跃</span>
          </div>
        </div>
        <div class="customer-stats">
          <div class="stat-item">
            <div class="stat-value">{{ customer.orderCount }}</div>
            <div class="stat-label">订单数</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">￥{{ customer.totalSpent.toFixed(0) }}</div>
            <div class="stat-label">总消费</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ formatDate(customer.lastOrder) }}</div>
            <div class="stat-label">最近下单</div>
          </div>
        </div>
        <div class="customer-actions">
          <button class="small" @click="viewCustomer(customer.id)">查看详情</button>
          <button class="small ghost" @click="editCustomer(customer.id)">编辑</button>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button class="ghost small" :disabled="currentPage === 1" @click="currentPage--">上一页</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button class="ghost small" :disabled="currentPage === totalPages" @click="currentPage++">下一页</button>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const keyword = ref('')
const sortBy = ref('default')
const currentPage = ref(1)
const pageSize = 8

const newCustomer = ref({
  name: '',
  phone: ''
})

// 模拟客户数据
const customers = ref([
  { id: 1, name: '张三', phone: '13800138001', orderCount: 5, totalSpent: 12500, lastOrder: '2023-05-15T10:30:00' },
  { id: 2, name: '李四', phone: '13900139002', orderCount: 3, totalSpent: 8999, lastOrder: '2023-05-10T14:20:00' },
  { id: 3, name: '王五', phone: '13700137003', orderCount: 8, totalSpent: 15600, lastOrder: '2023-05-18T09:15:00' },
  { id: 4, name: '赵六', phone: '13600136004', orderCount: 2, totalSpent: 3500, lastOrder: '2023-04-25T16:45:00' },
  { id: 5, name: '孙七', phone: '13500135005', orderCount: 1, totalSpent: 1299, lastOrder: '2023-04-20T11:10:00' },
  { id: 6, name: '周八', phone: '13400134006', orderCount: 4, totalSpent: 9800, lastOrder: '2023-05-12T13:25:00' },
  { id: 7, name: '吴九', phone: '13300133007', orderCount: 6, totalSpent: 13200, lastOrder: '2023-05-16T15:30:00' },
  { id: 8, name: '郑十', phone: '13200132008', orderCount: 2, totalSpent: 4500, lastOrder: '2023-05-05T10:05:00' },
  { id: 9, name: '冯一', phone: '13100131009', orderCount: 3, totalSpent: 7200, lastOrder: '2023-05-08T17:20:00' },
  { id: 10, name: '陈二', phone: '13000130010', orderCount: 7, totalSpent: 16800, lastOrder: '2023-05-17T12:40:00' },
  { id: 11, name: '楚三', phone: '12900129011', orderCount: 4, totalSpent: 8900, lastOrder: '2023-05-14T09:50:00' },
  { id: 12, name: '魏四', phone: '12800128012', orderCount: 2, totalSpent: 3600, lastOrder: '2023-04-30T14:15:00' },
])

const filteredCustomers = computed(() => {
  let result = customers.value.filter(customer => {
    return customer.name.toLowerCase().includes(keyword.value.toLowerCase()) || 
           customer.phone.includes(keyword.value)
  })
  
  // 排序
  if (sortBy.value === 'nameAsc') {
    result = [...result].sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'orderCount') {
    result = [...result].sort((a, b) => b.orderCount - a.orderCount)
  } else if (sortBy.value === 'totalSpent') {
    result = [...result].sort((a, b) => b.totalSpent - a.totalSpent)
  } else if (sortBy.value === 'recent') {
    result = [...result].sort((a, b) => new Date(b.lastOrder) - new Date(a.lastOrder))
  }
  
  // 分页
  const startIndex = (currentPage.value - 1) * pageSize
  return result.slice(startIndex, startIndex + pageSize)
})

const totalPages = computed(() => {
  const filtered = customers.value.filter(customer => {
    return customer.name.toLowerCase().includes(keyword.value.toLowerCase()) || 
           customer.phone.includes(keyword.value)
  })
  return Math.ceil(filtered.length / pageSize) || 1
})

function formatDate(dateString) {
  const date = new Date(dateString)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

function isRecentCustomer(dateString) {
  const orderDate = new Date(dateString)
  const now = new Date()
  const diffTime = now - orderDate
  const diffDays = diffTime / (1000 * 60 * 60 * 24)
  return diffDays < 7 // 7天内下单的客户视为活跃客户
}

function addCustomer() {
  if (!newCustomer.value.name || !newCustomer.value.phone) return
  
  const id = Math.max(...customers.value.map(c => c.id)) + 1
  customers.value.unshift({
    id,
    name: newCustomer.value.name,
    phone: newCustomer.value.phone,
    orderCount: 0,
    totalSpent: 0,
    lastOrder: new Date().toISOString()
  })
  
  newCustomer.value.name = ''
  newCustomer.value.phone = ''
}

function viewCustomer(id) {
  router.push(`/customers/${id}`)
}

function editCustomer(id) {
  alert(`编辑客户 ID: ${id}（静态演示）`)
}
</script>

<style scoped>
.customer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.customer-card {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  background: #fff;
}

.customer-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #eff6ff;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 18px;
}

.customer-info {
  flex: 1;
}

.customer-name {
  font-weight: 600;
  font-size: 16px;
}

.customer-phone {
  color: var(--muted);
  font-size: 14px;
  margin-top: 2px;
}

.customer-tags {
  display: flex;
  gap: 6px;
}

.tag {
  padding: 2px 6px;
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

.customer-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
  padding: 8px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-weight: 700;
  color: var(--primary);
}

.stat-label {
  font-size: 12px;
  color: var(--muted);
  margin-top: 2px;
}

.customer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}

button.small {
  padding: 6px 10px;
  font-size: 13px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.empty {
  padding: 24px;
  text-align: center;
  color: #6b7280;
}
</style>