<template>
  <VendorBreadCrumbs/>

  <v-card
    class="mx-auto" 
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
            :class="{'selected': selectedIndex === index} "
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
                <v-col cols="9">
                  <v-card-title>{{ items[selectedIndex].reservationNo }}</v-card-title>
                  <!-- <v-card-subtitle>Sold to Customer</v-card-subtitle> -->
                  <br>
                  <v-card-subtitle>Phone Number</v-card-subtitle>
                  <v-card-subtitle>Order Time and Date</v-card-subtitle>
                  <v-card-subtitle>
                    <v-icon
                      color="error"
                      icon="mdi-fire-circle"
                      size="small"
                    ></v-icon>
                  </v-card-subtitle>
                </v-col>
                <v-col cols="3" class="text-right">
                  <v-card-subtitle>{{ items[selectedIndex].isPickedUp }}</v-card-subtitle>
                  <br>
                  <v-card-subtitle class="me-1">{{ items[selectedIndex].phoneNo }}</v-card-subtitle>
                  <v-card-subtitle class="me-1">{{ items[selectedIndex].createdAt }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              
              <v-card-item
                v-for="(vendorItem, index) in items[selectedIndex].VendorItems" 
                :key="index" 
              >
                <v-row>
                  <v-col cols="9">         
                      <v-card-subtitle>{{ vendorItem.quantity }}X {{ vendorItem.item }}</v-card-subtitle>
                  </v-col>
                  <v-col cols="3" class="text-right">

                    <v-card-subtitle class="me-1">${{ vendorItem.subtotal }}</v-card-subtitle>
                  </v-col>
                </v-row>
              </v-card-item>

              <v-divider></v-divider>

              <v-row>
                <v-col cols="9">
                  <br>
                  <v-card-subtitle>Total</v-card-subtitle>
                  <v-card-subtitle>Paid by</v-card-subtitle>
                  <v-card-subtitle>Pickup Time and Date</v-card-subtitle>
                  <v-card-subtitle>Pickup Location</v-card-subtitle>
                  <v-card-subtitle>
                    <v-icon
                      color="error"
                      icon="mdi-fire-circle"
                      size="small"
                    ></v-icon>
                  </v-card-subtitle>
                </v-col>
                <v-col cols="3" class="text-right">
                  <br>
                  <v-card-subtitle class="me-1">${{ vendorTotal }}</v-card-subtitle>
                  <v-card-subtitle class="me-1">In-store payment</v-card-subtitle>
                  <v-card-subtitle class="me-1">{{ items[selectedIndex].collectBy }}</v-card-subtitle>
                  <v-card-subtitle class="me-1">{{ vendorLocation }}</v-card-subtitle>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </v-card-item>
            <v-row>
            <v-col cols="7">
              <v-btn 
                color="secondary" 
                class="mt-6 ml-6"
                width="250"
                @click="confirmPickup"
              >
                Cancel Reservations
              </v-btn>
            </v-col>
            <v-col cols="5">
              <v-btn 
                color="primary" 
                class="mt-6 mr-0"
                width="250"
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
</template>

<script>
import VendorBreadCrumbs from '@/components/VendorBreadCrumbs.vue';
import firebaseApp from "../firebase";
import { getDoc, getDocs, collection, doc, updateDoc, setDoc} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged} from "@firebase/auth";
const db = getFirestore(firebaseApp);
const auth = getAuth()

export default {
  components:{
        //NavigationBar1,
        VendorBreadCrumbs
  },
  data() {
    return {
      selectedIndex: 0,
      items: ["test"],
      user: false,
      loading: true,
      selection: "",
      selectedItem: null,
      vendorImageURL: null,
      vendorLocation: "test",
      vendorTotal: 0,

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
    this.vendorImageURL = "https://picsum.photos/id/237/200/300";
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
        
        /*
        const restPersID = userRef.data().Restaurant_PersonalisationId; 
        console.log(restPersID)
        const personalisationRef = await getDoc(doc(db, "restaurant_personalisation", restPersID));
        const personalisation = personalisationRef.data();
        this.vendorLocation = personalisation.Address;
        */
        
        const reservationRef = await getDocs(collection(db, "reservation_orders"));
        const reservation = reservationRef.docs;
        let items = [];
        for (const res of reservation) {
          let reservationHasVendor = false;
          const resObject = res.data();
          // const userRef = await getDoc(doc(db, "Users", resObject.user));
          // this.CustName = userRef.data().Name;
          
          let array = [];
          resObject.VendorItems = array;
          

          
          const date = new Date(resObject.createdAt.seconds*1000);
          const dayOfMonth = date.getDate();
          const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
          const year = date.getFullYear();
          //const time = date.getTime();
          const time = date.toLocaleTimeString(undefined, {
              hour:   '2-digit',
              minute: '2-digit',
              second: '2-digit',
          });
          const formattedDate = `${dayOfMonth}/${month}/${year}, ${time} `;
          resObject.createdAt = formattedDate
          const formattedDateShort = `${dayOfMonth}/${month}/${year}`;
          resObject.createdAtShort = formattedDateShort;
          
          const newDate = new Date(date.getTime() + 30 * 60000);
          const dayOfMonth2 = date.getDate();
          const month2 = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
          const year2 = date.getFullYear();
          const time2 = newDate.toLocaleTimeString(undefined, {
              hour:   '2-digit',
              minute: '2-digit',
              second: '2-digit',
          });
          const formattedDate2 = `${dayOfMonth2}/${month2}/${year2}, ${time2}`;
          resObject.collectBy = formattedDate2

          if (resObject.isPickedUp) {
            resObject.isPickedUp = "Completed"
          } else {
            resObject.isPickedUp = "Pending Pickup"
          }

          //get User of this reservation
          const cust_email = resObject.user;
          const custRef = await getDoc(doc(db, "Users", cust_email));
          const custObj = custRef.data();
          resObject.phoneNo = custObj.PhoneNo;
          
          const cart = resObject.cart;
          // For each item in cart
          for (const cartItem of cart) {
          //console.log(vendorID + " - " + prod.data().VendorID)
            
            //console.log("currName: " + cartItem.restaurant);
            if (userName == cartItem.restaurant) { //This listing is by the current vendor
              reservationHasVendor = true;
              console.log("iteration")
              //const userDocument = await getDoc(doc(db, "food_listings", prod.id));
              console.log(resObject.VendorItems)       
              //console.log(cartItem)
              const vendorItems = resObject.VendorItems;
              vendorItems.push(cartItem);
              //console.log("curre: ")
              this.vendorTotal = this.vendorTotal + cartItem.subtotal;
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
      await updateDoc(reserveRef, {
          isPickedUp: true,
      })
      
      this.$router.push('/vendor-dashboard');
    },
  }
};
</script>

<style>
.list-container {
  height: 700px;; /* set a fixed height */
  overflow-y: scroll; /* make the container scrollable */
}
</style>