<template>
  <v-parallax
    :src="vendorImageURL2"
  >
  <VendorBreadCrumbs/>
  <div v-if="noReserve && !showPlaceholder"> 
    <div class="loader"></div>
    <h1 id="loadingmessage" >Loading your reservations...</h1>
  </div>
  <EmptyVendorReservation v-else-if="noReserve && showPlaceholder"/>
  <div v-else>
    <v-card
      class="mx-auto rounded-card" 
      max-width=1230
    >
      <div class="text-h5 pa-5"> All Reservations at a glance...</div>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="4">
          <div class="list-container">
            <v-card 
              v-for="(item, index) in items" 
              :key="index" 
              @click="selectedIndex = index" 
              :color="selectedIndex === index ? 'primary' : undefined"
              min-height="150"          
            >
              <br>
              <v-row>
                <v-col cols="4">
                  <v-avatar class="mx-auto d-flex" size="100">
                    <v-img :src="vendorImageURL" contain class="white--text"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <v-row>
                    <div class="text-h6 mb-1">{{ item.reservationNo }}</div>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                    <div class="text-subtitle-2 mb-1">{{ item.createdAtShort }}</div>
                    </v-col>
                    <v-col cols="6">
                      <div class="text-h6 mb-1">${{ item.total }}</div>
                    </v-col>
                  </v-row>
                  <v-row>
                      <v-chip>{{ item.isPickedUp }}</v-chip>  
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
              
              <v-img
                cover
                height="300"
                :src= "vendorImageURL"
              ></v-img>

              <v-card-item>
                <v-row>
                  <v-col cols="8">
                    <v-card-title>{{ items[selectedIndex].reservationNo }}</v-card-title>
                    <!-- <v-card-subtitle>Sold to Customer</v-card-subtitle> -->
                    <br>
                    <v-card-subtitle>Phone Number</v-card-subtitle>
                    <v-card-subtitle>Order Time and Date</v-card-subtitle>
                    <v-card-subtitle>
                      <v-icon
                        color="success"
                        icon="mdi-clipboard-text-clock"
                        size="small"
                      ></v-icon>
                    </v-card-subtitle>
                  </v-col>
                  <v-col cols="4" class="text-right">
                    <v-card-subtitle>{{ items[selectedIndex].isPickedUp }}</v-card-subtitle>
                    <br>
                    <v-card-subtitle class="me-1">{{ items[selectedIndex].phoneNo }}</v-card-subtitle>
                    <v-card-subtitle class="me-1">{{ items[selectedIndex].createdAt }}</v-card-subtitle>
                  </v-col>
                </v-row>
                <v-divider></v-divider>
                
                <br>
                <v-row
                  v-for="(vendorItem, index) in items[selectedIndex].VendorItems" 
                  :key="index"
                >
                  <v-col cols="9" class="text-left ml-16"> 
                    <!-- <v-card-subtitle>
                      <v-icon
                        color="primary"
                        icon="mdi-clipboard-text-clock"
                        size="small"
                      ></v-icon>
                    </v-card-subtitle> -->
                    <v-card-subtitle> {{ vendorItem.quantity }} X {{ vendorItem.item }}</v-card-subtitle>
                  </v-col>
                  <v-col cols="2" class="text-right">
                    <v-card-subtitle class="me-1">${{ vendorItem.subtotal.toFixed(2) }}</v-card-subtitle>
                  </v-col>
                  <v-divider inset></v-divider>
                </v-row>

                <v-row>
                  <v-col cols="5">
                    <br>
                    <v-card-subtitle>Total</v-card-subtitle>
                    <v-card-subtitle>Paid by</v-card-subtitle>
                    <v-card-subtitle>Pickup Time and Date</v-card-subtitle>
                    <v-card-subtitle>Pickup Location</v-card-subtitle>
                  </v-col>
                  <v-col cols="7" class="text-right">
                    <br>
                    <v-card-subtitle class="me-1">${{ parseInt(items[selectedIndex].total).toFixed(2) }}</v-card-subtitle>
                    <v-card-subtitle class="me-1">In-store payment</v-card-subtitle>
                    <v-card-subtitle class="me-1">{{ items[selectedIndex].collectBy }}</v-card-subtitle>
                    <v-card-subtitle class="me-1">{{ vendorLocation }}</v-card-subtitle>
                  </v-col>
                </v-row>
                <br>
                <v-divider></v-divider>
              </v-card-item>
              <v-row v-show="items[selectedIndex].isPickedUp === 'Pending Pickup'">
                <v-col cols="8">
                  <v-btn 
                    color="secondary" 
                    class="mt-6 ml-6"
                    width="230"
                    @click="cancelReservation"
                  >
                    Cancel Reservation
                  </v-btn>
                </v-col>
                <v-col cols="4">
                  <v-btn 
                    color="primary" 
                    class="mt-6"
                    width="230"
                    @click="confirmPickup"
                    
                  >
                    Confirm Pickup
                  </v-btn>
                </v-col>
              </v-row>
              
              <br>
              <br>
              

            </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
  <br><br><br>
  </v-parallax>
</template>

<script>
import VendorBreadCrumbs from '@/components/VendorBreadCrumbs.vue';
import firebaseApp from "../firebase";
import { getDoc, getDocs, collection, doc, updateDoc, setDoc, deleteDoc} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged} from "@firebase/auth";
import { useToast } from 'vue-toastification';
import EmptyVendorReservation from '@/components/EmptyVendorReservation.vue'
const db = getFirestore(firebaseApp);
const auth = getAuth();
const toast = useToast();

export default {
  components:{
        //NavigationBar1,
        VendorBreadCrumbs,
        EmptyVendorReservation
  },
  data() {
    return {
      selectedIndex: 0,
      items: ["test"],
      user: false,
      loading: true,
      selection: "",
      selectedItem: null,
      vendorImageURL: 'https://firebasestorage.googleapis.com/v0/b/bt3103-project-8c8a0.appspot.com/o/Default.png?alt=media&token=f058916d-bc50-47de-a8eb-81c0194d22ad',
      vendorImageURL2: "https://firebasestorage.googleapis.com/v0/b/bt3103-project-8c8a0.appspot.com/o/VendorBackground3.jpg?alt=media&token=b39dfd4b-eb7e-4164-977e-39a8498bcfbd",
      vendorLocation: "test",
      //vendorTotal: 0,
      noReserve: true,
      showPlaceholder: false, // Add a boolean data property
      selected: false,
  

      /*
      items: [
        {
          title: "Item 1",
          description: "This is item 1",
          number: 1,
          image: "https://picsum.photos/id/237/200/300"
        },
        {
          title: "Item 2",
          description: "This is item 2",
          number: 2,
          image: "https://picsum.photos/id/238/200/300"
        },
        {
          title: "Item 3",
          description: "This is item 3",
          number: 3,
          image: "https://picsum.photos/id/239/200/300"
        },
      */
    };
  },
  async mounted() {
    // KIV
    //this.vendorImageURL = "https://picsum.photos/id/237/200/300";
    console.log("Mounted is run")
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const vendorID = user.uid;

        // Get current vendor
        const curr_email = getAuth().currentUser.email;
        const userRef = await getDoc(doc(db, "Users", curr_email));
        const userName = userRef.data().Name;


        const userRestaurant_PersonalisationId = userRef.data().Restaurant_PersonalisationId;
        const personalisationRef = await getDoc(doc(db, "restaurant_personalisation", userRestaurant_PersonalisationId));
        this.vendorLocation = personalisationRef.data().Address;
        this.vendorImageURL = personalisationRef.data().ProfileURL;



        /*
        const restPersID = userRef.data().Restaurant_PersonalisationId; 
        console.log(restPersID)
        const personalisationRef = await getDoc(doc(db, "restaurant_personalisation", restPersID));
        const personalisation = personalisationRef.data();
        this.vendorLocation = personalisation.Address;
        */
        
        const reservationRef = await getDocs(collection(db, "reservation_orders"));
        const reservation = reservationRef.docs
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


        let items = [];
        for (const res of reservation) {
          let reservationHasVendor = false;
          const resObject = res.data();
          // const userRef = await getDoc(doc(db, "Users", resObject.user));
          // this.CustName = userRef.data().Name;
          
          let array = [];
          resObject.VendorItems = array;
          resObject.reservationTotal = 0;
          const now = new Date()
          const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          const currentDay = days[now.getDay()]
          const closingTime = personalisationRef.data()[currentDay].split(' - ')[1]        
          const timestamp = resObject.createdAt;
          const date0 = timestamp.toDate();
          const dateString = date0.toDateString();
          const timeString = date0.toLocaleTimeString();
          const dateTimeString = dateString + ' ' + timeString;
          const pickUpTime = dateString +", " + closingTime
          resObject.collectBy = pickUpTime

          
          const date = new Date(resObject.createdAt.seconds*1000);
          const dayOfMonth = date.getDate();
          const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
          const year = date.getFullYear();
          //const time = date.getTime();
          const time = date.toLocaleTimeString(undefined, {
            hour:   '2-digit',
            minute: '2-digit',
          });
          const formattedDate = dateString + ", " + time;
          resObject.createdAt = formattedDate
          const formattedDateShort = `${dayOfMonth}/${month}/${year}`;
          resObject.createdAtShort = formattedDateShort;
          
          // const newDate = new Date(date.getTime() + 30 * 60000);
          // const dayOfMonth2 = date.getDate();
          // const month2 = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
          // const year2 = date.getFullYear();
          // const time2 = newDate.toLocaleTimeString(undefined, {
          //     hour:   '2-digit',
          //     minute: '2-digit',
          //     second: '2-digit',
          // });
          // const formattedDate2 = `${dayOfMonth2}/${month2}/${year2}, ${time2}`;

          if (resObject.isPickedUp) {
            resObject.isPickedUp = "Completed"
          } else {
            resObject.isPickedUp = "Pending Pickup"
          }

          //get User of this reservation
          const cust_email = resObject.user;
          const custRef = await getDoc(doc(db, "Users", cust_email));
          const custObj = custRef.data();
          if (custObj) {
              resObject.phoneNo = custObj.PhoneNo;
          }
          
          const cart = resObject.cart;
          // For each item in cart
          for (const cartItem of cart) {
          //console.log(vendorID + " - " + prod.data().VendorID)
            
            //console.log("currName: " + cartItem.restaurant);
            if (userName == cartItem.restaurant) { //This listing is by the current vendor

              this.noReserve = false;
              reservationHasVendor = true;
              //const userDocument = await getDoc(doc(db, "food_listings", prod.id));     
              //console.log(cartItem)
              const vendorItems = resObject.VendorItems;
              vendorItems.push(cartItem);
              //console.log("curre: ")
              //this.vendorTotal = this.vendorTotal + cartItem.subtotal;
              //resObject.reservationTotal = resObject.reservationTotal + cartItem.subtotal;
              
              resObject.VendorItems = vendorItems
              
            }
          }
          if (reservationHasVendor) {
            items.push(resObject);
          }
        }   
        this.items = items;

        this.selectedItem = this.items[this.selectedIndex];

        this.loading = false;
        // this.selectedItem = this.items[0];
        // console.log(this.selectedCard)

      } else {
        console.log("No user")
      }
    });
      
  },
  computed: {
    selectedCard() {
      return this.items[this.selectedIndex];
    }
  },
  methods: {
    async confirmPickup() {
      const reservationNo = this.items[this.selectedIndex].reservationNo;
      const reserveRef = doc(db, "reservation_orders", reservationNo)
      const reserveDoc = await getDoc(reserveRef);
      const bool = reserveDoc.data().isPickedUp;
      if (bool) {
        toast.error("Unsuccessful: Order has already been picked up", {
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
        await updateDoc(reserveRef, {
          isPickedUp: true,
        });
        toast.success("Item is confirmed to be picked up by customer", {
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
        this.$router.push('/vendor-dashboard');
      }
    },
    async cancelReservation() {
      //const reserveDoc = await getDoc(reserveRef);
      this.$swal.fire({
          title: 'Are you sure?',
          text: "Please confirm that you are cancelling the reservations?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm'
        }).then(async (result) => {
          if (result.isConfirmed) { try {
        const reservationNo = this.items[this.selectedIndex].reservationNo;
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
        this.$router.push('/vendor-dashboard');

        toast.success("Reservation has been cancelled", {
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
      
      catch {
        toast.error("Unsuccessful: Reservation cannot be cancelled", {
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
          }
    })
  },
  created() {
    setTimeout(() => {
      this.showPlaceholder = true;
    }, 3750);
  },
} 
}
</script>

<style scoped>
.list-container {
  height: 820px; /* set a fixed height */
  overflow-y: scroll; /* make the container scrollable */
}

* {
box-sizing: border-box;
}

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
/* 
.item:nth-child(2) {
border-top:  1px solid #E1E8EE;
border-bottom:  1px solid #E1E8EE;
} */

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

.rounded-card{
    border-radius:20px;
}

</style>

