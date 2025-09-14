<template>
  <div class="app">
    <div class="layout">
      <SideBar />
      <main class="content">
        <div class="container">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import SideBar from './components/SideBar.vue'
</script>

<style>
.app {
  min-height: 100vh;
  background: #f6f7fb;
}
.layout { display: flex; min-height: 100vh; }
.content { flex: 1; }
.container { width: min(1200px, 96%); margin: 24px auto; }
</style>
