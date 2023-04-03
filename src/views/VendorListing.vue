<template>
  <VendorBreadCrumbs/>

  <v-card
    class="mx-auto" 
    max-width=1230
    max-height="640"
  >
  <div class="text-h5 pa-5"> All listings at a glance...</div>
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
                <v-img :src="item.ImageURL" contain class="white--text"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="8">
              <v-row>
                <div class="text-h6 mb-1">{{ item.Name }}</div>
              </v-row>
              <v-row>
                <v-col cols="5">
                <div class="text-subtitle-2 mb-1">Qty: {{ item.AvailableQty }}</div>
                </v-col>
                <v-col cols="5">
                  <div class="text-h6 mb-1">${{ item.Price }}</div>
                </v-col>
              </v-row>
              <v-row>
                  <v-chip>{{ item.Category }}</v-chip>  
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
            :src= "items[selectedIndex].ImageURL"
          ></v-img>

          <v-card-item>
            <v-card-title>{{ items[selectedIndex].Name }}</v-card-title>
            <v-card-subtitle>
              <span class="me-1">Local Favorite</span>

              <v-icon
                color="error"
                icon="mdi-fire-circle"
                size="small"
              ></v-icon>
            </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            <v-row
              align="center"
              class="mx-0"
            >
              <v-rating
                :model-value="4.5"
                color="amber"
                density="compact"
                half-increments
                readonly
                size="small"
              ></v-rating>

              <div class="text-grey ms-4">
                4.5 (413)
              </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
              $ • Italian, Cafe
            </div>

            <div>{{ items[selectedIndex].Description }}</div>
          </v-card-text>

          <v-divider class="mx-4 mb-1"></v-divider>

          <v-card-title>Tonight's availability</v-card-title>

          <div class="px-4">
            <v-chip-group v-model="selection">
              <v-chip>5:30PM</v-chip>

              <v-chip>7:30PM</v-chip>

              <v-chip>8:00PM</v-chip>

              <v-chip>9:00PM</v-chip>
            </v-chip-group>
          </div>

          <v-card-actions>
            <v-btn
              color="deep-purple-lighten-2"
              variant="text"
            >
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-col>
  </v-row>
</v-card>
</template>

<script>
import VendorBreadCrumbs from '@/components/VendorBreadCrumbs.vue';
import firebaseApp from "../firebase";
import { getDoc, getDocs, collection, doc, updateDoc} from 'firebase/firestore';
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
    console.log("Mounted is run")
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        //const vendorID = getAuth().currentUser.uid;
        //console.log(user);
        const vendorID = user.uid;

        const productRef = await getDocs(collection(db, "food_listings"));
        const products = productRef.docs;
        const items = [];
        for (const prod of products) {
          //console.log(vendorID + " - " + prod.data().VendorID)
          if (vendorID == prod.data().VendorID) { //This listing is by the current vendor
            //const userDocument = await getDoc(doc(db, "food_listings", prod.id));
            const userDocument = prod.data();
            items.push(userDocument);

            console.log(userDocument.Name);
          }
        }   
        this.items = items;

        this.selectedItem = this.items[this.selectedIndex];

        this.loading = false;
        // this.selectedItem = this.items[0];
        // console.log(this.selectedCard)
        console.log(this.items[this.selectedIndex].ImageURL)
      } else {
        console.log("No user")
      }
    });
      
  },
  computed: {
    selectedCard() {
      return this.items[this.selectedIndex];
    }
  }
};
</script>


<style>
.list-container {
  height: 700px;; /* set a fixed height */
  overflow-y: scroll; /* make the container scrollable */
}
</style>