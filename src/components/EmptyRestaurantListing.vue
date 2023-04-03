<template>
    <div class="empty-cart-container">
      <img id ="emptycart" src="@/assets/How-to-say-Sorry-in-Japanese.png" alt = "">
      <h2 class="information">Sold out for the day. Please check back tomorrow.</h2>
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
    margin-top: 20px;
    color: red;
}

</style>
