<template>
      <v-parallax
      :src="backgroundImg"
      >
  <NavigationBar1/>
      <v-container>
      <div class="pa-7-wrapper">
      <h2 style="font-family:Nunito;" class="text-left mb-7">Your Profile</h2>
      <v-card class="pa-7">
        <v-form ref="form" @submit.prevent="updatePI">
          <h2 style="font-family:Nunito;" class="text-center mb-7">Personal Information</h2>
          <h3 style="font-family:Nunito;" class="text-left mb-7">Email</h3>
          <v-text-field
            v-model="form.email"
            type="email"
            style="font-family:Nunito"
            :readonly="isReadOnly"
          ></v-text-field>
          <h3 style="font-family:Nunito;" class="text-left mb-7">Phone number</h3>
           <v-text-field
            v-model="form.phoneNo"
            type="text"
            style="font-family:Nunito"
            :readonly="isReadOnly"
            :error-messages="formErrors.phoneNo"
          ></v-text-field>
          <v-alert
            type="success"
            title="Success!"
            text="Successfully updated personal information"
            v-if="showPISuccess"
            closable
          ></v-alert>
          <!-- <br>
          <v-btn id="pibtn" type="submit" color="primary" block style="font-family:Nunito;">Save changes</v-btn>
          <br> -->
        </v-form>
        <v-form ref="form2" @submit.prevent="updatePW">
          <h2 style="font-family:Nunito;" class="text-center mb-7">Password</h2>
            <v-alert
            type="success"
            title="Success!"
            text="Password reset email sent to your inbox"
            v-if="showPWSuccess"
            closable
          ></v-alert>
          <br>
          <v-btn id="pwbtn" type="submit" color="primary" block style="font-family:Nunito;">Reset password</v-btn>
        </v-form>
      </v-card>
      </div>
    </v-container>
  </v-parallax>
</template>

  <script>
  import firebaseApp from "../firebase";
  import NavigationBar1 from '@/components/NavigationBar1.vue'
  import { collection, getFirestore, updateDoc } from "firebase/firestore"
  import { doc, setDoc, getDoc, getDocs } from "firebase/firestore";
  import { getAuth, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
  import { useToast } from 'vue-toastification'
  const toast = useToast();
  const db = getFirestore(firebaseApp);
  
  export default {
    name: 'CustProfile',
    components:{
    NavigationBar1
  }, 
    data() {
      return {
        user: false, 
        form: {
          email: '',
          phoneNo: '',
        },
        formErrors: {},
        showPISuccess: false,
        showPWSuccess: false,
        isReadOnly: true,
        backgroundImg: "https://firebasestorage.googleapis.com/v0/b/bt3103-project-8c8a0.appspot.com/o/VendorBackground3.jpg?alt=media&token=b39dfd4b-eb7e-4164-977e-39a8498bcfbd"
      }
    },
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
            this.form.email = userData.Email;
            this.form.phoneNo = userData.PhoneNo;
          } else {
            console.log("User document not found");
          }
        } else {
          if (this.$route.path.split('/').pop() !== "restaurantlisting") {
            toast.error("Access denied! Please sign in!", {
              position: "top-right",
              timeout: 2019,
              closeOnClick: true,
              pauseOnFocusLoss: false,
              pauseOnHover: false,
              draggable: true,
              draggablePercent: 2,
              showCloseButtonOnHover: false,
              hideProgressBar: false,
              closeButton: "button",
              icon: true,
              rtl: false
            });
            this.$router.push('/login');
          } else { 
            this.$router.push('/login');
          }
        }
      })
    },
    methods : {
      async updatePI() {
        this.formErrors = {};
        this.showPISuccess = false;

        // if (!this.validEmail(this.form.email)) {
        //   this.formErrors.email = ['Please enter a valid email address'];
        // }

        if (!this.validPhoneNo(this.form.phoneNo)) {
          this.formErrors.phoneNo = ['Please enter a valid SG number']
        } else if (await this.PhoneNoUsed(this.form.phoneNo)) {
        this.formErrors.phoneNo = ['Phone number in use']
        }

        console.log(this.formErrors);

        if (Object.keys(this.formErrors).length === 0) {
          try {
            console.log('Form submitted:', this.form);
            await this.updatePIfirebase()
          } catch(error) {
            console.log(error.message);
          }
        }
          
      },

      // validEmail(email) {
      // // Email validation code
      // const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?!.*\.\w{2,})(?:[a-zA-Z]{2,}|xn--[a-zA-Z0-9]+)/;
      // return regex.test(email.trim());
      // },

      // validPhoneNo(phoneNo) {
      //   const SGNo = ["6", "8", "9"];
      //   if (phoneNo.length != 8) {
      //     return false;
      //   }
      //   if (! SGNo.includes(phoneNo.substring(0, 1))) {
      //     return false;
      //   }
      //   return true;
      // },

      // async PhoneNoUsed(phoneNo) {
      // this.allphoneNo = []; // Reset the array at the beginning
      // const userRef = await getDocs(collection(db, "Users"));
      // userRef.forEach((doc) => {
      //   this.allphoneNo.push(doc.data().PhoneNo)
      // });
      // return this.allphoneNo.includes(phoneNo); 
      // },

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

    //   async updatePIfirebase() {
    //     const auth = getAuth();
    //     onAuthStateChanged(auth, user => {
    //       if (user) {
    //         const userID = user.uid;
    //         console.log("User ID: " + userID);
    //         const docRef = doc(db, "Users", this.user.email)
    //         setDoc(docRef, {
    //         UserID: userID,
    //         UserType: "Customer",
    //         Email: this.form.email,
    //         PhoneNo: this.form.phoneNo
    //         }).then(docRef =>
    //           this.showPISuccess="true"
    //         )
    //       } else {
    //         console.log('error');
    //       }
    //     });
    // },
  }
}
</script>

<style scoped>
  .pa-7-wrapper {
    padding:15vh;
    margin-top:-50px;
  }
</style>
