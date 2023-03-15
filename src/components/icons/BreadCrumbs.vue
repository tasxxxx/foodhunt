<template>  
  <div class = "BreadCrumbs">
    <v-breadcrumbs id = "logo">
    <v-breadcrumbs-item :to="{ name: 'landing'}">
      <img id = "foodimage" src="@/assets/FoodHuntLogo.png" alt = "">
    </v-breadcrumbs-item>
    </v-breadcrumbs>

    <v-breadcrumbs id= "lpbreadcrumbs">
    <v-breadcrumbs-item :to="{ name: 'partnerus'}">
      Partner Us /
    </v-breadcrumbs-item>
    <v-breadcrumbs-item :to="{ name: 'register'}">
      Register / 
    </v-breadcrumbs-item>
    <v-breadcrumbs-item :to="{ name: 'login'}">
      Login 
    </v-breadcrumbs-item>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  name: "BreadCrumbs"
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
</style>