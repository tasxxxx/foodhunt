import { createRouter, createWebHistory } from 'vue-router';
import Landing from '../views/Landing.vue';
import CustRegister from '../views/CustRegister.vue';
import Login from '../views/Login.vue';
import MainListing from '../views/MainListing.vue';
import RestaurantListing from '../views/RestaurantListing.vue';
import Test from '../views/Test.vue';
import Test2 from '../views/Test2.vue';
import CustProfile from '../views/CustProfile.vue';
import PartnerUs from '../views/PartnerUs.vue';
import MyReservation from '../views/MyReservation.vue';
import MyCart from '../views/MyCart.vue';

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing,
  },
  {
    path: '/partnerus',
    name: 'partnerus',
    component: PartnerUs,
  },
  {
    path: '/register',
    name: 'register',
    component: CustRegister,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/mainlisting',
    name: 'mainlisting',
    component: MainListing,
  },
  {
    path: '/restaurantlisting',
    name: 'restaurantlisting',
    component: RestaurantListing,
  },
  {
    path: '/myreservation',
    name: 'myreservation',
    component: MyReservation,
  },
  {
    path: '/mycart',
    name: 'mycart',
    component: MyCart,
  },
  {
    path: '/test',
    name: 'test',
    component: Test,
  },
  {
    path: '/test2',
    name: 'test2',
    component: Test2,
  },
  {
    path: '/custprofile',
    name: 'custprofile',
    component: CustProfile,
  },
];

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes,
});

export default router;
