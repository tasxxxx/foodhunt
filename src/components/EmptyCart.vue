<template>
    <div class="empty-cart-container">
      <img id ="emptycart" src="@/assets/preview-removebg-preview.png" alt = "">
      <h1 id="message">Oops! It seems like your cart is feeling a bit lonely. 
        <br> 
        Time to add some items and fill it up!</h1>
      <v-breadcrumbs-item :to="{ name: 'restaurantlisting'}">
        <v-btn rounded="lg" color="primary" id="btn"> Start Hunting!</v-btn>
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
  margin-top:-150px;
  margin-left:-30px;
  width: 500px;
}

#emojisad {
  width: 320px;
}

#message {
  margin-top: -55px;
  margin-bottom: 25px;
  font-family: Nunito; 
  text-align: center;
}

#btn {
  margin-left: -15px;
}

</style>
