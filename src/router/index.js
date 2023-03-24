import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import CustRegister from '../views/CustRegister.vue'
import Login from '../views/Login.vue'
import MainListing from '../views/MainListing.vue'
import Test from '../views/Test.vue'
import Test2 from '../views/Test2.vue'
import CustProfile from '../views/CustProfile.vue'
import PartnerUs from '../views/PartnerUs.vue'
import MyReservation from '../views/MyReservation.vue'
import Restaurant from '../views/Restaurant.vue'
import MyCart from '../views/MyCart.vue'
import VendorDashboard from '../views/VendorDashboard.vue'
import CreateListing from '../views/CreateListing.vue'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing
  },
  {
    // path: '/restaurants/:id',
    path: '/restaurants',
    name: 'restaurant',
    component: Restaurant,
    // props: true
  },
  {
    path: '/partnerus',
    name: 'partnerus',
    component: PartnerUs
  },
  {
    path: '/register',
    name: 'register',
    component: CustRegister
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/mainlisting',
    name: 'mainlisting',
    component: MainListing
  },
  {
    path: '/myreservation',
    name: 'myreservation',
    component: MyReservation
  }, 
  {
    path: '/mycart',
    name: 'mycart',
    component: MyCart
  }, 
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/test2',
    name: 'test2',
    component: Test2
  },
  {
    path: '/custprofile',
    name: 'custprofile',
    component: CustProfile
  },
  {
    path: '/vendor-dashboard',
    name: 'vendor-dashboard',
    component: VendorDashboard
  },
  {
    path: '/create-listing',
    name: 'create-listing',
    component: CreateListing
  },
]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes
})

export default router
