<template>  
    <NavigationBar1/>
    <div v-if="reservations.length === 0 && !showPlaceholder">
      <div class="loader"></div>
        <h1 id="loadingmessage" >Loading your reservations...</h1>
      </div>
    <!-- <div class="empty-cart-container" v-if="reservations.length === 0">
      <img id ="emptycart" src="@/assets/preview.png" alt = "">
      <h1 id="message">Oops! You have no current reservations. Time to add some items and fill it up!</h1>
      <v-breadcrumbs-item :to="{ name: 'restaurantlisting'}">
        <v-btn rounded="lg" color="primary"> Start Hunting!</v-btn>
      </v-breadcrumbs-item>
      <img id ="emojisad" src="@/assets/emoji.webp" alt = "">
    </div> -->
    <EmptyReservation v-else-if="reservations.length === 0 && showPlaceholder"/>
    <div v-else>
  
      <v-card
        class="mx-auto" 
        max-width=1230
        max-height="640"
      >
      <div class="text-h5 pa-5"> All orders at a glance...</div>
      <v-divider></v-divider> 
      <v-row>
        <v-col cols="4">
          <div class="list-container">
            <v-card 
              v-for="reservation in reservations" 
              key="reservation.id" 
              @click="selectReservation(reservation)"
              min-height="150"
            >
              <br>
              <v-row>
                <v-col cols="4">
                  <v-avatar class="mx-auto d-flex" size="100">
                    <v-img :src="reservation.ImageURL" contain class="white--text"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <v-row>
                    <div class="text-h6 mb-1">{{ reservation.reservationNo }}</div>
                  </v-row>
                  <v-row>
                    <v-col cols="5">
                    <div class="text-subtitle-2 mb-1">{{ reservation.createdAt.toDate().toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' }) }}</div>
                    </v-col>
                    <v-col cols="5">
                      <div class="text-h6 mb-1">${{ reservation.total.toFixed(2) }}</div>
                    </v-col>
                  </v-row>
                  <v-row>
                      <v-chip>{{ reservation.isPickedUp ? 'Completed' : 'Pending Pickup' }}</v-chip>  
                  </v-row>

                  <!-- <div class="text-body-1">{{ item.Category }}</div> -->
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
              
              <!-- <v-img
                cover
                height="300"
                :src= "items[selectedItem].ImageURL"
              ></v-img> -->

              <v-card-item>
                <!-- <v-card-title>{{ items[selectedItem].Name }}</v-card-title> -->

                <v-card-subtitle>
                  <!-- <span class="me-1">{{ 'Completed'}}</span> -->

                  <span class="me-1">{{ selected_reservation.isPickedUp ? 'Completed' : 'Pending Pickup' }}</span>

                  
                </v-card-subtitle>
              </v-card-item>

              <v-card-text>
                

                <div class="my-4 text-subtitle-1">
                  <!-- Order Time and Date: today -->

                  Order Time and Date: {{ selected_reservation.createdAt.toDate().toLocaleString('en-SG', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) }}
                </div>

                <!-- <div>{{ items[selectedItem].Description }}</div> -->
              </v-card-text>

              <v-divider class="mx-4 mb-1"></v-divider>
                <v-card-text>
                  <div v-for="(orders, restaurant) in ordersByRestaurant" :key="restaurant">
                    <h3>{{ restaurant }}</h3>
                    <div v-for="order in orders" :key="order.id">
                      <p>{{ order.quantity }}x {{ order.item }} ${{ order.subtotal.toFixed(2) }}</p>
                    </div>
                  </div>
                </v-card-text>
              <v-divider class="mx-4 mb-1"></v-divider>
              <v-card-text>
                <!-- Total: hello -->
                Total: ${{ selected_reservation.total.toFixed(2) }}
              </v-card-text>
              <v-card-text>
                Payment By: In Store Payment
              </v-card-text>
              <v-divider class="mx-4 mb-1"></v-divider>

              <!-- <v-card-title>Tonight's availability</v-card-title> -->

              <v-btn rounded="lg" color="red" @click="cancelReservation(selected_reservation.reservationNo)"> Cancel Reservation</v-btn>
              <!-- <v-card-actions>
                <v-btn
                  color="red"
                  variant="text"
                  @click="showDialog = true"
                >
                  Cancel Reservation
                </v-btn>
              </v-card-actions>
              <v-dialog v-model="showDialog" max-width="500">
                <v-card>
                  <v-card-title>Confirm Cancel</v-card-title>
                  <v-card-text>Are you sure you want to cancel your reservation?</v-card-text>
                  <v-card-actions>
                    <v-btn color="red" text @click="showDialog = false">No</v-btn>
                    <v-btn color="green" text @click="cancelReservation(selected_reservation.reservationNo)">Yes</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog> -->
            </v-card>
        </v-col>
      </v-row> 
      </v-card>
    </div>


    
    <!-- <h3>All orders at a glance</h3>
    <div class="reservation-panel">
      <div class="left-panel">
        <div v-for="reservation in reservations" :key="reservation.id" className='restaurant' @click="selectReservation(reservation)">
          <p>{{ reservation.reservationNo }}</p>
          <p>{{ reservation.isPickedUp ? 'Completed' : 'Pending Pickup' }}</p>
          <p>${{ reservation.total }}</p>
          <p>{{ reservation.createdAt.toDate().toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' }) }}</p>
        </div>
      </div>
      <div class="right-panel">
        <div v-if="selected_reservation">
          <p>{{ selected_reservation.isPickedUp ? 'Completed' : 'Pending Pickup' }}</p>
          <p>{{ selected_reservation.createdAt.toDate().toLocaleString('en-SG', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) }}</p>
          <hr>
            <div v-for="(orders, restaurant) in ordersByRestaurant" :key="restaurant">
              <h3>{{ restaurant }}</h3>
              <div v-for="order in orders" :key="order.id">
                <p>{{ order.quantity }}x {{ order.item }} ${{ order.subtotal }}</p>
              </div>
            </div>
          <hr>
          <p>Total: ${{ selected_reservation.total }}</p>
          <button>Cancel reservation</button>
        </div>
      </div>
    </div> -->
    
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

    }
  },

  async mounted() {
    setTimeout(() => {
        this.showPlaceholder = true;
      }, 750);
      // const querySnapshot = await getDocs(collection(db, "reservation_orders"))
      // const allReservations = querySnapshot.docs.filter(doc => doc.data().user === this.useremail);
      // this.reservations = allReservations.map(doc => doc.data());
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

    if (this.reservations.length > 0) {
      this.selected_reservation = this.reservations[0]
    }
  },
  methods: {
    async getReservations() {
      const querySnapshot = await getDocs(collection(db, "reservation_orders"))
      console.log("printing data")
      const allReservations = querySnapshot.docs.filter(doc => doc.data().user === this.useremail);
      this.reservations = allReservations.map(doc => doc.data());

      // allReservations.forEach(doc => {
      //   const reservation = doc.data();
      //   console.log(reservation)
      //   this.reservations.push(reservation);
        
      // })
      if (this.reservations.length > 0) {
        this.selected_reservation = this.reservations[0]
      };
    },
    async cancelReservation(reservationNo) {
        this.$swal.fire({
            title: 'Are you sure?',
            text: "Please confirm that you are removing the item from the cart?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
          }).then(async (result) => {
            if (result.isConfirmed) {
              this.showDialog = false;
              console.log("db")
              console.log(db)
              const deleted_reservation = doc(db, "reservation_orders", reservationNo);
              const deleted_reservation_data = await getDoc(deleted_reservation);
              console.log("deleted reservation")
              console.log(deleted_reservation_data.data())
              const products = deleted_reservation_data.data().cart  
              console.log(products)
              // const deletedItems = products.map(product => product.foodID);
              const deletedItems = products.map(product => ({foodID: product.foodID, quantity: product.quantity}));

              console.log(deletedItems)

              for (const item of deletedItems) {
                const itemRef = doc(db, "food_listings", item.foodID);
                // const itemRef = doc(foodListingsRef, item);
                const itemDoc = await getDoc(itemRef);
                console.log("item doc")
                console.log(itemDoc)
                const availableQty = itemDoc.data().AvailableQty;
                await updateDoc(itemRef, { AvailableQty: availableQty + item.quantity });
                // await updateDoc(itemRef, { AvailableQty: availableQty + 1 });
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
      //remove from reservations, add qty back to vendors
    },
    selectReservation(reservation) {
      this.selected_reservation = reservation;
    }
  },
  computed: {
    ordersByRestaurant() {
      const ordersByRestaurant = {}
      this.selected_reservation.cart.forEach(order => {
        if (!ordersByRestaurant[order.restaurant]) {
          ordersByRestaurant[order.restaurant] = []
        }
        ordersByRestaurant[order.restaurant].push(order)
      })
      return ordersByRestaurant
    }
  }
}
</script>

<style scoped> 

.restaurant {
  border: 1px solid #d3cdcd;
  width: 300px;
  /* height: 250px; */
  /* border-radius: 20px; */
  margin: 20px;
  /* box-shadow: 2px 2px grey; */
  box-shadow: 0 3px #d3cdcd;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}
.reservation-panel {
  display: flex;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
}
.left-panel {
  width: 50%;
}
.right-panel {
  width: 50%;
  border: 1px solid #d3cdcd;
  /* height: 250px; */
  /* border-radius: 20px; */
  margin: 20px;
  /* box-shadow: 2px 2px grey; */
  box-shadow: 0 3px #d3cdcd;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}
.reservation {
  border: 1px solid #d3cdcd;
  width: 300px;
  height: 250px;
  /* border-radius: 20px; */
  margin: 20px;
  /* box-shadow: 2px 2px grey; */
  box-shadow: 0 3px #d3cdcd;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}

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
  left: 45%;
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
  left: 49%;
  transform: translate(-50%, -50%);
  font-family: Nunito; 
  
}
</style>
