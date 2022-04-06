import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/AddCustomer',
    name: 'AddCustomer',
    component: () => import('../views/AddCustomer.vue')
  },
  {
    path: '/ViewCustomers',
    name: 'ViewCustomers',
    component: () => import('../views/ViewCustomers.vue')
  },
  {
    path: '/EditCustomer',
    name: 'EditCustomer',
    component: () => import('../views/EditCustomer.vue')
  },
  {
    path: '/AddVehicle',
    name: 'AddVehicle',
    component: () => import('../views/AddVehicle.vue')
  },
  {
    path: '/ViewVehicles',
    name: 'ViewVehicles',
    component: () => import('../views/ViewVehicles.vue')
  },
  {
    path: '/EditVehicle',
    name: 'EditVehicle',
    component: () => import('../views/EditVehicle.vue')
  },
  {
    path: '/AddWorkOrder',
    name: 'AddWorkOrder',
    component: () => import('../views/AddWorkOrder.vue')
  },
  {
    path: '/ViewWorkOrders',
    name: 'ViewWorkOrders',
    component: () => import('../views/ViewWorkOrders.vue')
  },
  {
    path: '/DeletedWorkOrders',
    name: 'DeletedWorkOrders',
    component: () => import('../views/DeletedWorkOrders.vue')
  },
  {
    path: '/ManageServices',
    name: 'ManageServices',
    component: () => import('../views/ManageServices.vue')
  },
  {
    path: '/ManageVehicles',
    name: 'ManageVehicles',
    component: () => import('../views/ManageVehicles.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
