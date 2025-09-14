<template>
  <section class="card">
    <div class="toolbar">
      <div class="row" style="gap:12px;">
        <h2 style="margin:0;">订单管理</h2>
        <span class="badge">共 {{ orders.length }} 笔</span>
      </div>
      <div class="row" style="gap:8px;">
        <input v-model.trim="keyword" placeholder="搜索订单号/客户" />
        <select v-model="statusFilter">
          <option value="all">全部状态</option>
          <option value="pending">待付款</option>
          <option value="paid">已付款</option>
          <option value="shipped">已发货</option>
          <option value="completed">已完成</option>
          <option value="cancelled">已取消</option>
        </select>
      </div>
    </div>

    <div v-if="filteredOrders.length === 0" class="empty">暂无符合条件的订单</div>

    <table v-else class="order-table">
      <thead>
        <tr>
          <th>订单号</th>
          <th>客户</th>
          <th>金额</th>
          <th>商品数量</th>
          <th>下单时间</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in filteredOrders" :key="order.id">
          <td class="order-id">{{ order.id }}</td>
          <td>{{ order.customer }}</td>
          <td class="price">￥{{ order.total.toFixed(2) }}</td>
          <td>{{ order.items }} 件</td>
          <td>{{ formatDate(order.date) }}</td>
          <td>
            <span class="status-tag" :class="order.status">
              {{ statusText[order.status] }}
            </span>
          </td>
          <td>
            <div class="action-buttons">
              <button class="small" @click="viewOrder(order.id)">查看</button>
              <button v-if="order.status === 'paid'" class="small success" @click="shipOrder(order.id)">发货</button>
              <button v-if="order.status === 'pending'" class="small danger" @click="cancelOrder(order.id)">取消</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

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
const statusFilter = ref('all')
const currentPage = ref(1)
const pageSize = 10

const statusText = {
  pending: '待付款',
  paid: '已付款',
  shipped: '已发货',
  completed: '已完成',
  cancelled: '已取消'
}

// 模拟订单数据
const orders = ref([
  { id: 'WX20230501001', customer: '张三', total: 299, items: 2, date: '2023-05-01T10:30:00', status: 'completed' },
  { id: 'WX20230502002', customer: '李四', total: 599, items: 1, date: '2023-05-02T14:20:00', status: 'shipped' },
  { id: 'WX20230503003', customer: '王五', total: 1299, items: 3, date: '2023-05-03T09:15:00', status: 'paid' },
  { id: 'WX20230504004', customer: '赵六', total: 899, items: 2, date: '2023-05-04T16:45:00', status: 'pending' },
  { id: 'WX20230505005', customer: '孙七', total: 499, items: 1, date: '2023-05-05T11:10:00', status: 'cancelled' },
  { id: 'WX20230506006', customer: '周八', total: 799, items: 2, date: '2023-05-06T13:25:00', status: 'completed' },
  { id: 'WX20230507007', customer: '吴九', total: 1599, items: 4, date: '2023-05-07T15:30:00', status: 'shipped' },
  { id: 'WX20230508008', customer: '郑十', total: 399, items: 1, date: '2023-05-08T10:05:00', status: 'paid' },
  { id: 'WX20230509009', customer: '冯一', total: 699, items: 2, date: '2023-05-09T17:20:00', status: 'pending' },
  { id: 'WX20230510010', customer: '陈二', total: 899, items: 3, date: '2023-05-10T12:40:00', status: 'completed' },
  { id: 'WX20230511011', customer: '楚三', total: 1099, items: 2, date: '2023-05-11T09:50:00', status: 'shipped' },
  { id: 'WX20230512012', customer: '魏四', total: 599, items: 1, date: '2023-05-12T14:15:00', status: 'paid' },
  { id: 'WX20230513013', customer: '蒋五', total: 799, items: 2, date: '2023-05-13T16:30:00', status: 'pending' },
  { id: 'WX20230514014', customer: '沈六', total: 499, items: 1, date: '2023-05-14T11:25:00', status: 'cancelled' },
  { id: 'WX20230515015', customer: '韩七', total: 1299, items: 3, date: '2023-05-15T13:10:00', status: 'completed' },
])

const filteredOrders = computed(() => {
  let result = orders.value.filter(order => {
    const matchesKeyword = order.id.toLowerCase().includes(keyword.value.toLowerCase()) || 
                          order.customer.toLowerCase().includes(keyword.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || order.status === statusFilter.value
    return matchesKeyword && matchesStatus
  })
  
  // 分页
  const startIndex = (currentPage.value - 1) * pageSize
  return result.slice(startIndex, startIndex + pageSize)
})

const totalPages = computed(() => {
  const filtered = orders.value.filter(order => {
    const matchesKeyword = order.id.toLowerCase().includes(keyword.value.toLowerCase()) || 
                          order.customer.toLowerCase().includes(keyword.value.toLowerCase())
    const matchesStatus = statusFilter.value === 'all' || order.status === statusFilter.value
    return matchesKeyword && matchesStatus
  })
  return Math.ceil(filtered.length / pageSize) || 1
})

function formatDate(dateString) {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

function viewOrder(id) {
  router.push(`/orders/${id}`)
}

function shipOrder(id) {
  const order = orders.value.find(o => o.id === id)
  if (order) {
    order.status = 'shipped'
  }
}

function cancelOrder(id) {
  const order = orders.value.find(o => o.id === id)
  if (order) {
    order.status = 'cancelled'
  }
}
</script>

<style scoped>
.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  font-size: 14px;
}

.order-table th, .order-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.order-table th {
  font-weight: 600;
  color: var(--muted);
  background-color: #f9fafb;
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

.action-buttons {
  display: flex;
  gap: 6px;
}

button.small {
  padding: 4px 8px;
  font-size: 12px;
}

button.success {
  background-color: var(--success);
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}

.empty {
  padding: 24px;
  text-align: center;
  color: #6b7280;
}
</style>