<template  v-if="user">
    <!-- <NavigationBar1/> -->
    <VendorBreadCrumbs/>
    <v-layout>
        <v-main>
            <v-row>
            <v-col cols="12">
            <v-parallax
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                height="300"
            >
                <div class="d-flex flex-column fill-height justify-center align-center text-white">
                <h1 class="text-h4 font-weight-thin mb-4">
                    Welcome Back!
                </h1>
                <h4 class="subheading">
                    "Company name"
                </h4>
                </div>
            </v-parallax>
            </v-col>
            </v-row>

            <v-row height = "300">
                <v-col cols="6">
                    <div class="d-flex flex-column fill-height justify-center align-center text-black">
                    <h1 class="text-h4 font-weight-thin mb-4">
                        Total Listings
                    </h1>
                    <h4 class="subheading">
                        "number"
                    </h4>
                    <br>
                    <v-row>
                    <v-col>
                    <v-btn @click="goVendorListing" variant="outlined">View My Listing</v-btn>
                     </v-col>

                    <v-col>
                    <v-btn @click = "goCreateListing" variant="outlined">Create Listing</v-btn>
                    </v-col>
                    </v-row>
                    
                    </div>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="6">
                    <div class="d-flex flex-column fill-height justify-center align-center text-black">
                    <h1 class="text-h4 font-weight-thin mb-4">
                        Sales to Date
                    </h1>
                    <h4 class="subheading">
                        "number"
                    </h4>
                    <br>
                    <v-btn @click = "goVendorReservation" variant="outlined">View My Reservations</v-btn>

                    </div>
                </v-col>
            </v-row>
        </v-main>
      </v-layout>

  </template>

  
<script>
import NavigationBar1 from '@/components/NavigationBar1.vue'
import VendorBreadCrumbs from '@/components/VendorBreadCrumbs.vue';
import firebaseApp from "../firebase";
import { collection, getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, signOut } from "@firebase/auth";
const db = getFirestore(firebaseApp);

export default {
    name: "VendorDashboard",
    data() {
      return {
        user: false,
      }
    },
    components:{
        //NavigationBar1,
        VendorBreadCrumbs
    },
    methods: {
        goCreateListing() {
            this.$router.push('/create-listing')
        },
        goVendorListing() {
            this.$router.push('/vendor-listing')
        },
        goVendorReservation() {
            this.$router.push('/vendor-reservation')
        },
    }
}
</script>

<style scoped>
#girlImage{
    width: 100%;
    height: auto;
    opacity: 1;
}

#heading { 
    font-size: 3vw;
}

#box {
    margin-top: 16vh;
    margin-left: 5vw;
    width:625px;
    height:625px;
    padding: 20px;
    background: white;
    position: absolute; 
    border-radius: 25px;
    box-shadow: 6.1px 12.2px 12.2px hsl(0deg 0% 0% / 0.31);
    font-size: smaller;
    top: 30px;
    left: 16px;
    text-align: center;
    letter-spacing: 0.1em;
    line-height: 2;
    opacity: 0.73;
}
</style>