<template>  
  <div class="navigation-bar">
      <NavigationBar1 v-if="isLoggedIn" />
      <NavigationBar2 v-else />
  </div>
  <RestaurantInfo :id="id"/>
  <RestaurantProductListing :id="id"/>
</template>

<script> 
  import NavigationBar1 from '@/components/NavigationBar1.vue'
  import NavigationBar2 from '@/components/NavigationBar2.vue'
  import RestaurantInfo from '@/components/RestaurantInfo.vue';
  import RestaurantProductListing from '@/components/RestaurantProductListing.vue';
  import { getAuth, onAuthStateChanged } from "firebase/auth";

  export default {
  name: "Restaurant",
  props: ['id'],
  components:{
    NavigationBar1,
    NavigationBar2,
    RestaurantInfo,
    RestaurantProductListing
  },
  data() {
    return {
      isLoggedIn: false
  }
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    }
  )},
}
</script>

<style scoped>
</style>


