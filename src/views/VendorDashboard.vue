<template  v-if="user">
    <!-- <NavigationBar1/> -->
    <VendorBreadCrumbs/>
    <v-layout>
        <v-main>
            <v-row>
            <v-col cols="12" class="d-flex justify-end align-end">
            <v-parallax
                :src="imageURL"
                height="300"
                class="banner-container"
            >  
                    <div class="d-flex flex-column fill-height justify-center align-center text-white">
                    <div class="text-h1 font-weight-thin mb-4">
                        Welcome Back!
                    </div>

                    <div class="d-flex align-items-center profile-container">
                        <div class="text-h3 font-weight-thin mb-4 ml-2">
                        {{ name }}
                        </div>
                        <div class = "image-container">
                            <v-img 
                            :src="profilepic" 
                            contain 
                            class="profile-picture profile-picture--right"
                            accept="image/png, image/gif, image/jpeg"
                            width="100"
                            height="100"
                        ></v-img>  
                        </div>
                    </div>

                    <!-- <v-card class="translucent-card">
                        <v-card-text>
                            {{ name }}
                        </v-card-text>
                    </v-card> -->
                </div>

            </v-parallax>
            </v-col>
            </v-row>

            <v-row height = "1000">
                <v-col cols="6">
                    <div class="d-flex flex-column fill-height justify-center align-center text-black">
                    <br>
                    <h1 class="text-h4 font-weight-thin mb-4">
                        TOTAL LISTINGS
                    </h1>
                    <br>
                    <h4 class="text-h4 font-weight-thin mb-4">
                        {{ totalListings }} Items
                    </h4>
                    <br>
                    <br>
                    <v-row>
                    <v-col cols="6">
                    <v-btn @click="goVendorListing" color="primary" class="mr-5">View My Listing</v-btn>
                     </v-col>

                    <v-col cols="6">
                    <v-btn @click = "goCreateListing" color="primary" class="ml-5">Create Listing</v-btn>
                    </v-col>
                    </v-row>
                    
                    </div>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="6">
                    <div class="d-flex flex-column fill-height justify-center align-center text-black">
                    <br>
                    <h1 class="text-h4 font-weight-thin mb-4">
                        SALES TO DATE
                    </h1>
                    <br>
                    <h4 class="text-h4 font-weight-thin mb-4">
                        ${{ totalEarnings.toFixed(2) }}
                    </h4>
                    <br>
                    <br>
                    <v-btn 
                        @click = "goVendorReservation" 
                        color="primary"
                    >
                        View My Reservations
                    </v-btn>

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
import { getDoc, getDocs, collection, doc, updateDoc, setDoc, getFirestore} from 'firebase/firestore';
import { getAuth, onAuthStateChanged} from "@firebase/auth";
const db = getFirestore(firebaseApp);
const auth = getAuth();

export default {
    name: "VendorDashboard",
    data() {
      return {
        user: false,
        image: "",
        imageURL: "https://firebasestorage.googleapis.com/v0/b/bt3103-project-8c8a0.appspot.com/o/VendorBanner3.jpg?alt=media&token=c18e0ed8-74ba-486d-b24b-661a2ea45840",
        name: "",
        totalListings: 0,
        totalEarnings: 0,
        profilepic: null,
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
    },
    async mounted() {
        
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const vendorID = user.uid;

                // Get current vendor
                const curr_email = getAuth().currentUser.email;
                const userRef = await getDoc(doc(db, "Users", curr_email));
                const userName = userRef.data().Name;
                this.name = userRef.data().Name;

                
                const listingRef = await getDocs(collection(db, "food_listings"));
                const listing = listingRef.docs;
                for (const lis of listing) {
                    const lisObject = lis.data();
                    // console.log(lisObject.VendorID + " = " + vendorID)
                    if (lisObject.VendorID === vendorID) {
                        this.totalListings = this.totalListings + 1;
                    }
                }

                const reservationRef = await getDocs(collection(db, "reservation_orders"));
                const reservation = reservationRef.docs;
                for (const res of reservation) {
                    const resObject = res.data();
                    const restaurantName = resObject.cart[0].restaurant
                    if (restaurantName === this.name) {
                        this.totalEarnings = (this.totalEarnings + resObject.total);
                    }
                }
                //get profile picture
                const vendor_id = userRef.data().VendorID;
                const vendor_doc_id = (userRef.data().Name + vendor_id.substring(0,5)).replace(/\s+/g, '')
                const docRef2 = doc(db, "restaurant_personalisation", vendor_doc_id)
                const userDocument = await getDoc(docRef2);
                if (userDocument.exists()) {
                    const userData = userDocument.data();
                    this.profilepic = userData.ProfileURL;
                }
                //console.log(this.profilepic)
                /*
                const userRestaurant_PersonalisationId = userRef.data().Restaurant_PersonalisationId;
                const personalisationRef = await getDoc(doc(db, "restaurant_personalisation", userRestaurant_PersonalisationId));
                this.imageURL = personalisationRef.data().ProfileURL;
                console.log(personalisationRef.data().ProfileURL)
                */
            }
        })
        
    },
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

.profile-picture--right {
    --gradient-color: rgb(0, 0, 0); 
    --gradient-start: 0%; 
    --gradient-stop: 100%; 
    -webkit-mask-image: linear-gradient(to right, transparent var(--gradient-start), var(--gradient-color) var(--gradient-stop));
    display: flex;
    align-items: center;
}
.image-container {
    margin-left: 10px;
}

.banner-container {
  position: relative;
}

.text-h3 {
    top: 20%;
    position: relative;
}
</style>