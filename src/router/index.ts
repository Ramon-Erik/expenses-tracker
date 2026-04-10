import SimulateCartView from '@/views/SimulateCartView.vue'
import WalletView from '@/views/WalletView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Carteira',
      component: WalletView,
    },
    {
      path: '/simulate',
      name: 'Simular',
      component: SimulateCartView,
    },
  ],
})

export default router
