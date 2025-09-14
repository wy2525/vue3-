<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <div class="logo">
          <span class="logo-icon">📱</span>
          <span class="logo-text">微商管家</span>
        </div>
        <h1 class="title">欢迎回来</h1>
        <p class="subtitle">登录您的账号以继续使用微商管理系统</p>
      </div>
      
      <form @submit.prevent="onSubmit" class="login-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <div class="input-with-icon">
            <span class="input-icon">👤</span>
            <input 
              id="username"
              v-model.trim="username" 
              placeholder="请输入用户名" 
              required 
              autocomplete="username"
              :class="{ 'has-value': username }"
            />
          </div>
        </div>
        
        <div class="form-group">
          <div class="password-label">
            <label for="password">密码</label>
            <a href="#" class="forgot-password">忘记密码?</a>
          </div>
          <div class="input-with-icon">
            <span class="input-icon">🔒</span>
            <input 
              id="password"
              v-model.trim="password" 
              type="password" 
              placeholder="请输入密码" 
              required 
              autocomplete="current-password"
              :class="{ 'has-value': password }"
            />
          </div>
        </div>
        
        <div class="remember-me">
          <label class="checkbox-container">
            <input type="checkbox" v-model="rememberMe">
            <span class="checkmark"></span>
            <span>记住我</span>
          </label>
        </div>
        
        <button 
          type="submit" 
          class="login-button" 
          :disabled="loading" 
          :class="{ 'loading': loading }"
        >
          <span v-if="!loading">登录</span>
          <span v-else class="loading-spinner"></span>
        </button>
      </form>
      
      <div class="login-footer">
        <p class="demo-note">演示系统：任意账号密码均可登录</p>
        <div class="social-login">
          <span class="social-text">其他登录方式</span>
          <div class="social-icons">
            <a href="#" class="social-icon">
              <span>📱</span>
            </a>
            <a href="#" class="social-icon">
              <span>💬</span>
            </a>
            <a href="#" class="social-icon">
              <span>✉️</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <div class="login-features">
      <div class="feature">
        <span class="feature-icon">📊</span>
        <div class="feature-text">
          <h3>数据分析</h3>
          <p>实时监控销售数据，助力业务增长</p>
        </div>
      </div>
      <div class="feature">
        <span class="feature-icon">🛒</span>
        <div class="feature-text">
          <h3>订单管理</h3>
          <p>高效处理订单，提升客户满意度</p>
        </div>
      </div>
      <div class="feature">
        <span class="feature-icon">👥</span>
        <div class="feature-text">
          <h3>客户关系</h3>
          <p>维护客户资料，建立长期合作</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const rememberMe = ref(false)

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

async function onSubmit() {
  loading.value = true
  await sleep(800) // 稍微延长加载时间以展示动画效果
  localStorage.setItem('token', 'demo-token')
  if (rememberMe.value) {
    localStorage.setItem('remember_user', username.value)
  } else {
    localStorage.removeItem('remember_user')
  }
  loading.value = false
  const redirect = route.query.redirect || '/'
  router.push(String(redirect))
}
</script>

<style scoped>
.login-container {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  padding: 40px;
  width: 420px;
  margin: auto;
  animation: fadeIn 0.6s ease-out;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.logo-icon {
  font-size: 28px;
  margin-right: 8px;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(45deg, var(--primary), #4f46e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 8px;
  color: #1e293b;
}

.subtitle {
  color: #64748b;
  font-size: 14px;
  margin: 0;
}

.login-form {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
}

.password-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-password {
  font-size: 12px;
  color: var(--primary);
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.input-with-icon {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 16px;
}

input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px;
  transition: all 0.3s ease;
}

input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

input.has-value {
  border-color: #cbd5e1;
}

.remember-me {
  margin-bottom: 24px;
}

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #64748b;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  height: 18px;
  width: 18px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: #f1f5f9;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: var(--primary);
  border-color: var(--primary);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 6px;
  top: 2px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.login-button {
  width: 100%;
  padding: 12px;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.login-button:hover {
  background: #2563eb;
}

.login-button:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

.login-button.loading {
  color: transparent;
}

.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

.login-footer {
  text-align: center;
}

.demo-note {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 16px;
}

.social-login {
  margin-top: 24px;
}

.social-text {
  display: block;
  font-size: 12px;
  color: #64748b;
  margin-bottom: 12px;
  position: relative;
}

.social-text::before,
.social-text::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background-color: #e2e8f0;
}

.social-text::before {
  left: 0;
}

.social-text::after {
  right: 0;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-icon:hover {
  background-color: #f1f5f9;
  transform: translateY(-2px);
}

.login-features {
  display: none;
}

/* 响应式设计 */
@media (min-width: 1024px) {
  .login-container {
    justify-content: space-between;
    padding: 0;
  }
  
  .login-card {
    margin: auto 0 auto 10%;
    border-radius: 24px;
  }
  
  .login-features {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 24px;
    background: linear-gradient(135deg, var(--primary), #4f46e5);
    width: 40%;
    padding: 60px;
    border-radius: 0;
    color: white;
    animation: slideIn 0.8s ease-out;
  }
  
  .feature {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }
  
  .feature:hover {
    transform: translateX(5px);
    background: rgba(255, 255, 255, 0.15);
  }
  
  .feature-icon {
    font-size: 24px;
    background: rgba(255, 255, 255, 0.2);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
  }
  
  .feature-text h3 {
    margin: 0 0 4px;
    font-size: 18px;
    font-weight: 600;
  }
  
  .feature-text p {
    margin: 0;
    font-size: 14px;
    opacity: 0.8;
  }
}

/* 动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
