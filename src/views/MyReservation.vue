<template>  
  <v-parallax
      :src="vendorImageURL2"
    >
    <NavigationBar1/>
    <div v-if="reservations.length === 0 && !showPlaceholder">
      <div class="loader"></div>
        <h1 id="loadingmessage" >Loading your reservations...</h1>
      </div>
    <EmptyReservation v-else-if="reservations.length === 0 && showPlaceholder"/>
    <div v-else style="margin-left:320px;">
      <br>
      <br>
      <v-card
        class="mx-auto rounded-card" 
        max-width=1230
      >
      <div class="text-h5 pa-5"> All reservations at a glance...</div>
      <v-divider></v-divider> 
      <v-row>
        <v-col cols="4">
          <div class="list-container">
            <v-card 
              v-for="reservation in reservations" 
              key="reservation.id" 
              @click="selectReservation(reservation)"
              :color="reservation === selected_reservation ? 'primary' : undefined"
              min-height="190"
            >
              <br>
              <v-row>
                <v-col cols="4">
                  <v-avatar class="mx-auto d-flex" size="100">
                    <v-img :src="reservation.vendor.ProfileURL" contain class="white--text"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <v-row>
                    <div class="text-h6 mb-1">{{ reservation.reservationNo }}</div>
                  </v-row>
                  <v-row>
                    <div class="text-subtitle-2 mb-1">{{ reservation.cart[0].restaurant }}</div>
                  </v-row>
                  <v-row>
                    <div class="text-subtitle-2 mb-1">{{ reservation.createdAt.toDate().toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' }) }}</div>
                  </v-row>
                  <v-row>
                    <div class="text-h5 mb-1" >${{ reservation.total.toFixed(2) }}</div>
                  </v-row>
                  <v-row>
                    <v-chip>{{ reservation.isPickedUp ? 'Completed' : 'Pending Pickup' }}
                      </v-chip>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-col>
        <v-col cols="8">     
            <v-card
              :loading="loading"
              height="100%"
              width="100%"
            >
              <template v-slot:loader="{ isActive }">
                <v-progress-linear
                  :active="isActive"
                  color="deep-purple"
                  height="4"
                  indeterminate
                ></v-progress-linear>
              </template>
              <v-img
                cover
                height="300"
                :src= defaultVendorImg
                onerror="this.src='defaultVendorImg'"
              ></v-img>
              <v-card-item>
                <v-row>
                  <v-col cols="8">
                    <v-card-title>{{ selected_reservation.reservationNo }}</v-card-title>
                    <br>
                    <v-card-subtitle>Order Time and Date</v-card-subtitle>
                    <v-card-subtitle>Order from</v-card-subtitle>      
                  </v-col>
                  <v-col cols="4" class="text-right">
                    <v-card-subtitle>{{ selected_reservation.isPickedUp ? 'Completed' : 'Pending Pickup' }}</v-card-subtitle>
                    <br>
                    <v-card-subtitle class="me-1">{{ selected_reservation.createdAt.toDate().toLocaleString('en-SG', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) }}</v-card-subtitle>
                    <v-card-subtitle class="me-1 no-wrap">{{ selected_reservation.vendor.Name}}</v-card-subtitle>

                  </v-col>
                </v-row>
                <br>
                <v-divider class='mb-1'></v-divider>
                <v-row v-for="order in selected_reservation.cart" :key="order.id" class="my-1">
                  <v-col cols="9" class="text-left"> 
                    <v-card-subtitle> {{ order.quantity }} X {{ order.item }}</v-card-subtitle>
                  </v-col>
                  <v-col cols="3" class="text-right">
                    <v-card-subtitle class="me-1 text-right">${{ order.subtotal.toFixed(2) }}</v-card-subtitle>
                  </v-col>
                </v-row>
                <v-divider class="mb-1"></v-divider>
                <v-row>
                  <v-col cols="5">
                    <br>
                    <v-card-subtitle>Total</v-card-subtitle>
                    <v-card-subtitle>Paid by</v-card-subtitle>
                    <v-card-subtitle>Pickup Location</v-card-subtitle>
                  </v-col>
                  <v-col cols="7" class="text-right">
                    <br>
                    <v-card-subtitle class="me-1">${{ selected_reservation.total.toFixed(2) }}</v-card-subtitle>
                    <v-card-subtitle class="me-1">In-store payment</v-card-subtitle>
                    <v-card-subtitle class="me-1 no-wrap">{{ selected_reservation.vendor.Address }}</v-card-subtitle>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                <br>
                <v-btn v-if="!selected_reservation.isPickedUp" rounded="lg" color="red" @click="cancelReservation(selected_reservation.reservationNo)"> Cancel Reservation</v-btn>
              </v-card-item>
            </v-card>
        </v-col>
      </v-row> 
      </v-card>
    </div>
    <br><br><br>
  </v-parallax>
</template>

<script> 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useToast } from 'vue-toastification'
import firebaseApp from "../firebase";
import { getFirestore, doc, getDoc, getDocs, setDoc, updateDoc, collection, deleteDoc, serverTimestamp} from 'firebase/firestore';
import NavigationBar1 from '@/components/NavigationBar1.vue'
import EmptyReservation from '@/components/EmptyReservation.vue'
const toast = useToast();
const db = getFirestore(firebaseApp);

export default {
  name: "MyReservation",
  components:{
    NavigationBar1,
    EmptyReservation
  },
  data() {
    return {
      useremail: '',
      reservations: [],
      selected_reservation: null,
      showDialog: false,
      showPlaceholder: false,
      vendorImageURL2: "https://firebasestorage.googleapis.com/v0/b/bt3103-project-8c8a0.appspot.com/o/VendorBackground3.jpg?alt=media&token=b39dfd4b-eb7e-4164-977e-39a8498bcfbd",
      defaultVendorImg: "https://firebasestorage.googleapis.com/v0/b/bt3103-project-8c8a0.appspot.com/o/vendorProfilePic%2F30624445_2031384813783830_665928700650323968_n-copy.jpegnu9X4EMLI8PpMPJdUvTLGsmEOLr2?alt=media&token=6b94b427-eb0c-4d8e-98e6-e2226c2f5e7c",
    }
  },

  async mounted() {
    setTimeout(() => {
        this.showPlaceholder = true;
      }, 1000);
  },
  
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.useremail = auth.currentUser.email;
        this.getReservations();
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
    async getVendor(reservation) {
      const foodID = reservation.cart[0].foodID
      const itemRef = doc(db, "food_listings", foodID);
      const itemDoc = await getDoc(itemRef);
      const restaurantID = itemDoc.data().Restaurant_PersonalisationId
      const restaurantRef = doc(db, "restaurant_personalisation", restaurantID);
      const restaurantDoc = await getDoc(restaurantRef);
      return restaurantDoc.data()
    },
    async getReservations() {
      const querySnapshot = await getDocs(collection(db, "reservation_orders"))
      const allReservations = querySnapshot.docs
        .filter(doc => doc.data().user === this.useremail && doc.data().confirmed)
        .sort((a, b) => {
          if (a.data().isPickedUp && !b.data().isPickedUp) {
            return 1;
          } else if (!a.data().isPickedUp && b.data().isPickedUp) {
            return -1;
          } else {
            const dateA = a.data().createdAt.toDate();
            const dateB = b.data().createdAt.toDate();
            return dateB - dateA;
          }
        });

      const modifiedReservations = await Promise.all(allReservations.map(async reservation => {
        const vendorData = await this.getVendor(reservation.data());
        const updatedReservation = { ...reservation.data(), vendor: vendorData };
        reservation.vendor = vendorData;
        return updatedReservation;
      }));
      this.reservations = modifiedReservations.map(doc => doc);

      if (this.reservations.length > 0) {
        this.selected_reservation = this.reservations[0]
      };
    },
    async cancelReservation(reservationNo) {
        this.$swal.fire({
            title: 'Are you sure?',
            text: "Please confirm that you are cancelling the reservations?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
          }).then(async (result) => {
            if (result.isConfirmed) {
              this.showDialog = false;
              const deleted_reservation = doc(db, "reservation_orders", reservationNo);
              const deleted_reservation_data = await getDoc(deleted_reservation);
              const products = deleted_reservation_data.data().cart  
              const deletedItems = products.map(product => ({foodID: product.foodID, quantity: product.quantity}));

              for (const item of deletedItems) {
                const itemRef = doc(db, "food_listings", item.foodID);
                const itemDoc = await getDoc(itemRef);
                const availableQty = itemDoc.data().AvailableQty;
                await updateDoc(itemRef, { AvailableQty: availableQty + item.quantity });
              }
              await deleteDoc(doc(db, "reservation_orders", reservationNo));
              await this.getReservations();
              toast.success("Reservation cancelled!", {
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
          })
    },
    async selectReservation(reservation) {
      this.selected_reservation = reservation;
    }
  }
}
</script>

<style scoped> 
.v-card-subtitle {
  opacity: 1;
}
.v-card-subtitle.me-1.no-wrap {
  white-space:normal;
}
.list-container {
  height: auto; /* set a fixed height */
  overflow-y: scroll; /* make the container scrollable */
}

* {
box-sizing: border-box;
}
/* 
.shopping-cart {
width: 720px;
height: auto;
margin: 5vh auto;
background: #FFFFFF;
box-shadow: 1px 2px 3px 0px rgba(0,0,0,0.10);
border-radius: 6px;
display: flex;
flex-direction: column;
}
.title {
  height: 80px;
  border-bottom: 1px solid #E1E8EE;
  padding: 20px;
  color: black;
  font-family: Nunito; 
}

.total {
  height: 110px;
  border-bottom: 1px solid #E1E8EE;
  padding: 20px;
  color: black;
  font-family: Nunito; 
  text-align: right;
}

.item {
padding: 20px;
width: 50vw;
display: flex;
font-family: Lato; 
}

.buttons {
position: relative;
padding-top: 30px;
margin-right: 30px;
}

.checkout-btn {
  background-color: #E1E8EE;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.delete-btn {
width: 18px;
height: 17px;
background: no-repeat center;
display: inline-block;
Cursor: pointer;
background-color: #E1E8EE;
border-radius: 6px;
border: none;
cursor: pointer;
}

.image {
margin-right: 30px;
}

#imageIter{
width: 150px;
}

.description {
width: 260px;
}

.description span {
display: block;
font-size: 16px;
font-weight: 400;
}

.description span:first-child {
margin-bottom: 5px;
}

.description span:last-child {
margin-top: 5px;
}

.quantity {
padding-top: 25px;
margin-right: 12px;
}

.delete-btn, 
.minus-btn,
.plus-btn  {
width: 30px;
height: 30px;
background-color: #E1E8EE;
border-radius: 6px;
border: none;
cursor: pointer;
}

.minus-btn img {
margin-bottom: 3px;
}
.plus-btn img {
margin-top: 2px;
}

button:focus,
input:focus {
outline:0;
}

.total-price {
width: 83px;
padding-top: 27px;
padding-left: 20px;
text-align: right;
font-size: 16px;
font-weight: 300;
}

.plus-btn:hover {
  background-color: green;
  color: white;
}

.minus-btn:hover,
.delete-btn:hover {
  background-color: #dc3545;
  color: white;
}
.swal2-popup {
  font-family:Nunito;
}


@media (max-width: 800px) {
.shopping-cart {
  width: 100%;
  height: auto;
  overflow: hidden;
}
.item {
  height: auto;
  flex-wrap: wrap;
  justify-content: center;
}
.image img {
  width: 10%;
}
.image,
.quantity,
.description {
  width: 100%;
  text-align: center;
  margin: 6px 0;
}
.buttons {
  margin-right: 20px;
}
} */

.loader-container {
  position: relative;
  height: 100%;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid rgba(109,93,36,1);
  border-radius: 50%;
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

#loadingmessage{
  text-align: center;
  position: absolute;
  top: 60%;
  left: 53%;
  transform: translate(-50%, -50%);
  font-family: Nunito; 
}

.rounded-card{
    border-radius:20px;
}

</style>
