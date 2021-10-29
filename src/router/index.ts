import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import CustomerView from '../views/CustomerView.vue'
import CustomerMain from '@/components/customer/Main.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/customer' },
  {
    path: '/customer/',
    name: 'Home',
    component: CustomerView,
    children: [
      {
        path: '',
        component: CustomerMain
      },
      {
        path: 'map',
        component: () => import(/* webpackChunkName: "customer" */ '../components/customer/Cafes.vue')
      },
      {
        path: 'adv',
        component: () => import(/* webpackChunkName: "customer" */ '../components/customer/Adv.vue')
      },
      {
        path: 'profile',
        component: () => import(/* webpackChunkName: "customer" */ '../components/customer/Profile.vue')
      }
    ]
  },
  {
    path: '/staff',
    component: () => import(/* webpackChunkName: "staff" */ '../views/StaffView.vue')
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
