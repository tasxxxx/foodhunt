<template>
<div class="container">
  <img id = "backgroundimg" src="@/assets/loginbg.jpg" alt = "">
  <div class="pa-6-wrapper">

    <v-container>
    <v-card class="pa-6">
      <v-breadcrumbs-item :to="{ name: 'landing'}"><img id = "backgroundimg1" src="@/assets/foodhuntlogo.png" alt = "">
      </v-breadcrumbs-item>
      <h2 class="text-center mb-6" style="font-family:Nunito">Log In</h2>
      <v-form ref="form" @submit.prevent="login">
        <v-text-field
          v-model="form.email"
          label="Email"
          required
          :error-messages="formErrors.email"
          style="font-family:Nunito"
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
          required
          :error-messages="formErrors.password"
          style="font-family:Nunito"
        ></v-text-field>
        <v-checkbox
          v-model="form.rememberMe"
          label="Remember me"
          color="red"
          class="mt-4"
          style="font-family:Nunito"
        ></v-checkbox>
        <v-btn
          type="submit"
          color="primary"
          class="mt-6"
          :loading="isLoading"
          block
          style="font-family:Nunito"
        >
          Log In
        </v-btn>
        <router-link to="/mainlisting"  style= "font-family:Nunito"> Bypass Login </router-link> <br>
        <router-link to="/vendor-dashboard"  style= "font-family:Nunito"> Bypass Login to vendor</router-link>
      </v-form>
      <div class="text-center mt-6" style="font-family:Nunito">
        <span>Don't have an account?</span>
        <!-- <v-btn text to="/signup">Sign Up</v-btn> -->
        <router-link to="/register"> Register </router-link>
      </div>
    </v-card>
  </v-container>

  </div>
</div>

</template>
  
<script>
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence } from "@firebase/auth";
import firebaseApp from "../firebase";
//import firebase from 'firebase/compat/app';
//import { firebase } from 'firebase/app';
const auth = getAuth();

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
        rememberMe: false,
      },
      formErrors: {},
      isLoading: false,
    };
  },
  methods: {
    async login() {
      this.formErrors = {};

      // Check if valid inputs
      if (!this.form.email) {
        this.formErrors.email = ['Email is required'];
      } else if (!this.validEmail(this.form.email)) {
        this.formErrors.email = ['Please enter a valid email address'];
      }

      if (!this.form.password) {
        this.formErrors.password = ['Password is required'];
      }

      // Validation code
      if (Object.keys(this.formErrors).length === 0) {
        this.isLoading = true;
        console.log('Logging in:', this.form);
        // Backend API code
        try {
          console.log("remember me: " + this.form.rememberMe)
          //await setPersistence(auth, firebase.auth.Auth.Persistence.SESSION);
          const user = await signInWithEmailAndPassword(auth, this.form.email, this.form.password);
          
          if (this.form.rememberMe) {
            console.log("remembering you")
            setPersistence(auth, browserSessionPersistence)
            //return setPersistence(auth, firebase.auth.Auth.Persistence.LOCAL);
          }
          this.$router.push('/mainlisting')
        } catch (error) {
          this.formErrors.password = [error.message];
        }
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);

        
      }
    },
    validEmail(email) {
      // Email validation code
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?!.*\.\w{2,})(?:[a-zA-Z]{2,}|xn--[a-zA-Z0-9]+)/;
      return regex.test(email.trim());
    },
  },
};
</script>

<style scoped>
  #backgroundimg {
    width: 100vw;
    height: 130vh;
    position: absolute;
    opacity: 0.5;
  }

  #backgroundimg1{
    width:10vw;
  }
  .pa-6-wrapper {
    padding:15vh;
    padding-left: 30vw;
    padding-right: 30vw;
  }

</style>
