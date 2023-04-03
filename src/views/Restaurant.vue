<template>  
  <NavigationBar1/>
  <RestaurantInfo :id="id"/>
  <RestaurantProductListing :id="id"/>
</template>

<script> 
  import NavigationBar1 from '@/components/NavigationBar1.vue'
  import RestaurantInfo from '@/components/RestaurantInfo.vue';
  import RestaurantProductListing from '@/components/RestaurantProductListing.vue';

  export default {
  name: "Restaurant",
  props: ['id'],
  components:{
    NavigationBar1,
    RestaurantInfo,
    RestaurantProductListing
  },
  }
</script>

<style scoped>
</style>


