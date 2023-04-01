<template>
  <v-row>
    <v-col cols="4">
      <div class="list-container">
        <v-card v-for="(item, index) in items" :key="index" @click="selectedItem = index" :class="{'selected': selectedItem === index}">
          <v-row>
            <v-col cols="4">
              <v-avatar class="mx-auto" size="70">
                <v-img :src="item.ImageURL" contain class="white--text"></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="8">
              <div class="d-flex justify-space-between">
                <div class="text-h5 mb-2">{{ item.Name }}</div>
                <div class="text-h6 mb-2">{{ item.Price }}</div>
              </div>
              <div class="text-body-1">{{ item.Description }}</div>
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
            :src= items[selectedItem].ImageURL
          ></v-img>

          <v-card-item>
            <v-card-title>{{ items[selectedItem].Name }}</v-card-title>

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

            <div>{{ items[selectedItem].Description }}</div>
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
              @click="reserve"
            >
              Reserve
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-col>
  </v-row>
</template>

<script>
import firebaseApp from "../firebase";
import { getDoc, getDocs, collection, doc, updateDoc} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged} from "@firebase/auth";
const db = getFirestore(firebaseApp);
const auth = getAuth()

export default {
  data() {
    return {
      selectedItem: 0,
      items: [],
      user: false,
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
        {
          title: "Item 2",
          description: "This is item 2",
          number: 2,
          image: "https://picsum.photos/id/238/200/300"
        },
        {
          title: "Item 2",
          description: "This is item 2",
          number: 2,
          image: "https://picsum.photos/id/238/200/300"
        },
        {
          title: "Item 2",
          description: "This is item 2",
          number: 2,
          image: "https://picsum.photos/id/238/200/300"
        },
        {
          title: "Item 2",
          description: "This is item 2",
          number: 2,
          image: "https://picsum.photos/id/238/200/300"
        },
        {
          title: "Item 2",
          description: "This is item 2",
          number: 2,
          image: "https://picsum.photos/id/238/200/300"
        },
        {
          title: "Item 2",
          description: "This is item 2",
          number: 2,
          image: "https://picsum.photos/id/238/200/300"
        },
        {
          title: "Item 2",
          description: "This is item 2",
          number: 2,
          image: "https://picsum.photos/id/238/200/300"
        },
        {
          title: "Item 2",
          description: "This is item 2",
          number: 2,
          image: "https://picsum.photos/id/238/200/300"
        },
        {
          title: "Item 2",
          description: "This is item 2",
          number: 2,
          image: "https://picsum.photos/id/238/200/300"
        },
        {
          title: "Item 2",
          description: "This is item 2",
          number: 2,
          image: "https://picsum.photos/id/238/200/300"
        },
        {
          title: "Item 2",
          description: "This is item 2",
          number: 2,
          image: "https://picsum.photos/id/238/200/300"
        },
        {
          title: "Item 2",
          description: "This is item 2",
          number: 2,
          image: "https://picsum.photos/id/238/200/300"
        },

      ]
      */

    };
  },
  async mounted() {
    
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user);
        const vendorID = user.uid;
        // User logged in already or has just logged in.
        const productRef = await getDocs(collection(db, "food_listings"));
        const products = productRef.docs;
        for (const prod of products) {
          console.log(vendorID + " - " + prod.data().VendorID)
          if (vendorID == prod.data().VendorID) { //This listing is by the current vendor
            //const userDocument = await getDoc(doc(db, "food_listings", prod.id));
            const userDocument = prod.data();
            this.items.push(userDocument);
            //console.log(this.items[0].VendorID)

            //console.log(userDocument);
          }
        }   
      } else {
        console.log("No user")
        // User not logged in or has just logged out.
      }
    });
      
  },
  computed: {
    selectedCard() {
      return this.items[this.selectedItem];
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