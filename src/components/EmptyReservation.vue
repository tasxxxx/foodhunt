<template>
    <div class="empty-cart-container">
      <img id ="emptycart" src="@/assets/ae8ac2fa217d23aadcc913989fcc34a2-removebg-preview.png" alt = "">
      <h1 id="message">Oops! You have no current reservations. <br> Time to add some items and fill it up!</h1>
      <v-breadcrumbs-item :to="{ name: 'restaurantlisting'}">
        <v-btn rounded="lg" color="primary" id="btn"> Start Hunting!</v-btn>
      </v-breadcrumbs-item>
    </div>
</template>

<script>
    export default {
    name: 'EmptyReservation'
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

#message {
  margin-top: -35px;
  margin-bottom: 25px;
  font-family: Nunito; 
  text-align: center;
}

#btn {
  margin-left: -15px;
}
</style>
