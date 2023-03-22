<template>  
    <NavigationBar1/>
    <RestaurantInfo/>
</template>

<script> 
import NavigationBar1 from '@/components/icons/NavigationBar1.vue'
import RestaurantInfo from '@/components/icons/RestaurantInfo.vue'

export default {
  name: "Restaurant",
  components:{
    NavigationBar1,
    RestaurantInfo
  }
}
</script>

<style scoped> 
</style>