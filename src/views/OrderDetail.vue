<template>
  <section class="card">
    <div class="toolbar">
      <h2 style="margin:0;">订单详情</h2>
      <span v-if="order" class="badge">{{ order.id }}</span>
    </div>

    <div v-if="order" class="order-detail">
      <div class="section">
        <div class="section-title">基本信息</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="label">订单状态</div>
            <div>
              <span class="status-tag" :class="order.status">
                {{ statusText[order.status] }}
              </span>
            </div>
          </div>
          <div class="info-item">
            <div class="label">下单时间</div>
            <div>{{ formatDate(order.date) }}</div>
          </div>
          <div class="info-item">
            <div class="label">支付方式</div>
            <div>{{ order.paymentMethod }}</div>
          </div>
          <div class="info-item">
            <div class="label">订单备注</div>
            <div>{{ order.note || '无' }}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">客户信息</div>
        <div class="info-grid">
          <div class="info-item">
            <div class="label">客户姓名</div>
            <div>{{ order.customer }}</div>
          </div>
          <div class="info-item">
            <div class="label">联系电话</div>
            <div>{{ order.phone }}</div>
          </div>
          <div class="info-item">
            <div class="label">收货地址</div>
            <div>{{ order.address }}</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">商品信息</div>
        <table class="product-table">
          <thead>
            <tr>
              <th>商品名称</th>
              <th>单价</th>
              <th>数量</th>
              <th>小计</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in order.products" :key="index">
              <td>{{ item.name }}</td>
              <td>￥{{ item.price.toFixed(2) }}</td>
              <td>{{ item.quantity }}</td>
              <td class="price">￥{{ (item.price * item.quantity).toFixed(2) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">商品总额</td>
              <td class="price">￥{{ order.subtotal.toFixed(2) }}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-right">运费</td>
              <td>￥{{ order.shipping.toFixed(2) }}</td>
            </tr>
            <tr>
              <td colspan="3" class="text-right">订单总额</td>
              <td class="price total">￥{{ order.total.toFixed(2) }}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="section">
        <div class="section-title">物流信息</div>
        <div v-if="order.tracking" class="info-grid">
          <div class="info-item">
            <div class="label">快递公司</div>
            <div>{{ order.tracking.company }}</div>
          </div>
          <div class="info-item">
            <div class="label">快递单号</div>
            <div>{{ order.tracking.number }}</div>
          </div>
          <div class="info-item">
            <div class="label">发货时间</div>
            <div>{{ order.tracking.shippedDate ? formatDate(order.tracking.shippedDate) : '未发货' }}</div>
          </div>
        </div>
        <div v-else class="empty-tracking">暂无物流信息</div>
      </div>

      <div class="action-bar">
        <button v-if="order.status === 'pending'" class="danger" @click="cancelOrder">取消订单</button>
        <button v-if="order.status === 'paid'" @click="shipOrder">确认发货</button>
        <button v-if="order.status === 'shipped'" class="success" @click="completeOrder">确认收货</button>
        <button class="ghost" @click="goBack">返回列表</button>
      </div>
    </div>
    <div v-else class="empty">未找到该订单（静态示例）。</div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const orderId = route.params.id

const statusText = {
  pending: '待付款',
  paid: '已付款',
  shipped: '已发货',
  completed: '已完成',
  cancelled: '已取消'
}

// 模拟订单数据
function getOrderById(id) {
  const orderList = [
    {
      id: 'WX20230501001',
      customer: '张三',
      phone: '13800138001',
      address: '北京市朝阳区某小区1号楼1单元101',
      date: '2023-05-01T10:30:00',
      status: 'completed',
      paymentMethod: '微信支付',
      note: '请尽快发货',
      products: [
        { name: 'iPhone 15', price: 5999, quantity: 1 },
        { name: '手机壳', price: 99, quantity: 2 }
      ],
      subtotal: 6197,
      shipping: 10,
      total: 6207,
      tracking: {
        company: '顺丰速运',
        number: 'SF1234567890',
        shippedDate: '2023-05-01T14:30:00'
      }
    },
    {
      id: 'WX20230502002',
      customer: '李四',
      phone: '13900139002',
      address: '上海市浦东新区某花园2号楼2单元202',
      date: '2023-05-02T14:20:00',
      status: 'shipped',
      paymentMethod: '支付宝',
      note: '',
      products: [
        { name: 'MacBook Air', price: 8999, quantity: 1 }
      ],
      subtotal: 8999,
      shipping: 0,
      total: 8999,
      tracking: {
        company: '中通快递',
        number: 'ZT9876543210',
        shippedDate: '2023-05-03T09:15:00'
      }
    },
    {
      id: 'WX20230503003',
      customer: '王五',
      phone: '13700137003',
      address: '广州市天河区某大厦3单元303',
      date: '2023-05-03T09:15:00',
      status: 'paid',
      paymentMethod: '微信支付',
      note: '周末送货',
      products: [
        { name: 'AirPods Pro', price: 1999, quantity: 1 },
        { name: 'iPad Mini', price: 3799, quantity: 1 },
        { name: 'Apple Pencil', price: 899, quantity: 1 }
      ],
      subtotal: 6697,
      shipping: 15,
      total: 6712,
      tracking: null
    }
  ]
  return orderList.find(o => o.id === id)
}

const order = computed(() => getOrderById(orderId))

function formatDate(dateString) {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
}

function goBack() {
  router.push('/orders')
}

function cancelOrder() {
  alert('订单已取消（静态演示）')
  router.push('/orders')
}

function shipOrder() {
  alert('已确认发货（静态演示）')
  router.push('/orders')
}

function completeOrder() {
  alert('已确认收货（静态演示）')
  router.push('/orders')
}
</script>

<style scoped>
.order-detail {
  margin-top: 16px;
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

.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th, .product-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.product-table th {
  font-weight: 600;
  color: var(--muted);
}

.product-table tfoot td {
  font-weight: 600;
}

.text-right {
  text-align: right;
}

.price {
  font-weight: 600;
  color: var(--success);
}

.price.total {
  font-size: 16px;
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

.empty-tracking {
  padding: 16px;
  color: var(--muted);
}

.action-bar {
  display: flex;
  gap: 10px;
  margin-top: 24px;
}

.empty {
  padding: 24px;
  text-align: center;
  color: #6b7280;
}
</style>