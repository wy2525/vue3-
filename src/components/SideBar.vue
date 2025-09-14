<template>
  <aside class="sidebar">
    <div class="brand">🛒 商品后台</div>
    <nav class="menu">
      <RouterLink to="/" class="item" :class="{ active: isActive('/') }">
        <span>🏠</span>
        <span>首页</span>
      </RouterLink>
      <RouterLink to="/products" class="item" :class="{ active: isActive('/products') }">
        <span>📦</span>
        <span>商品列表</span>
      </RouterLink>
      <RouterLink to="/orders" class="item" :class="{ active: isActive('/orders') }">
        <span>🧾</span>
        <span>订单管理</span>
      </RouterLink>
      <RouterLink to="/customers" class="item" :class="{ active: isActive('/customers') }">
        <span>👥</span>
        <span>客户管理</span>
      </RouterLink>
      <RouterLink to="/inventory" class="item" :class="{ active: isActive('/inventory') }">
        <span>🏭</span>
        <span>库存管理</span>
      </RouterLink>
      <RouterLink to="/statistics" class="item" :class="{ active: isActive('/statistics') }">
        <span>📊</span>
        <span>数据统计</span>
      </RouterLink>
      <RouterLink to="/settings" class="item" :class="{ active: isActive('/settings') }">
        <span>⚙️</span>
        <span>系统设置</span>
      </RouterLink>
    </nav>
    <div class="spacer" />
    <button v-if="authed" class="logout" @click="logout">退出登录</button>
    <RouterLink v-else to="/login" class="login-link">登录</RouterLink>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authed = computed(() => !!localStorage.getItem('token'))

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 220px;
  padding: 16px;
  background: #0f172a; /* slate-900 */
  color: #e5e7eb; /* gray-200 */
  border-right: 1px solid #1f2937;
}
.brand { font-weight: 800; margin-bottom: 16px; }
.menu { display: grid; gap: 6px; }
.item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; color: #cbd5e1; }
.item:hover { background: #111827; }
.active { background: #1f2937; color: #ffffff; }
.spacer { flex: 1; }
.logout { width: 100%; background: #ef4444; border: none; padding: 10px 12px; border-radius: 10px; color: #fff; }
.login-link { display:block; text-align:center; padding: 10px 12px; border-radius: 10px; background: #2563eb; color: #fff; }
</style>
