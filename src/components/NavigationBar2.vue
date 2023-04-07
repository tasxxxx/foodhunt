<template>  
    <div class = "BreadCrumbs">
        <v-breadcrumbs id = "logo">
            <v-breadcrumbs-item :to="{ name: 'restaurantlisting'}">
                <img id = "foodimage" src="@/assets/FoodHuntLogo.png" alt = "">
            </v-breadcrumbs-item>
        </v-breadcrumbs>
        <v-breadcrumbs id= "lpbreadcrumbs">
            <v-breadcrumbs-item :to="{ name: 'register'}">
                <v-icon icon="mdi-account-plus"></v-icon>
                Register | 
            </v-breadcrumbs-item>
            <v-breadcrumbs-item :to="{ name: 'login'}">
                <v-icon icon="mdi-login"></v-icon>
                Login 
            </v-breadcrumbs-item>
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
    name: "NavigationBar2", 
  } 

  </script>
  
  <style scoped>

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