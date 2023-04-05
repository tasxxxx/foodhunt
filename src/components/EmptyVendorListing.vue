<template>
    <div class="empty-cart-container">
      <img id ="emptycart" src="@/assets/preview.png" alt = "">
      <h1 id="message">Oops! It seems like your you have no listing, time to upload a listing!</h1>
      <v-breadcrumbs-item :to="{ name: 'vendor-dashboard'}">
        <v-btn rounded="lg" color="primary"> Back to Dashboard </v-btn>
      </v-breadcrumbs-item>
      <!-- <img id ="emojisad" src="@/assets/emoji.webp" alt = ""> -->
    </div>
</template>

<script>
    export default {
    name: 'EmptyVendorListing'
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
