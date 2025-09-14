<template>
  <header class="navbar">
    <div class="wrap">
      <div class="brand" @click="$router.push('/')">🛒 商品后台管理</div>
      <nav class="links" v-if="authed">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/products">商品列表</RouterLink>
        <button class="link" @click="logout">退出登录</button>
      </nav>
      <nav class="links" v-else>
        <RouterLink to="/login">登录</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authed = computed(() => !!localStorage.getItem('token'))

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #ffffffcc;
  backdrop-filter: saturate(180%) blur(10px);
  border-bottom: 1px solid #e5e7eb;
}
.wrap { width: min(1100px, 94%); margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 12px 0; }
.brand { font-weight: 700; cursor: pointer; }
.links { display: flex; align-items: center; gap: 14px; }
.link { background: transparent; color: #1f2937; border: 1px solid #e5e7eb; padding: 6px 10px; }
</style>
