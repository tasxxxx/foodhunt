<template>  
    <div class = "BreadCrumbs">
      <v-breadcrumbs id = "logo">
      <v-breadcrumbs-item :to="{ name: 'mainlisting'}">
        <img id = "foodimage" src="@/assets/FoodHuntLogo.png" alt = "">
      </v-breadcrumbs-item>
      </v-breadcrumbs>
  
      <v-breadcrumbs id= "lpbreadcrumbs">
        <v-breadcrumbs-item :to="{ name: 'myreservation'}">
            My Reservations /
        </v-breadcrumbs-item>
        <v-breadcrumbs-item :to="{ name: 'mycart'}">
            <!-- <div class="cartcount" v-if="getCartCount > 0">{{ getCartCount }}</div> -->
            My Cart / 
        </v-breadcrumbs-item>
        <div class="text-center">
            <v-menu open-on-hover>
                <template v-slot:activator="{ props }">
                <!-- EVENTUALLY I WANT IT TO BE ICON INSTEAD OF TEXT -->
                <v-text
                    v-bind="props"
                >
                User
                </v-text>
                </template>
                <v-list>
                    <v-breadcrumbs-item :to="{ name: 'custprofile'}" style= "font-family:Nunito; font-size:1.1vw">
                    My Profile 
                    </v-breadcrumbs-item>
                    <br>
                    <v-breadcrumbs-item :to="{ name: 'landing'}" @click="signOut" style= "font-family:Nunito; font-size:1.1vw">
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
    // import firebaseApp from "../firebase.js";
    // import { collection, getFirestore } from "firebase/firestore";
    // import { doc, setDoc, getDoc } from "firebase/firestore";
    // import { getAuth, signOut } from "@firebase/auth";
    // const db = getFirestore(firebaseApp);

  export default {
    // async signOut() {
    //   const user = await signOut(getAuth());
    //   this.$router.push('/landing')
    // },
    name: "NavigationBar1", 
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

  #logo {
      height: 7vh;
      top: 2vh;
      left: 3vw;
      background-position: center center;
      background-size: cover;
      opacity: 1;
      position: relative;
  }
  
  #foodimage { 
    height: 7vh;
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
      height: 0vh;
      top: -4vh;
      left: 77vw;
      font-family: Nunito; 
      font-size: 1.3vw;
      text-align: right;
      display: flex;
  } 

  #usericon {
    size: 1px;
  }
  </style>