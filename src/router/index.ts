import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/access',
    name: 'access',
    component: () => import('../views/AccessView.vue')
  },
  {
    path: '/controle',
    name: 'controle',
    component: () => import('../views/ControleView.vue')
  },
  {
    path: '/register-vehicleBrand',
    name: 'register-vehicleBrand',
    component: () => import('../views/car-brands/RegisterVehicleBrandView.vue')
  },
  {
    path: '/access-vehicleBrand',
    name: 'access-vehicleBrand',
    component: () => import('../views/car-brands/AccessVehicleBrandView.vue')
  },
  {
    path: '/edit-vehicleBrand',
    name: 'edit-vehicleBrand',
    component: () => import('../views/car-brands/EditVehicleBrandView.vue')
  },
  {
    path: '/register-vehicleModel',
    name: 'register-vehicleModel',
    component: () => import('../views/car-models/RegisterVehicleModelView.vue')
  },
  {
    path: '/access-vehicleModel',
    name: 'access-vehicleModel',
    component: () => import('../views/car-models/AccessVehicleModelView.vue')
  },
  {
    path: '/edit-vehicleModel',
    name: 'edit-vehicleModel',
    component: () => import('../views/car-models/EditVehicleModelView.vue')
  },
  {
    path: '/register-vehicle',
    name: 'register-vehicle',
    component: () => import('../views/cars/RegisterVehicleView.vue')
  },
  {
    path: '/access-vehicle',
    name: 'access-vehicle',
    component: () => import('../views/cars/AccessVehicleView.vue')
  },
  {
    path: '/edit-vehicle',
    name: 'edit-vehicle',
    component: () => import('../views/cars/EditVehicleView.vue')
  },
  {
    path: '/register-conductor',
    name: 'register-conductor',
    component: () => import('../views/conductors/RegisterConductorView.vue')
  },
  {
    path: '/access-conductor',
    name: 'access-conductor',
    component: () => import('../views/conductors/AccessConductorView.vue')
  },
  {
    path: '/edit-conductor',
    name: 'edit-conductor',
    component: () => import('../views/conductors/EditConductorView.vue')
  },
  {
    path: '/register-config',
    name: 'register-config',
    component: () => import('../views/configurations/RegisterConfigView.vue')
  },
  {
    path: '/access-config',
    name: 'access-config',
    component: () => import('../views/configurations/AccessConfigView.vue')
  },
  {
    path: '/register-movement',
    name: 'register-movement',
    component: () => import('../views/movements/RegisterMovementView.vue')
  },
  {
    path: '/access-movement',
    name: 'access-movement',
    component: () => import('../views/movements/AccessMovementView.vue')
  },
  {
    path: '/edit-movement',
    name: 'edit-movement',
    component: () => import('../views/movements/EditMovementView.vue')
  },
  {
    path: '/register-closemovement',
    name: 'register-closemovement',
    component: () => import('../views/movements/RegisterCloseMovementView.vue')
  },
  {
    path: '/access-closemovement',
    name: 'access-closemovement',
    component: () => import('../views/movements/AccessCloseMovementView.vue')
  },
  {
    path: '/edit-closemovement',
    name: 'edit-closemovement',
    component: () => import('../views/movements/EditCloseMovementView.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
