<template>  
    <div class = "BreadCrumbs">
      <v-breadcrumbs id = "logo">
      <v-breadcrumbs-item :to="{ name: 'restaurantlisting'}">
        <img id = "foodimage" src="@/assets/FoodHuntLogo.png" alt = "">
      </v-breadcrumbs-item>
      </v-breadcrumbs>
      <!-- <v-breadcrumbs id = "search">
        <input type="text" v-model="search" placeholder="Search" /> <br> <br>
      </v-breadcrumbs> -->
      
      <v-breadcrumbs id= "lpbreadcrumbs">
        <v-breadcrumbs-item :to="{ name: 'myreservation'}">
          <v-icon icon="mdi-shopping"></v-icon>
            My Reservations |
        </v-breadcrumbs-item>
        <v-breadcrumbs-item :to="{ name: 'mycart'}">
            <v-icon icon="mdi-cart"></v-icon>
            My Cart |
        </v-breadcrumbs-item>
        <div class="text-center">
            <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                <v-icon icon="mdi-account" v-bind="props"></v-icon>
                </template>
                <v-list>
                    <v-breadcrumbs-item :to="{ name: 'custprofile'}" style= "font-family:Nunito; font-size:1vw; color: rgba(109,93,36,1)">
                      <v-icon icon="mdi-account-details"></v-icon>
                    My Profile 
                    </v-breadcrumbs-item>
                    <br>
                    <v-breadcrumbs-item :to="{ name: 'landing'}" @click="signOut" style= "font-family:Nunito; font-size:1vw ; color: rgba(109,93,36,1)">
                      <v-icon icon="mdi-logout"></v-icon>
                    Log Out 
                    </v-breadcrumbs-item>    
                </v-list>
            </v-menu>
        </div>
    </v-breadcrumbs>
    </div>
  </template>

  <script>
    // Error when uncommenting firebaseApp, cannot find
    import firebaseApp from "../firebase";
    import { collection, getFirestore } from "firebase/firestore";
    import { doc, setDoc, getDoc } from "firebase/firestore";
    import { getAuth, signOut } from "@firebase/auth";
    const db = getFirestore(firebaseApp);

  export default {
    methods: { 
    async signOut() {
      const user = await signOut(getAuth());
      this.$router.push('/')
    },
    name: "NavigationBar1", 
  } 
}
  </script>
  
  <style scoped>
  /*
  .BreadCrumbs {
    width: 100%;
    position: absolute;
    right: 0px;
    height: 100%;
  }
  */

  .navbar {
    display: block;
  }

  #logo {
      height: 5.5vh;
      top: 2vh;
      left: 3vw;
      background-position: center center;
      background-size: cover;
      opacity: 1;
      position: relative;
  }
  
  #foodimage { 
    height: 5.5vh;
      top: 0vh;
      left: 3vw;
      background-position: center center;
      background-size: cover;
      opacity: 1;
      position: relative;
  }
  
  #lpbreadcrumbs {
    color: rgba(109,93,36,1);
      position: relative;
      /* height: 0vh;
      top: -2.5vh; */
      /* left: 77vw; */
      font-family: Nunito; 
      font-size: 1.1vw;
      text-align: right;
      display: flex;
      float: right;
      top: -35px;
      left: -60px;
  } 
  </style>