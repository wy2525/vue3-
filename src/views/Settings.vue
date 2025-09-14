<template>
  <div>
    <section class="card">
      <h2>个人设置</h2>
      <div class="settings-section">
        <div class="profile-header">
          <div class="avatar-large">{{ userInfo.name.slice(0, 1) }}</div>
          <div class="profile-info">
            <div class="profile-name">{{ userInfo.name }}</div>
            <div class="profile-role">{{ userInfo.role }}</div>
            <div class="profile-since">注册时间：{{ formatDate(userInfo.since) }}</div>
          </div>
        </div>
        
        <form class="settings-form" @submit.prevent="saveProfile">
          <div class="form-group">
            <label>用户名</label>
            <input v-model="userInfo.name" placeholder="请输入用户名" />
          </div>
          <div class="form-group">
            <label>联系电话</label>
            <input v-model="userInfo.phone" placeholder="请输入联系电话" />
          </div>
          <div class="form-group">
            <label>电子邮箱</label>
            <input v-model="userInfo.email" placeholder="请输入电子邮箱" />
          </div>
          <div class="form-actions">
            <button type="submit">保存修改</button>
          </div>
        </form>
      </div>
    </section>

    <section class="card">
      <h2>店铺设置</h2>
      <div class="settings-section">
        <form class="settings-form" @submit.prevent="saveShopSettings">
          <div class="form-group">
            <label>店铺名称</label>
            <input v-model="shopSettings.name" placeholder="请输入店铺名称" />
          </div>
          <div class="form-group">
            <label>店铺简介</label>
            <textarea v-model="shopSettings.description" placeholder="请输入店铺简介" rows="3"></textarea>
          </div>
          <div class="form-group">
            <label>联系方式</label>
            <input v-model="shopSettings.contact" placeholder="请输入联系方式" />
          </div>
          <div class="form-group">
            <label>发货地址</label>
            <input v-model="shopSettings.address" placeholder="请输入发货地址" />
          </div>
          <div class="form-actions">
            <button type="submit">保存设置</button>
          </div>
        </form>
      </div>
    </section>

    <section class="card">
      <h2>系统设置</h2>
      <div class="settings-section">
        <div class="settings-list">
          <div class="settings-item">
            <div class="settings-item-info">
              <div class="settings-item-title">订单自动确认</div>
              <div class="settings-item-desc">付款后自动将订单状态更改为已确认</div>
            </div>
            <div class="toggle-switch">
              <input type="checkbox" id="auto-confirm" v-model="systemSettings.autoConfirm" />
              <label for="auto-confirm"></label>
            </div>
          </div>
          
          <div class="settings-item">
            <div class="settings-item-info">
              <div class="settings-item-title">库存预警</div>
              <div class="settings-item-desc">当商品库存低于阈值时发送通知</div>
            </div>
            <div class="toggle-switch">
              <input type="checkbox" id="stock-alert" v-model="systemSettings.stockAlert" />
              <label for="stock-alert"></label>
            </div>
          </div>
          
          <div class="settings-item">
            <div class="settings-item-info">
              <div class="settings-item-title">新订单通知</div>
              <div class="settings-item-desc">有新订单时发送通知</div>
            </div>
            <div class="toggle-switch">
              <input type="checkbox" id="order-notification" v-model="systemSettings.orderNotification" />
              <label for="order-notification"></label>
            </div>
          </div>
          
          <div class="settings-item">
            <div class="settings-item-info">
              <div class="settings-item-title">库存阈值</div>
              <div class="settings-item-desc">设置库存预警的阈值</div>
            </div>
            <div class="settings-input">
              <input type="number" v-model="systemSettings.stockThreshold" min="1" max="100" />
            </div>
          </div>
        </div>
        
        <div class="form-actions">
          <button @click="saveSystemSettings">保存设置</button>
        </div>
      </div>
    </section>

    <section class="card">
      <h2>安全设置</h2>
      <div class="settings-section">
        <form class="settings-form" @submit.prevent="changePassword">
          <div class="form-group">
            <label>当前密码</label>
            <input type="password" v-model="passwordForm.current" placeholder="请输入当前密码" />
          </div>
          <div class="form-group">
            <label>新密码</label>
            <input type="password" v-model="passwordForm.new" placeholder="请输入新密码" />
          </div>
          <div class="form-group">
            <label>确认新密码</label>
            <input type="password" v-model="passwordForm.confirm" placeholder="请再次输入新密码" />
          </div>
          <div class="form-actions">
            <button type="submit">修改密码</button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 用户信息
const userInfo = ref({
  name: '微商店主',
  role: '店铺管理员',
  phone: '13800138000',
  email: 'shop@example.com',
  since: '2023-01-15T10:30:00'
})

// 店铺设置
const shopSettings = ref({
  name: '优品微商城',
  description: '专注优质商品，提供一站式购物体验',
  contact: '13800138000',
  address: '广东省广州市天河区某某路88号'
})

// 系统设置
const systemSettings = ref({
  autoConfirm: true,
  stockAlert: true,
  orderNotification: true,
  stockThreshold: 5
})

// 密码表单
const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

function formatDate(dateString) {
  const date = new Date(dateString)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function saveProfile() {
  alert('个人信息已保存（静态演示）')
}

function saveShopSettings() {
  alert('店铺设置已保存（静态演示）')
}

function saveSystemSettings() {
  alert('系统设置已保存（静态演示）')
}

function changePassword() {
  if (!passwordForm.value.current || !passwordForm.value.new || !passwordForm.value.confirm) {
    alert('请填写完整密码信息')
    return
  }
  
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    alert('两次输入的新密码不一致')
    return
  }
  
  alert('密码修改成功（静态演示）')
  passwordForm.value = {
    current: '',
    new: '',
    confirm: ''
  }
}
</script>

<style scoped>
h2 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
}

.settings-section {
  margin-bottom: 16px;
}

.profile-header {
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

.profile-name {
  font-size: 18px;
  font-weight: 600;
}

.profile-role {
  color: var(--primary);
  font-weight: 500;
  margin: 4px 0;
}

.profile-since {
  font-size: 14px;
  color: var(--muted);
}

.settings-form {
  display: grid;
  gap: 16px;
}

.form-group {
  display: grid;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
}

.form-actions {
  margin-top: 8px;
  display: flex;
  justify-content: flex-end;
}

textarea {
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  outline: none;
  resize: vertical;
  font-family: inherit;
}

.settings-list {
  display: grid;
  gap: 16px;
}

.settings-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
}

.settings-item:last-child {
  border-bottom: none;
}

.settings-item-title {
  font-weight: 500;
}

.settings-item-desc {
  font-size: 14px;
  color: var(--muted);
  margin-top: 2px;
}

.toggle-switch {
  position: relative;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-switch label {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.toggle-switch label:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

.toggle-switch input:checked + label {
  background-color: var(--primary);
}

.toggle-switch input:checked + label:before {
  transform: translateX(26px);
}

.settings-input input {
  width: 60px;
  text-align: center;
}

.card {
  margin-bottom: 16px;
}

.card:last-child {
  margin-bottom: 0;
}
</style>