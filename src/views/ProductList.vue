<template>
  <section class="card">
    <div class="toolbar">
      <div class="row" style="gap:12px;">
        <h2 style="margin:0;">商品列表</h2>
        <span class="badge">共 {{ products.length }} 件</span>
      </div>
      <div class="row" style="gap:8px;">
        <input v-model.trim="keyword" placeholder="搜索商品名称" />
        <select v-model="sortKey">
          <option value="default">默认排序</option>
          <option value="priceAsc">价格：低到高</option>
          <option value="priceDesc">价格：高到低</option>
          <option value="nameAsc">名称：A-Z</option>
        </select>
      </div>
    </div>

    <div class="toolbar" style="margin-top:12px;">
      <div class="row muted">新增商品</div>
      <div class="row" style="gap:8px;">
        <input v-model.trim="newName" placeholder="商品名称" />
        <input v-model.number="newPrice" type="number" placeholder="价格" />
        <button @click="addProduct">新增</button>
      </div>
    </div>

    <div v-if="filteredAndSorted.length === 0" class="empty">暂无商品，添加一个试试～</div>

    <ul class="grid">
      <li v-for="p in filteredAndSorted" :key="p.id" class="item">
        <div class="info" @click="goDetail(p.id)">
          <div class="thumb">{{ p.name.slice(0,1) }}</div>
          <div>
            <div class="name">{{ p.name }}</div>
            <div class="price">￥{{ p.price.toFixed(2) }}</div>
          </div>
        </div>
        <div class="actions">
          <button class="danger" @click="remove(p.id)">删除</button>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

let idCounter = 1003
const products = ref([
  { id: 1001, name: 'iPhone 15', price: 5999 },
  { id: 1002, name: 'MacBook Air', price: 8999 },
])

const newName = ref('')
const newPrice = ref()
const keyword = ref('')
const sortKey = ref('default')

function addProduct() {
  if (!newName.value || !Number.isFinite(Number(newPrice.value))) return
  products.value.unshift({ id: ++idCounter, name: newName.value, price: Number(newPrice.value) })
  newName.value = ''
  newPrice.value = ''
}

function remove(id) {
  products.value = products.value.filter(p => p.id !== id)
}

function goDetail(id) {
  router.push(`/products/${id}`)
}

const filteredAndSorted = computed(() => {
  let list = products.value.filter(p => p.name.toLowerCase().includes(keyword.value.toLowerCase()))
  if (sortKey.value === 'priceAsc') list = [...list].sort((a,b)=>a.price-b.price)
  if (sortKey.value === 'priceDesc') list = [...list].sort((a,b)=>b.price-a.price)
  if (sortKey.value === 'nameAsc') list = [...list].sort((a,b)=>a.name.localeCompare(b.name))
  return list
})
</script>

<style scoped>
.grid { list-style: none; padding: 0; margin: 16px 0 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
.item { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px; border: 1px solid var(--border); border-radius: 14px; background: #fff; }
.info { display: flex; align-items: center; gap: 12px; cursor: pointer; }
.thumb { width: 48px; height: 48px; border-radius: 12px; background: #eff6ff; color: #3b82f6; display:flex; align-items:center; justify-content:center; font-weight: 800; }
.name { font-weight: 600; }
.price { color: var(--success); font-weight: 700; }
.danger { background: var(--danger); }
.empty { padding: 24px; text-align: center; color: #6b7280; }
</style>
