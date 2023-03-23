<template>  
    <div class = "VendorBreadCrumbs">
      <v-breadcrumbs id = "logo">
      <v-breadcrumbs-item :to="{ name: 'landing'}">
        <img id = "foodimage" src="@/assets/FoodHuntLogo.png" alt = "">
      </v-breadcrumbs-item>
      </v-breadcrumbs>

      <v-breadcrumbs id= "lpbreadcrumbs">
      <v-breadcrumbs-item :to="{ name: 'vendor-dashboard'}">
        My Dashboard
      </v-breadcrumbs-item>
      
      <v-btn color="black" icon="mdi-account-circle" size="medium" :to="{ name: 'vendor-personalisation'}"></v-btn>
      </v-breadcrumbs>
    </div>
  </template>
  
  <script>
  export default {
    name: "VendorBreadCrumbs"
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
      height: 0vh;
      top: -2.5vh;
      left: 77vw;
      font-family: Nunito; 
      font-size: 1.1vw;
      text-align: right;
      display: flex;
  } 
  </style>