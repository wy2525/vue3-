<template>
  <section class="card">
    <div class="toolbar">
      <div class="row" style="gap:12px;">
        <h2 style="margin:0;">库存管理</h2>
        <span class="badge">共 {{ inventory.length }} 种商品</span>
      </div>
      <div class="row" style="gap:8px;">
        <input v-model.trim="keyword" placeholder="搜索商品名称" />
        <select v-model="stockFilter">
          <option value="all">全部库存</option>
          <option value="low">库存不足</option>
          <option value="out">缺货</option>
          <option value="normal">库存正常</option>
        </select>
      </div>
    </div>

    <div v-if="filteredInventory.length === 0" class="empty">暂无符合条件的商品</div>

    <table v-else class="inventory-table">
      <thead>
        <tr>
          <th>商品编号</th>
          <th>商品名称</th>
          <th>规格</th>
          <th>库存数量</th>
          <th>进货价</th>
          <th>零售价</th>
          <th>状态</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in filteredInventory" :key="item.id">
          <td class="product-id">{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.spec }}</td>
          <td :class="getStockClass(item.stock)">{{ item.stock }}</td>
          <td>￥{{ item.costPrice.toFixed(2) }}</td>
          <td class="price">￥{{ item.retailPrice.toFixed(2) }}</td>
          <td>
            <span class="status-tag" :class="getStatusClass(item.stock)">
              {{ getStatusText(item.stock) }}
            </span>
          </td>
          <td>
            <div class="action-buttons">
              <button class="small" @click="updateStock(item.id)">调整库存</button>
              <button class="small ghost" @click="editProduct(item.id)">编辑</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="toolbar" style="margin-top:20px;">
      <div class="row muted">快速入库</div>
      <div class="row" style="gap:8px;">
        <select v-model="selectedProductId">
          <option value="">选择商品</option>
          <option v-for="item in inventory" :key="item.id" :value="item.id">{{ item.name }} ({{ item.spec }})</option>
        </select>
        <input v-model.number="stockToAdd" type="number" min="1" placeholder="入库数量" />
        <button @click="addStock" :disabled="!selectedProductId || !stockToAdd">确认入库</button>
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

const keyword = ref('')
const stockFilter = ref('all')
const currentPage = ref(1)
const pageSize = 10
const selectedProductId = ref('')
const stockToAdd = ref(null)

// 模拟库存数据
const inventory = ref([
  { id: 'P001', name: 'iPhone 15', spec: '128GB 黑色', stock: 15, costPrice: 4800, retailPrice: 5999 },
  { id: 'P002', name: 'iPhone 15', spec: '256GB 白色', stock: 8, costPrice: 5500, retailPrice: 6799 },
  { id: 'P003', name: 'iPhone 15 Pro', spec: '256GB 原色钛金属', stock: 5, costPrice: 7200, retailPrice: 8999 },
  { id: 'P004', name: 'MacBook Air', spec: 'M2 8+256GB 深空灰', stock: 3, costPrice: 7200, retailPrice: 8999 },
  { id: 'P005', name: 'MacBook Air', spec: 'M2 8+512GB 银色', stock: 0, costPrice: 8500, retailPrice: 10499 },
  { id: 'P006', name: 'iPad Air', spec: '64GB WIFI版 蓝色', stock: 12, costPrice: 3800, retailPrice: 4799 },
  { id: 'P007', name: 'iPad Pro', spec: '128GB WIFI版 银色', stock: 6, costPrice: 5600, retailPrice: 6999 },
  { id: 'P008', name: 'AirPods Pro', spec: '第二代', stock: 20, costPrice: 1600, retailPrice: 1999 },
  { id: 'P009', name: 'Apple Watch SE', spec: '40mm GPS版', stock: 9, costPrice: 1800, retailPrice: 2299 },
  { id: 'P010', name: 'Apple Watch Series 8', spec: '45mm GPS版', stock: 4, costPrice: 2800, retailPrice: 3499 },
  { id: 'P011', name: 'Magic Mouse', spec: '白色', stock: 15, costPrice: 480, retailPrice: 599 },
  { id: 'P012', name: 'Magic Keyboard', spec: '带数字小键盘', stock: 7, costPrice: 800, retailPrice: 999 },
  { id: 'P013', name: 'Apple Pencil', spec: '第二代', stock: 0, costPrice: 720, retailPrice: 899 },
  { id: 'P014', name: 'iPhone 15 Pro Max', spec: '512GB 蓝钛色', stock: 2, costPrice: 9600, retailPrice: 11999 },
  { id: 'P015', name: 'HomePod mini', spec: '白色', stock: 10, costPrice: 640, retailPrice: 799 },
])

const filteredInventory = computed(() => {
  let result = inventory.value.filter(item => {
    const matchesKeyword = item.name.toLowerCase().includes(keyword.value.toLowerCase()) || 
                          item.spec.toLowerCase().includes(keyword.value.toLowerCase())
    
    let matchesStock = true
    if (stockFilter.value === 'low') {
      matchesStock = item.stock > 0 && item.stock <= 5
    } else if (stockFilter.value === 'out') {
      matchesStock = item.stock === 0
    } else if (stockFilter.value === 'normal') {
      matchesStock = item.stock > 5
    }
    
    return matchesKeyword && matchesStock
  })
  
  // 分页
  const startIndex = (currentPage.value - 1) * pageSize
  return result.slice(startIndex, startIndex + pageSize)
})

const totalPages = computed(() => {
  const filtered = inventory.value.filter(item => {
    const matchesKeyword = item.name.toLowerCase().includes(keyword.value.toLowerCase()) || 
                          item.spec.toLowerCase().includes(keyword.value.toLowerCase())
    
    let matchesStock = true
    if (stockFilter.value === 'low') {
      matchesStock = item.stock > 0 && item.stock <= 5
    } else if (stockFilter.value === 'out') {
      matchesStock = item.stock === 0
    } else if (stockFilter.value === 'normal') {
      matchesStock = item.stock > 5
    }
    
    return matchesKeyword && matchesStock
  })
  
  return Math.ceil(filtered.length / pageSize) || 1
})

function getStockClass(stock) {
  if (stock === 0) return 'stock-out'
  if (stock <= 5) return 'stock-low'
  return 'stock-normal'
}

function getStatusClass(stock) {
  if (stock === 0) return 'out'
  if (stock <= 5) return 'low'
  return 'normal'
}

function getStatusText(stock) {
  if (stock === 0) return '缺货'
  if (stock <= 5) return '库存不足'
  return '库存正常'
}

function updateStock(id) {
  const newStock = prompt('请输入新的库存数量：')
  if (newStock !== null && !isNaN(Number(newStock))) {
    const item = inventory.value.find(item => item.id === id)
    if (item) {
      item.stock = Number(newStock)
    }
  }
}

function editProduct(id) {
  alert(`编辑商品 ID: ${id}（静态演示）`)
}

function addStock() {
  if (!selectedProductId.value || !stockToAdd.value) return
  
  const item = inventory.value.find(item => item.id === selectedProductId.value)
  if (item) {
    item.stock += stockToAdd.value
    alert(`已成功入库 ${stockToAdd.value} 件 ${item.name}（${item.spec}）`)
    selectedProductId.value = ''
    stockToAdd.value = null
  }
}
</script>

<style scoped>
.inventory-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  font-size: 14px;
}

.inventory-table th, .inventory-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border);
}

.inventory-table th {
  font-weight: 600;
  color: var(--muted);
  background-color: #f9fafb;
}

.product-id {
  font-family: monospace;
  font-weight: 600;
}

.price {
  font-weight: 600;
  color: var(--success);
}

.stock-out {
  color: var(--danger);
  font-weight: 600;
}

.stock-low {
  color: #f59e0b;
  font-weight: 600;
}

.stock-normal {
  color: var(--success);
}

.status-tag {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.status-tag.out {
  background-color: #fee2e2;
  color: #b91c1c;
}

.status-tag.low {
  background-color: #fef3c7;
  color: #92400e;
}

.status-tag.normal {
  background-color: #d1fae5;
  color: #065f46;
}

.action-buttons {
  display: flex;
  gap: 6px;
}

button.small {
  padding: 4px 8px;
  font-size: 12px;
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