<template>
    <v-col cols="7">     
      <v-card
          :loading="loading" 
          height="100%"
          width="100%"
          style="margin-left:36% ; margin-top: 25px; border-radius:15px"
        >
        <v-img
          cover
          height="300"
          :src= defaultVendorImg
          onerror="this.src='defaultVendorImg'"      
        ></v-img>

          <v-card-item>
            <v-row>
              <v-col cols="7">
                <v-card-title style="font-family:Nunito; font-size: 2em;">{{ this.reservationNumber }}</v-card-title>
                <v-card-subtitle style="font-family:Nunito; font-size: 1.em;">Order from</v-card-subtitle>
                <v-card-subtitle style="font-family:Nunito; font-size: 1.em;">Order Time and Date</v-card-subtitle>
              </v-col>
              <v-col cols="5">
                <br>
                <v-card-subtitle style="font-family:Nunito; text-align:right">{{ this.details.name }}</v-card-subtitle>
                <v-card-subtitle style="font-family:Nunito; text-align:right">{{ this.details.dateTimeString }}</v-card-subtitle>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row
            v-for="prod in details.cart" 
                  :key="prod.item" 
                  min-height="auto" 
            >
            <!-- <v-col cols="1">
              <v-img
                      :src="prod.ImageURL"
                      contain
                      style="width:100px"
            ></v-img>
            </v-col> -->
            <v-col cols="7"> 
              <v-card-subtitle style="font-family:Nunito; text-align:left; align-self:center;">     
                            
                  {{ prod.quantity }}X {{ prod.item }}</v-card-subtitle>
            </v-col>
            <v-col cols="5">
                <v-card-subtitle style="font-family:Nunito; text-align:right;  align-self:center;">${{ prod.subtotal ? prod.subtotal.toFixed(2) : '' }}</v-card-subtitle>
            </v-col>
            <v-divider></v-divider>
            </v-row>

            <v-row>
              <v-col cols="3">
                <v-card-subtitle style="font-family:Nunito; font-size: 1.em;">Total</v-card-subtitle>
                <v-card-subtitle style="font-family:Nunito; font-size: 1.em;">Payment by</v-card-subtitle>
                <v-card-subtitle style="font-family:Nunito; font-size: 1.em;">Pickup By</v-card-subtitle>
                <v-card-subtitle style="font-family:Nunito; font-size: 1.em;">Pickup Location</v-card-subtitle>
              </v-col>
              <v-col cols="9">
                <v-card-subtitle style="font-family:Nunito; font-size: 1.em; text-align:right">${{this.details.total ? this.details.total.toFixed(2) : ''}}</v-card-subtitle>
                <v-card-subtitle style="font-family:Nunito; font-size: 1.em; text-align:right">In store payment</v-card-subtitle>
                <v-card-subtitle style="font-family:Nunito; font-size: 1.em; text-align:right">{{ this.details.pickUpTime }}</v-card-subtitle>
                <v-card-subtitle style="font-family:Nunito; font-size: 1.em;text-align:right">{{ this.details.address }}</v-card-subtitle>
              </v-col>
            </v-row>
            <v-divider inset></v-divider>
          </v-card-item>
          <v-btn 
            color="primary" 
            width="5000"
            @click="confirm"
            style="border-radius:10px"
          >
            Confirm Reservation
          </v-btn>
          <br>
          <br>
        </v-card>
    </v-col>    
</template>

<script>
import firebaseApp from "../firebase";
import { getFirestore } from 'firebase/firestore';
import { getDoc, deleteDoc, collection, doc, updateDoc} from 'firebase/firestore';
import { useToast } from 'vue-toastification'
import { getAuth, onAuthStateChanged} from "@firebase/auth";
const db = getFirestore(firebaseApp);
const toast = useToast();

export default {
name: "ConfirmationCard",
props: {
    reservationNumber: {
      type: String,
      required: true,
    }
}, 
data() {
  return {
    details: [],
    useremail: '',
    vendorImageURL: null,
    defaultVendorImg: "https://firebasestorage.googleapis.com/v0/b/bt3103-project-8c8a0.appspot.com/o/vendorProfilePic%2F30624445_2031384813783830_665928700650323968_n-copy.jpegnu9X4EMLI8PpMPJdUvTLGsmEOLr2?alt=media&token=6b94b427-eb0c-4d8e-98e6-e2226c2f5e7c",
  }
},    
async mounted() {
  const auth = getAuth();
     onAuthStateChanged(auth, (user) => {
      if (user) {
        this.useremail = auth.currentUser.email;
        this.retrieveReservation();
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
    });
  }, 
  methods: {
    async retrieveReservation() {
      const reserveRef = doc(db, "reservation_orders", this.reservationNumber);
      const docSnap = await getDoc(reserveRef); 
      if (docSnap.exists()) {
        const documentData = docSnap.data();
        if(documentData.user === this.useremail) {
          this.vendorImageURL = "https://picsum.photos/id/237/200/300";
          const cart = documentData.cart;
          const foodID = cart[0].foodID
          const foodRef = doc(db, "food_listings", foodID);
          const foodRefData = await getDoc(foodRef); 
          const foodRefPersID = foodRefData.data().Restaurant_PersonalisationId
          const restaurantPers = doc(db, "restaurant_personalisation", foodRefPersID);
          const restaurantPersData = await getDoc(restaurantPers); 
          const address = restaurantPersData.data().Address
          const name = cart[0].restaurant
          const now = new Date()
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          const currentDay = days[now.getDay()]
          const closingTime = restaurantPersData.data()[currentDay].split(' - ')[1]        
          const timestamp = documentData.createdAt;
          const date = timestamp.toDate();
          const dateString = date.toDateString();
          const timeString = date.toLocaleTimeString();
          const dateTimeString = dateString + ' ' + timeString;
          const pickUpTime = dateString +", " + closingTime
          const total = documentData.total;
          this.details = {
                name,
                cart, 
                dateTimeString, 
                total,
                address,
                pickUpTime
          }
        } else {
          toast.error("Access denied!", {
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
          this.$router.push('/restaurantlisting');
        }
      } else {
        toast.error("No reservation found!", {
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
          this.$router.push('/restaurantlisting');
        }
      }, 
      async confirm() {
      let canConfirm = true;
      const reserveRef = doc(db, "reservation_orders", this.reservationNumber);
      for (const item of this.details.cart) {
        const productRef = doc(db, "food_listings", item.foodID);
        const thisproductData = await getDoc(productRef);
        if (thisproductData.data().AvailableQty < item.quantity) {
          canConfirm = false;
          break;
        } 
      }

      if (canConfirm) {
        for (const item of this.details.cart) {
          const productRef = doc(db, "food_listings", item.foodID);
          const thisproductData = await getDoc(productRef);
          await updateDoc(productRef, {
          AvailableQty: thisproductData.data().AvailableQty - item.quantity
        })
      }
        updateDoc(reserveRef, {
        confirmed: true
        })
        toast.success("Reservation confirmed! Happy Hunting!", {
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
                
      } else {
        await deleteDoc(reserveRef);
        toast.error("Product quantity is not available, please try again!", {
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
    }
    this.$router.push('/restaurantlisting') 
    } 
  },

}

</script>

<style scoped>
</style> 
