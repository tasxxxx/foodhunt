<template>
    <div class="empty-cart-container">
      <img id ="emptycart" src="@/assets/ae8ac2fa217d23aadcc913989fcc34a2-removebg-preview.png" alt = "">
      <h1 id="message">Oops! You have no current reservations. <br> Check back again!</h1>
      <v-breadcrumbs-item :to="{ name: 'vendor-dashboard'}">
        <v-btn rounded="lg" color="primary"> Back to Dashboard </v-btn>
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
