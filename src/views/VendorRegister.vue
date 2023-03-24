<template>
    <div class="container">
      <img id = "backgroundimg" src="@/assets/loginbg.jpg" alt = "">
      <div class="pa-6-wrapper">
    
        <v-container>
        <v-card class="pa-6">
          <v-breadcrumbs-item :to="{ name: 'landing'}"><img id = "backgroundimg1" src="@/assets/foodhuntlogo.png" alt = "">
          </v-breadcrumbs-item>

          <h2 class="text-center mb-6" style="font-family:Nunito">Register</h2>
          <v-form ref="form">

            <v-text-field
              v-model="form.companyemail"
              label="Company Email"
              required
              :error-messages="formErrors.companyemail"
              style="font-family:Nunito"
            ></v-text-field>

            <v-text-field
              v-model="form.companypassword"
              label="Password"
              type="password"
              required
              :error-messages="formErrors.companypassword"
              style="font-family:Nunito"
            ></v-text-field>

            <v-text-field
              v-model="form.companyname"
              label="Company Name"
              required
              :error-messages="formErrors.companyname"
              style="font-family:Nunito"
            ></v-text-field>

            <v-text-field
              v-model="form.companyregnum"
              label="Company Registration Number"
              required
              :error-messages="formErrors.companyregnum"
              style="font-family:Nunito"
            ></v-text-field>

            <center>
                <h4 style="font-family:Nunito">Company Profile Image</h4> 

                <v-img 
                :src="image" 
                :width="100" 
                :height="100" 
                contain class="ma-4"
                accept="image/png, image/gif, image/jpeg"
                ></v-img>          
            </center>

            <!-- Image picker-->
            <div id = 'imagePicker'>

                <v-file-input 
                prepend-icon="mdi-camera" 
                v-model="file" 
                label="Upload Image"
                ></v-file-input>
            </div>

            <v-btn
                type="submit"
                color="primary"
                class="mt-6"
                :loading="isLoading"
                block
                href="/vendor-personalisation"
                style="font-family:Nunito">
                Continue
            </v-btn>

          </v-form>
        </v-card>
      </v-container>
    
      </div>
    </div>
    
    </template>
      
    <script>
    //import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, setPersistence, browserSessionPersistence } from "@firebase/auth";
    //import firebaseApp from "../firebase";
    //import firebase from 'firebase/compat/app';
    //import { firebase } from 'firebase/app';
    //const auth = getAuth();
    
    export default {
      data() {
        return {
          form: {
            companyemail: '',
            companyname: '',
            companypassword: '',
            companyregnum: '',

          },
          formErrors: {},
          isLoading: false,
        };
      },
      computed: {
        image() {
        if (this.file) {
            console.log("Got image");
            return URL.createObjectURL(this.file); 
        }  else {
            console.log("NOO image");
            return 'https://via.placeholder.com/500';
        }
        }
       },
      methods: {
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