<template>
    <div class="empty-cart-container">
      <img id ="emptycart" src="@/assets/preview.png" alt = "">
      <h1 id="message">Oops! It seems like your cart is feeling a bit lonely. Time to add some items and fill it up!</h1>
      <v-breadcrumbs-item :to="{ name: 'restaurantlisting'}">
        <v-btn rounded="lg" color="primary"> Start Hunting!</v-btn>
      </v-breadcrumbs-item>
      <!-- <img id ="emojisad" src="@/assets/emoji.webp" alt = ""> -->
    </div>
</template>

<script>
    export default {
    name: 'EmptyCart'
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
  width: 500px;
}

#emojisad {
  width: 320px;
}

#message {
  margin-top: -15px;
  margin-bottom: 25px;
  font-family: Nunito; 
}

</style>
