import { createRouter, createWebHistory } from 'vue-router';
import Landing from '../views/Landing.vue';
import CustRegister from '../views/CustRegister.vue';
import Login from '../views/Login.vue';
import MainListing from '../views/MainListing.vue';
import Test from '../views/Test.vue';
import Test2 from '../views/Test2.vue';
import CustProfile from '../views/CustProfile.vue';
import PartnerUs from '../views/PartnerUs.vue';
import MyReservation from '../views/MyReservation.vue';
import Restaurant from '../views/Restaurant.vue';
import MyCart from '../views/MyCart.vue';
import VendorDashboard from '../views/VendorDashboard.vue';
import CreateListing from '../views/CreateListing.vue';
import VendorPersonalisation from '../views/VendorPersonalisation.vue';
import VendorRegister from '../views/VendorRegister.vue';
import VendorProfileEditOne from '../views/VendorProfileEditOne.vue';
import VendorProfileEditTwo from '../views/VendorProfileEditTwo.vue';
import RestaurantListing from '../views/RestaurantListing2.vue';
import VendorListing from '../views/VendorListing.vue';
import Confirmation from '../views/confirmation.vue';
import VendorReservation from '../views/VendorReservation.vue';

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing,
  },
  {
    path: '/restaurant/:id',
    name: 'restaurant',
    component: Restaurant,
    props: true,
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
  {
    path: '/vendor-dashboard',
    name: 'vendor-dashboard',
    component: VendorDashboard,
  },
  {
    path: '/create-listing',
    name: 'create-listing',
    component: CreateListing,
  },
  {
    path: '/vendor-personalisation',
    name: 'vendor-personalisation',
    component: VendorPersonalisation,
  },
  {
    path: '/vendor-register',
    name: 'vendor-register',
    component: VendorRegister,
  },
  {
    path: '/vendor-profileeditone',
    name: 'vendor-profileeditone',
    component: VendorProfileEditOne,
  },
  {
    path: '/vendor-profileedittwo',
    name: 'vendor-profileedittwo',
    component: VendorProfileEditTwo,
  },
  {
    path: '/vendor-listing',
    name: 'vendor-listing',
    component: VendorListing,
  },
  {
    path: '/confirmation/:reservationNumber',
    name: 'Confirmation',
    component: Confirmation,
    props: true,
  },
  {
    path: '/vendor-reservation',
    name: 'vendor-reservation',
    component: VendorReservation,
  },
];

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes,
});

export default router;
