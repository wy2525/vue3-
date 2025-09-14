import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import ProductList from '../views/ProductList.vue'
import ProductDetail from '../views/ProductDetail.vue'
import OrderList from '../views/OrderList.vue'
import OrderDetail from '../views/OrderDetail.vue'
import CustomerList from '../views/CustomerList.vue'
import CustomerDetail from '../views/CustomerDetail.vue'
import Inventory from '../views/Inventory.vue'
import Statistics from '../views/Statistics.vue'
import Settings from '../views/Settings.vue'

function isAuthed() {
  return !!localStorage.getItem('token')
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/login', name: 'login', component: Login },
    { path: '/', name: 'home', component: Home, meta: { requiresAuth: true } },
    { path: '/products', name: 'products', component: ProductList, meta: { requiresAuth: true } },
    { path: '/products/:id', name: 'product-detail', component: ProductDetail, meta: { requiresAuth: true } },
    { path: '/orders', name: 'orders', component: OrderList, meta: { requiresAuth: true } },
    { path: '/orders/:id', name: 'order-detail', component: OrderDetail, meta: { requiresAuth: true } },
    { path: '/customers', name: 'customers', component: CustomerList, meta: { requiresAuth: true } },
    { path: '/customers/:id', name: 'customer-detail', component: CustomerDetail, meta: { requiresAuth: true } },
    { path: '/inventory', name: 'inventory', component: Inventory, meta: { requiresAuth: true } },
    { path: '/statistics', name: 'statistics', component: Statistics, meta: { requiresAuth: true } },
    { path: '/settings', name: 'settings', component: Settings, meta: { requiresAuth: true } },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ]
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthed()) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }
  if (to.name === 'login' && isAuthed()) {
    return { name: 'home' }
  }
})

export default router
