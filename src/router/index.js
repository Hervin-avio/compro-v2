import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // 🟩 Layout Default (dengan header/footer)
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { layout: 'DefaultLayout' }
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('@/views/Services.vue'),
    meta: { layout: 'DefaultLayout' }
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: () => import('@/views/Gallery.vue'),
    meta: { layout: 'DefaultLayout' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { layout: 'DefaultLayout' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/Contact.vue'),
    meta: { layout: 'DefaultLayout' }
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: () => import('@/views/ProductDetail.vue'),
    meta: { layout: 'DefaultLayout' }
  },

  // 🟥 Layout Kosong (tanpa header/footer)
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { layout: 'BlankLayout' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: { layout: 'BlankLayout' }
  },
  {
    path: '/reset',
    name: 'Reset',
    component: () => import('@/views/Reset.vue'),
    meta: { layout: 'BlankLayout' }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
