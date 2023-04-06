<template>
    <v-parallax
      :src="backgroundImg"
    >
    <div class="container">
      <VendorBreadCrumbs/>
      <div class="pa-6-wrapper">

        <v-container>
        <v-card class="pa-6">

          <h2 class="text-center mb-6" style="font-family:Nunito">Company Information</h2>
          <!-- <v-form ref="form" @submit.prevent="updateDetails"> -->
            <!-- Display of email, name and registration number which CANNOT BE CHANGED, only profile pic can be changed-->
            <v-form ref="form">
              <h3 style="font-family:Nunito;" class="text-left mb-7">Company Email</h3>
              <v-text-field
              v-model="form.companyemail"
                :label="companyLabel"
                required
                :error-messages="formErrors.companyemail"
                style="font-family:Nunito"
                readonly
              ></v-text-field>

              <h3 style="font-family:Nunito;" class="text-left mb-7">Company Name</h3>
              <v-text-field
                v-model="form.companyname"
                :label="companyName"
                required
                :error-messages="formErrors.companyname"
                style="font-family:Nunito"
                readonly
              ></v-text-field>

              <h3 style="font-family:Nunito;" class="text-left mb-7">Company Registration Number</h3>
              <v-text-field
                v-model="form.companyregnum"
                :label="companyRegNum"
                required
                :error-messages="formErrors.companyregnum"
                style="font-family:Nunito"
                readonly
              ></v-text-field><br>

              <!-- <v-divider class="border-opacity-25"></v-divider><br> -->

              <!-- <center>
                  <h4 style="font-family:Nunito">Company Profile Image</h4> 
                  <v-img 
                  :src="image" 
                  :width="100" 
                  :height="100" 
                  contain class="ma-4"
                  accept="image/png, image/gif, image/jpeg"
                  ></v-img>          
              </center> -->

              <!-- Image picker-->
              <!-- <div id = 'imagePicker'>

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
                  style="font-family:Nunito">
                  Save new profile image
              </v-btn><br><br> -->
            </v-form>

            <!-- changing of passwords-->
            <v-form ref="form2" @submit.prevent="updatePW">
              <v-divider class="border-opacity-25"></v-divider><br>

              <h2 class="text-center mb-6" style="font-family:Nunito">Password</h2>

              <v-alert
              type="success"
              title="Success!"
              text="Password reset email sent to your inbox"
              v-if="showPWSuccess"
              closable
              ></v-alert>
              <br>
              <v-btn id="pwbtn" type="submit" color="primary" block style="font-family:Nunito;">Reset password</v-btn><br><br>

              <!-- <v-text-field
                v-model="form.companyoldpassword"
                label="Old Password"
                type="password"
                required
                :error-messages="formErrors.companyoldpassword"
                style="font-family:Nunito"
              ></v-text-field>

              <v-text-field
                v-model="form.companynewpassword"
                label="New Password"
                type="password"
                required
                :error-messages="formErrors.companynewpassword"
                style="font-family:Nunito"
              ></v-text-field>

              <v-btn
                  type="submit"
                  color="primary"
                  class="mt-6"
                  :loading="isLoading"
                  block
                  style="font-family:Nunito">
                  Save Changes
              </v-btn><br><br> -->

              <v-divider class="border-opacity-25"></v-divider><br>
            </v-form>

            <!-- got to personalisation-->
            <v-btn
                  type="submit"
                  color="primary"
                  class="mt-6"
                  :loading="isLoading"
                  block
                  href="/vendor-profileedittwo"
                  style="font-family:Nunito">
                  Go to personalisation
              </v-btn>
        </v-card>
      </v-container>
    
      </div>
    </div>
    </v-parallax>

    </template>
      
    <script>
    import VendorBreadCrumbs from '../components/VendorBreadCrumbs.vue'
    import firebaseApp from "../firebase";
    import { getDoc, getFirestore } from "firebase/firestore";
    import { doc, updateDoc} from "firebase/firestore";
    import 'firebase/compat/auth';
    import { getAuth, onAuthStateChanged, sendPasswordResetEmail} from "@firebase/auth";
    const db = getFirestore(firebaseApp); 

    export default {
      data() {
        return {
          form: {
            companyemail: '',
            companyname: '',
            companyoldpassword: '',
            companynewpassword: '',
            companyregnum: '',

          },
          // companyLabel: "",
          // companyName: '',
          // companyRegNum: '',
          formErrors: {},
          isLoading: false,
          showPWSuccess: false,
          backgroundImg: "https://firebasestorage.googleapis.com/v0/b/bt3103-project-8c8a0.appspot.com/o/VendorBackground3.jpg?alt=media&token=b39dfd4b-eb7e-4164-977e-39a8498bcfbd"

        };
      },
      //To display information form firebase in v-fields
      async mounted() {
        const auth = getAuth()
        onAuthStateChanged(auth, async (user) => {
            if (user) {
            this.user = user
            console.log(this.user.email)
            const docRef = doc(db, "Users", this.user.email)
            const userDocument = await getDoc(docRef);
            if (userDocument.exists()) {
              const userData = userDocument.data();
              this.form.companyemail = userData.Email;
              this.form.companyregnum = userData.RegistrationNo;
              this.form.companyname = userData.Name;
            } else {
              console.log("User document not found");
            }
          }
        })

        //Get email first
        // const curr_email = getAuth().currentUser.email;
        // this.companyLabel = curr_email;

        //Get other information
        // const db = getFirestore();
        // const UserDocRef = doc(db, "Users", curr_email)
        // const docSnap = await getDoc(UserDocRef)
        // const Docdata = docSnap.data();
        // this.form.companyname = Docdata.Name
        // this.companyRegNum = Docdata.RegistrationNo
      },
      components:{
        VendorBreadCrumbs
      },
      // computed: {
      //   image() {
      //   if (this.file) {
      //       console.log("Got image");
      //       return URL.createObjectURL(this.file); 
      //   }  else {
      //       console.log("NOO image");
      //       return 'https://via.placeholder.com/500';
      //   }
      //   }
      //  },
      methods: {
        // Change password
        async updatePW() {
        const auth = getAuth();
        onAuthStateChanged(auth, user => {
          if (user) {
            sendPasswordResetEmail(auth, user.email)
            this.showPWSuccess="true"
            console.log("pw email success")
          } else {
            console.log('error');
          }
        })},

        //IN CASE WANT TO CHANGE NAME/EMAIL/REGNUM NEXT TIME
        // async updateCompanyRegNum() {
        //   console.log('running updateCompanyRegNum')
        //   try {
        //     const curr_email = getAuth().currentUser.email;
        //     const UserDocRef = doc(db, "Users", curr_email);
        //     await updateDoc(UserDocRef, {
        //       RegistrationNo: this.form.companyregnum,
        //     });
        //     this.companyRegNum = this.form.companyregnum
        //   } catch (error) {
        //     console.log(error)
        //   }
        // },
        // async updateDetails() {
        //   console.log('running updateDetails')

        //   this.isLoading = true;

        //   try {
        //     await this.updateCompanyRegNum();
        //     this.isLoading = false;
        //     console.log("Deets updated")
        //   } catch (error) {
        //     console.error("error leh")
        //     this.isLoading = false
        //   }
        // }
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