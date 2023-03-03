import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Settings from '../views/SettingsView.vue'
import Block from '../views/BlockView.vue'
import Transaction from '../views/TransactionView.vue'
import Account from '../views/AccountView.vue'
import Token from '../views/TokenView.vue'

const routes = [
  { path: '/home', name: 'home', component: HomeView },
  { path: '/settings', name: 'settings', component: Settings },
  { path: '/block/:value', name: 'block', component: Block },
  { path: '/tx/:value', name: 'tx', component: Transaction },
  { path: '/address/:value', name: 'address', component: Account },
  { path: '/token/:value', name: 'token', component: Token },
  { path: '/:catchAll(.*)', redirect: '/home' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
