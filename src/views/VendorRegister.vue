<template>
    <div class="container">
      <img id = "backgroundimg" src="@/assets/brooke-lark-wMzx2nBdeng-unsplash.jpg" alt = "">
      <div class="pa-6-wrapper">
        <v-app>
          <v-container>
            <v-card class="pa-6">
              <v-breadcrumbs-item :to="{ name: 'landing'}"><img id = "backgroundimg1" src="@/assets/foodhuntlogo.png" alt = "">
              </v-breadcrumbs-item>

              <h2 class="text-center mb-6" style="font-family:Nunito">Register</h2>
              <v-form ref="form" @submit.prevent="signup">

                <v-text-field
                  v-model="form.companyemail"
                  clearable label="Company Email"
                  type = "email"
                  required
                  :error-messages="formErrors.companyemail"
                  style="font-family:Nunito"
                ></v-text-field>

                <v-text-field
                  v-model="form.companypassword"
                  clearable label="Password"
                  required
                  :error-messages="formErrors.companypassword"
                  style="font-family:Nunito"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  hint="Minimum 6 characters"
                  @click:append="show1 = !show1"
            counter
                ></v-text-field>

                <v-text-field
                  v-model="form.companyname"
                  clearable label="Company Name"
                  required
                  :error-messages="formErrors.companyname"
                  style="font-family:Nunito"
                ></v-text-field>

                <v-text-field
                  v-model="form.companyregnum"
                  clearable label="Company Registration Number"
                  required
                  :error-messages="formErrors.companyregnum"
                  style="font-family:Nunito"
                  placeholder="123456789A"
                ></v-text-field>

                <v-btn
                    type="submit"
                    color="primary"
                    block
                    style="font-family:Nunito">
                    Register as vendor
                </v-btn>

              </v-form>
            </v-card>
          </v-container>
        </v-app>
      </div>
    </div>
    
    </template>
      
    <script>
    import firebaseApp from "../firebase";
    import { getFirestore } from "firebase/firestore";
    import { doc, setDoc, getDocs, collection } from "firebase/firestore";
    import firebase from 'firebase/compat/app';
    import 'firebase/compat/auth';
    import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "@firebase/auth";
    const db = getFirestore(firebaseApp); 
    
    export default {
      data() {
        return {
          form: {
            companyemail: '',
            companyname: '',
            companypassword: '',
            companyregnum: '',

          },
          file: null,
          formErrors: {},
          isLoading: false,
          show1: false,
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

          if (!this.form.companyemail) {
            this.formErrors.companyemail = ['Email is required'];
          } else if (!this.validEmail(this.form.companyemail)) {
            this.formErrors.companyemail = ['Please enter a valid email address'];
          }

          if (!this.form.companypassword) {
            this.formErrors.companypassword = ['Password is required'];
          } else if (this.form.companypassword.length < 6) {
            this.formErrors.companypassword = ['Password must be at least 6 characters'];
          }
          // if (this.form.password !== this.form.confirmPassword) {
          //   this.formErrors.confirmPassword = ['Passwords do not match'];
          // }

          if (!this.form.companyname) {
            this.formErrors.companyname = ['Company name is required'];
          }

          if (!this.form.companyregnum) {
            this.formErrors.companyregnum = ['Company registration number is required'];
          } else if (this.form.companyregnum.length != 10) {
            this.formErrors.companyregnum = ['Company registration number must be valid'];
          } else if(this.checkRegFirst9(this.form.companyregnum)) { 
            this.formErrors.companyregnum = ['First 9 characters of company registration number must be numerical'];
          } else if(this.checkRegLast(this.form.companyregnum)) {
            this.formErrors.companyregnum = ['Last character of company registration number must be an alphabet'];
          } else if(await this.checkRegExist(this.form.companyregnum)) {
            this.formErrors.companyregnum = ['Company registration number exist'];
          }

          // Submit form if no errors
          if (Object.keys(this.formErrors).length === 0) {
            try {
              console.log('Form submitted:', this.form);
              const user = await createUserWithEmailAndPassword(getAuth(), this.form.companyemail, this.form.companypassword);
              
              //console.log(user);
              //console.log(user.uid);


              //const auth = firebase.auth();
              //await auth.createUserWithEmailAndPassword(this.email, this.password);
              //const docRef = await frebaseApp.createUserWithEmailAndPassword(this.email, this.password);
              //console.log(user.uid);
              await this.updateVendor();
              this.$router.push('/vendor-personalisation')
              // You can use your backend API to handle the signup process here
            } catch(error) {
              console.log(error.message);
              this.formErrors.email = [error.message];
            }
          }
        },

        validEmail(companyemail) {
          // Email validation code
          const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?!.*\.\w{2,})(?:[a-zA-Z]{2,}|xn--[a-zA-Z0-9]+)/;
          return regex.test(companyemail.trim());
        },
        
        checkRegFirst9(coyregno) {
          return !/^\d{9}$/.test(coyregno.slice(0, 9));
        },

        checkRegLast(coyregno) {
          return !/[A-Z]/.test(coyregno.slice(-1));
        },

        async checkRegExist(regNo) {
          this.allCoyReg = []; // Reset the array at the beginning
          const userRef = await getDocs(collection(db, "Users"));
          userRef.forEach((doc) => {
            this.allCoyReg.push(doc.data().RegistrationNo)
          });
          return this.allCoyReg.includes(regNo); 
        },
       
        async updateVendor() {
          getAuth().onAuthStateChanged(vendor => {
            if (vendor) {
              const vendorRegRef = doc(db, "Users", this.form.companyemail);
              setDoc(vendorRegRef, {
                VendorID: vendor.uid,
                UserType: "Vendor",
                Email: this.form.companyemail,
                RegistrationNo: this.form.companyregnum,
                Name: this.form.companyname,
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
    };
    </script>
    
    <style scoped>
      #backgroundimg {
        width: 100vw;
        margin-top: -9%;
        height: auto;
        position: absolute;
      }
    
      #backgroundimg1{
        width:10vw;
      }
      .pa-6-wrapper {
        padding:10vh;
        padding-left: 30vw;
        padding-right: 30vw;
      }
    
    </style>