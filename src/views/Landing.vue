<template>
  <!-- <router-link to="/register"><button>Register</button></router-link> |
  <router-link to="/login"><button>Login</button></router-link> -->
  
  <!-- <router-view/> -->
  <img id = "landingimage" src="@/assets/nicolas-perondi-UxRhrU8fPHQ-unsplash.jpg" alt = "">

  <div class = "rightHalf">
    <v-breadcrumbs-item :to="{ name: 'landing'}">
      <img id = "foodimage" src="@/assets/FoodHuntLogo.png" alt = "">
    </v-breadcrumbs-item>
    <v-breadcrumbs id= "lpbreadcrumbs">
    <v-breadcrumbs-item :to="{ name: 'partnerus'}">
      <v-icon icon="mdi-handshake" size></v-icon>
      Partner Us |
    </v-breadcrumbs-item>
    <v-breadcrumbs-item :to="{ name: 'register'}">
      <v-icon icon="mdi-account-plus"></v-icon>
      Register | 
    </v-breadcrumbs-item>
    <v-breadcrumbs-item :to="{ name: 'login'}">
      <v-icon icon="mdi-login"></v-icon>
      Login 
    </v-breadcrumbs-item>
    </v-breadcrumbs>

    <span id="tagline">Late-night deals that make a difference.</span>
    <v-btn 
    id = 'searchbutton' 
    color="primary" 
    style="font-family:Nunito;" 
    @click="search"
    >Search Nearby</v-btn> 

    <div class="text-field-wrapper">
      <v-text-field 
      id = 'PostalField' 
      v-model="postalcode" 
      label="Enter Postal Code" 
      variant="solo" 
      maxlength="6" 
      style="font-family:Nunito;"
      :error-messages="errors"
      ></v-text-field>
    </div>

  </div>

</template>

<script>
export default {
  name: "Landing",
  components: {

  },
  data() {
    return {
      postalcode: '',
      errors: [],
    }
  },

  emits:["landingPostalCode"],

  methods: {
    search() {
      if (this.postalcode.length == 0) {
        this.errors = ["Postal code is required"]
      } else if (/[a-zA-Z]/.test(this.postalcode) || this.postalcode.length < 6) {
        this.errors = ["Please enter a valid postal code"]
      } else {
        console.log("in landing.vue")
        console.log(this.postalcode)
        console.log(" ")
        this.$router.push('/restaurantlisting')
        this.emitter.emit("landingPostalCode", this.postalcode) 

      }
    }
  }
}
</script>

<style scoped>
#landingimage {
  width: 45%;
  position: absolute;
  margin-top: -250px;
  height: auto;
}

.rightHalf {
  width: 55%;
  position: absolute;
  right: 0px;
  height: 100%;
}

#foodimage { 
    height: 5.5vh;
    top: 1.9vh;
    left: 3vw;
    background-position: center center;
    background-size: cover;
    opacity: 1;
    position: relative;
}

#lpbreadcrumbs {
    color: rgba(109,93,36,1);
    position: relative;
    height: 0vh;
    top: -2.5vh;
    left: 32vw;
    font-family: Nunito; 
    font-size: 1.1vw;
    text-align: right;
    display: flex;
} 

#tagline {
  width: 500px;
  color: rgba(0,0,0,1);
  position: relative;
  top: 30vh;
  left: 3vw;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0);
  font-family: Lato;
  font-size: 2.67vw;
  opacity: 1;
  text-align: center;
}

#searchbutton {
  border-radius: 10px;
  top: 29.5%;
  left: 71%;
  height: 6.3%;
  font-size: 20px;
  position: relative;
  color: black;
}

.text-field-wrapper {
  margin-top: 19.5%; 
  margin-left: 5.7%; 
  margin-right: 30%;
}

#PostalField { 
  height: 7.0%;
}

</style>