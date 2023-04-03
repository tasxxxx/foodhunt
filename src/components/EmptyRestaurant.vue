<template>
    <div class="empty-cart-container">
      <img id ="emptycart" src="@/assets/How-to-say-Sorry-in-Japanese.png" alt = "">
      <h2 class="information">All restaurants are currently closed. Please check back later.</h2>
    </div>
</template>

<script>
    export default {
    name: 'EmptyRestaurantListing'
    }
</script>
<style scoped>
.empty-cart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#emptycart {
  width: 250px;
}
.information {
    font-weight: bold;
    text-align: center;
    margin-top: 30px;
    color: red;
}

</style>
