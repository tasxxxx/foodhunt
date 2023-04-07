<template>
    <div class="empty-cart-container">
      <img id ="emptycart" src="@/assets/ae8ac2fa217d23aadcc913989fcc34a2-removebg-preview.png" alt = "">
      <h1 id="message">Oops! It seems like your you have no listing. <br> Time to upload a listing!</h1>
      <v-breadcrumbs-item :to="{ name: 'create-listing'}">
        <v-btn rounded="lg" color="primary" class="ml-5"> Create listing </v-btn>
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
  margin-top:-150px;
  width: 500px;
}

#emojisad {
  width: 320px;
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
