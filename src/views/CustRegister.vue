<template>
<div class="container">
  <img id = "backgroundimg" src="@/assets/loginbg.jpg" alt = "">
  <div class="pa-7-wrapper">
    <v-app>
      <v-container>
      <v-card class="pa-7">
        <v-breadcrumbs-item :to="{ name: 'landing'}"><img id = "backgroundimg1" src="@/assets/foodhuntlogo.png" alt = "">
        </v-breadcrumbs-item>
        <h2 class="text-center mb-7" style="font-family:Nunito">Create an Account</h2>

        <v-form ref="form" @submit.prevent="signup">
          <v-text-field
            v-model="form.email"
            label="Email Address"
            type="email"
            required
            :error-messages="formErrors.email"
            style="font-family:Nunito"
          ></v-text-field>

          <v-text-field
            v-model="form.password"
            label="Password"
            required
            :error-messages="formErrors.password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            hint="Minimum 6 characters"
            @click:append="show1 = !show1"
            counter
            style="font-family:Nunito"
          ></v-text-field>

          <v-text-field
            v-model="form.phoneNo"
            label="Phone Number"
            required
            :error-messages="formErrors.phoneNo"
            style="font-family:Nunito"
          ></v-text-field> 
          
          <!-- <v-text-field
            v-model="form.firstName"
            label="First Name"
            required
            :error-messages="formErrors.firstName"
          ></v-text-field>
          <v-text-field
            v-model="form.lastName"
            label="Last Name"
            required
            :error-messages="formErrors.lastName"
          ></v-text-field>
          <v-text-field
            v-model="form.confirmPassword"
            label="Confirm Password"
            type="password"
            required
            :error-messages="formErrors.confirmPassword"
          ></v-text-field> -->
          <v-btn type="submit" color="primary" block style="font-family:Nunito">Sign Up</v-btn>
        </v-form>
        <div class="text-center mt-6" style="font-family:Nunito">
          <span>Already have an account?</span>
          <!-- <v-btn text to="/login">Login</v-btn> -->
          <!-- <v-btn text tile color="secondary" @click="handleClick">
            Click Me!
          </v-btn> -->
          <router-link to="/login" style="font-family:Nunito"> Login </router-link>
        </div>
      </v-card>
    </v-container>
    </v-app>
  </div>
</div>
</template>
  
<script>

import firebaseApp from "../firebase";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, getDocs, collection} from "firebase/firestore";
import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "@firebase/auth";
const db = getFirestore(firebaseApp); 


export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      formErrors: {},
      show1: false,
      allphoneNo: []
    };
  },
  methods: {
    async signup() {
      this.formErrors = {};
      // Validate form data
      // if (!this.form.firstName) {
      //   this.formErrors.firstName = ['First name is required'];
      // }
      // if (!this.form.lastName) {
      //   this.formErrors.lastName = ['Last name is required'];
      // }


      if (!this.form.email) {
        this.formErrors.email = ['Email is required'];
      } else if (!this.validEmail(this.form.email)) {
        this.formErrors.email = ['Please enter a valid email address'];
      } 
      // else if (this.EmailUsed(this.form.email)) {
      //   this.formErrors.phoneNo = ['Email in used, please sign in']
      // }

      if (!this.form.password) {
        this.formErrors.password = ['Password is required'];
      } else if (this.form.password.length < 6) {
        this.formErrors.password = ['Password must be at least 6 characters'];
      }
      // if (this.form.password !== this.form.confirmPassword) {
      //   this.formErrors.confirmPassword = ['Passwords do not match'];
      // }

      if (!this.form.phoneNo) {
        this.formErrors.phoneNo = ['Phone number is required'];
      } else if (!this.validPhoneNo(this.form.phoneNo)) {
        this.formErrors.phoneNo = ['Please enter a valid SG number']
      } else if (await this.PhoneNoUsed(this.form.phoneNo)) {
        this.formErrors.phoneNo = ['Phone number in used']
      }

      // Submit form if no errors
      if (Object.keys(this.formErrors).length === 0) {
        try {
          console.log('Form submitted:', this.form);
          const user = await createUserWithEmailAndPassword(getAuth(), this.form.email, this.form.password);
          
          //console.log(user);
          //console.log(user.uid);


          //const auth = firebase.auth();
          //await auth.createUserWithEmailAndPassword(this.email, this.password);
          //const docRef = await frebaseApp.createUserWithEmailAndPassword(this.email, this.password);
          //console.log(user.uid);
          await this.updateUser();
          this.$router.push('/restaurantlisting')
          // You can use your backend API to handle the signup process here
        } catch(error) {
          console.log(error.message);
          this.formErrors.email = [error.message];
        }
      }
    },
    validEmail(email) {
      // Email validation code
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?!.*\.\w{2,})(?:[a-zA-Z]{2,}|xn--[a-zA-Z0-9]+)/;
      return regex.test(email.trim());
    },
    
    async PhoneNoUsed(phoneNo) {
      this.allphoneNo = []; // Reset the array at the beginning
      const userRef = await getDocs(collection(db, "Users"));
      userRef.forEach((doc) => {
        this.allphoneNo.push(doc.data().PhoneNo)
      });
      return this.allphoneNo.includes(phoneNo); 
    },


    validPhoneNo(phoneNo) {
      const SGNo = ["6", "8", "9"];
      if (phoneNo.length != 8) {
        return false;
      }
      if (! SGNo.includes(phoneNo.substring(0, 1))) {
        return false;
      }
      return true;
    },

    async updateUser() {
      getAuth().onAuthStateChanged(user => {
        if (user) {
          const cusRegRef = doc(db, "Users", this.form.email); 
          setDoc(cusRegRef, {
            UserID: user.uid,
            UserType: "Customer",
            Email: this.form.email,
            PhoneNo: this.form.phoneNo,
      });
        } else {
          console.log('No user signed in');
        }
      });
    },
    handleClick() {
      // do something when clicked
    }

  }
}
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
  .pa-7-wrapper {
    padding:15vh;
    padding-left: 30vw;
    padding-right: 30vw;
  }

</style>

