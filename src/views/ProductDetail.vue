<template>
  <section class="card">
    <div class="toolbar">
      <h2 style="margin:0;">商品详情</h2>
      <span v-if="product" class="badge">编号 #{{ product.id }}</span>
    </div>

    <div v-if="product" class="detail">
      <div class="thumb">{{ product.name.slice(0,1) }}</div>
      <div class="meta">
        <div class="name">{{ product.name }}</div>
        <div class="price">￥{{ product.price.toFixed(2) }}</div>
        <div class="muted">本页为静态演示，详情数据来源于本地示例集。</div>
      </div>
    </div>
    <div v-else class="muted">未找到该商品（静态示例）。</div>
    <div style="margin-top: 12px">
      <RouterLink to="/products"><button class="ghost">返回列表</button></RouterLink>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = Number(route.params.id)

function getProductById(pid) {
  const list = [
    { id: 1001, name: 'iPhone 15', price: 5999 },
    { id: 1002, name: 'MacBook Air', price: 8999 },
  ]
  return list.find(p => p.id === pid)
}

const product = computed(() => getProductById(id))
</script>

<style scoped>
.detail { display: flex; align-items: center; gap: 14px; margin-top: 12px; }
.thumb { width: 72px; height: 72px; border-radius: 16px; background: #eff6ff; color: #3b82f6; display:flex; align-items:center; justify-content:center; font-weight: 900; font-size: 24px; }
.meta .name { font-size: 18px; font-weight: 800; }
.meta .price { color: var(--success); font-weight: 800; margin: 8px 0; }
</style>
