<template>
  <VendorBreadCrumbs />
  <div v-if="noListing && !showPlaceholder"> 
    <div class="loader"></div>
    <h1 id="loadingmessage" >Loading your Listings...</h1>
  </div>
  <EmptyVendorListing v-else-if="noListing && showPlaceholder"/>
  <div v-else>
    <v-card class="mx-auto" max-width="1230">
      <div class="text-h5 pa-5">All listings at a glance...</div>
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
              <br />
              <v-row>
                <v-col cols="4">
                  <v-avatar class="mx-auto d-flex" size="100">
                    <v-img
                      :src="item.ImageURL"
                      contain
                      class="white--text"
                    ></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <v-row>
                    <div class="text-h6 mb-1">{{ item.Name }}</div>
                  </v-row>
                  <v-row>
                    <v-col cols="5">
                      <div class="text-subtitle-2 mb-1">
                        Qty: {{ item.AvailableQty }}
                      </div>
                    </v-col>
                    <v-col cols="5">
                      <div class="text-h6 mb-1">${{ item.Price }}</div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-chip>{{ item.Category }}</v-chip>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </div>
        </v-col>
        <v-col cols="8">
          <v-card
            class="mx-auto"
            max-width="1230"
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
            <v-card-text>
              <v-form @submit.prevent="submitForm">
                <h3>Food Name</h3>
                <br />
                <v-text-field
                  v-model="items[selectedIndex].Name"
                  label="Food Name"
                  :error-messages="formErrors.name"
                  required
                >
                </v-text-field>
                <v-row width="100%">
                  <v-col cols="6">
                    <h3>Image</h3>
                    <v-img
                      :src="items[selectedIndex].ImageURL"
                      v-if="imageUrl"
                      :width="150"
                      :height="150"
                      contain
                      class="ma-4"
                      accept="image/*"
                    ></v-img>

                    <v-file-input
                      v-model="file"
                      prepend-icon="mdi-camera"
                      label="Upload Image"
                      @change="onFileSelected"
                      accept="image/*"
                    ></v-file-input>
                  </v-col>

                  <v-col cols="6">
                    <h3>Description</h3>
                    <br />
                    <v-textarea
                      v-model="items[selectedIndex].Description"
                      auto-grow
                      variant="filled"
                      color="deep-purple"
                      label="Description"
                      rows="8"
                      :error-messages="formErrors.description"
                    ></v-textarea>
                  </v-col>
                </v-row>

                <h3>Food Name</h3>
                <br />
                <v-text-field
                  v-model="items[selectedIndex].Category"
                  label="Food Category"
                  required
                  :error-messages="formErrors.category"
                ></v-text-field>
                <v-row>
                  <v-col cols="6">
                    <h3>Price</h3>
                    <br />
                    <v-text-field
                      v-model.number="items[selectedIndex].Price"
                      type="number"
                      label="Price"
                      step="0.1"
                      :error-messages="formErrors.price"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <h3>Quantity</h3>
                    <br />
                    <v-text-field
                      v-model.number="items[selectedIndex].AvailableQty"
                      type="number"
                      label="Quantity"
                      step="1"
                      :error-messages="formErrors.quantity"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <br />
                <v-btn
                  type="submit"
                  color="primary"
                  class="ml-auto mt-6 mr-0 d-flex"
                  width="250"
                >
                  Save Changes
                </v-btn>
                <br />
                <br /><br />
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import VendorBreadCrumbs from "@/components/VendorBreadCrumbs.vue";
import firebaseApp from "../firebase";
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
import {
  getDoc,
  getDocs,
  collection,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "@firebase/auth";
import { useToast } from "vue-toastification";
import EmptyVendorListing from '@/components/EmptyVendorListing.vue'
const toast = useToast();
const db = getFirestore(firebaseApp);
const auth = getAuth();

export default {
  components: {
    //NavigationBar1,
    VendorBreadCrumbs,
    EmptyVendorListing
  },
  data() {
    return {
      selectedIndex: 0,
      items: ["test"],
      user: false,
      loading: true,
      selection: "",
      selectedItem: null,

      name: "",
      description: "",
      category: "",
      price: "",
      quantity: "",
      file: null,
      imageUrl: "https://via.placeholder.com/500",
      image: null,
      imageFirebase: null,
      formErrors: {},

      noListing: true,
      showPlaceholder: false // Add a boolean data property
    };
  },
  async mounted() {
    console.log("Mounted is run");
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
          if (vendorID == prod.data().VendorID) {
            this.noListing = false;
            //This listing is by the current vendor
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
        console.log(this.items[this.selectedIndex].ImageURL);
      } else {
        console.log("No user");
      }
    });
  },
  computed: {
    selectedCard() {
      return this.items[this.selectedIndex];
    },
  },
  methods: {
    onFileSelected(event) {
      const file = event.target.files[0];
      this.imageUrl = URL.createObjectURL(file);
      this.image = file;

      const submittedObject = this.items[this.selectedIndex];
      submittedObject.ImageURL = URL.createObjectURL(file);
    },

    async submitForm() {
      const submittedObject = this.items[this.selectedIndex];

      this.name = submittedObject.Name;
      this.description = submittedObject.Description;
      this.category = submittedObject.Category;
      this.price = submittedObject.Price;
      this.quantity = submittedObject.AvailableQty;
      this.imageFirebase = submittedObject.ImageURL;
      this.imageUrl = submittedObject.ImageURL;

      this.formErrors = {};
      /*
        if (!this.name) {
            this.formErrors.name = ['Name is required'];
        }
        if (!this.description) {
            this.formErrors.description = ['Description is required'];
        }
        if (!this.category) {
            this.formErrors.category = ['Category is required'];
        }
        if (!this.price) {
            this.formErrors.price = ['Price is required'];
        }
        if (!this.quantity) {
            this.formErrors.quantity = ['Quantity is required'];
        }
        */

      // Submit form if no errors
      if (Object.keys(this.formErrors).length === 0) {
        if (this.image === null) {
          this.imageFirebase = this.imageUrl;
        } else {
          let fileName = this.name;
          const path = "images/Listings/" + fileName;
          console.log(path);
          const storage = getStorage(firebaseApp);
          const storageRef = ref(storage, path);
          await uploadBytes(storageRef, this.image);
          // Get the download URL of the uploaded image
          const downloadUrl = await getDownloadURL(storageRef);
          this.imageFirebase = downloadUrl;
          this.image = null;
        }

        //this.imageFirebase = this.imageUrl;
        console.log(this.imageFirebase);

        try{ 
          this.updateListing();
          // eh why this is not working ah?
          toast.success("Listing is updated successfully!", {
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
            rtl: false,
          });
          //this.$router.push('/vendor-dashboard')
        } catch {
          toast.error("Unsuccessful: Listing could not be updated", {
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

      // save the form data and image download URL to Firebase database
    },
    async updateListing() {
      //const user = getAuth().currentUser;
      // Still need to get vendor name
      const curr_email = getAuth().currentUser.email;
      const docRef = doc(db, "Users", curr_email);
      const docSnap = await getDoc(docRef);

      const Docdata = docSnap.data();
      const vendor_id = Docdata.VendorID;
      const vendor_name = Docdata.Name;
      // const food_listing_id = (vendor_name + "_" + vendor_id.substring(0,5) + "prod" + this.name).replace(/\s+/g, '')
      // const vendor_doc_id = (vendor_name + vendor_id.substring(0,5)).replace(/\s+/g, '')
      // console.log(food_listing_id)
      const submittedObject = this.items[this.selectedIndex];
      const food_listing_id = submittedObject.Food_listingID;

      // const collectionRef = collection(db, "food_listings");
      // const foodListingRef = doc(collectionRef);
      const foodListingRef = doc(db, "food_listings", food_listing_id);

      await updateDoc(foodListingRef, {
        Name: this.name,
        ImageURL: this.imageFirebase,
        Description: this.description,
        Category: this.category,
        Price: this.price,
        AvailableQty: this.quantity,
        // VendorID: Docdata.VendorID,
        // Food_listingID: food_listing_id,
        // Restaurant_PersonalisationId: vendor_doc_id,
        // VendorName: vendor_name
      });
    },
  },
  created() {
    setTimeout(() => {
      this.showPlaceholder = true;
    }, 750);
  },
};
</script>


<style scoped>
.list-container {
  height: 800px; /* set a fixed height */
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

</style>

