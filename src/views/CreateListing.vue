<template>
  <VendorBreadCrumbs/>

  <v-card 
    class="mx-auto" 
    max-width=1230
  >
    <div class="text-h5 pa-5"> Create your next listing! </div>
    <v-card-text>
      <v-form @submit.prevent="submitForm">
        <h3>Food Name</h3> <br>
        <v-text-field 
            v-model="name" 
            label="Food Name" 
            :error-messages="formErrors.name"
            required>
        </v-text-field>
        <v-row
          width="100%"
        >
          <v-col
            cols="6"
          >
            <h3>Image</h3>
            <v-img 
                :src="imageUrl" 
                v-if="imageUrl"
                :width="150" 
                :height="150" 
                contain class="ma-4"
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

          <v-col
            cols="6"
          >
            <h3>Description</h3> <br>
            <v-textarea
                v-model="description"
                auto-grow
                variant="filled"
                color="deep-purple"
                label="Description"
                rows="8"
                :error-messages="formErrors.description"
            ></v-textarea>
          </v-col>
        </v-row>

        <h3>Food Name</h3> <br>
        <v-text-field 
            v-model="category" 
            label="Food Category" 
            required
            :error-messages="formErrors.category"
        ></v-text-field>
        <v-row>
          <v-col
            cols="6"
          >
            <h3>Price</h3> <br>
            <v-text-field 
              v-model.number="price" 
              type="number" 
              label="Price" 
              step="0.1"
              :error-messages="formErrors.price"
            ></v-text-field>
          </v-col>
          <v-col
            cols="6"
          >
            <h3>Quantity</h3> <br>
            <v-text-field 
              v-model.number="quantity" 
              type="number" 
              label="Quantity" 
              step="1"
              :error-messages="formErrors.quantity"
            ></v-text-field>
          </v-col>
        </v-row>
        <br>
        <v-btn 
          type="submit" 
          color="primary" 
          class="ml-auto mt-6 mr-0 d-flex"
          width="250"
        >
          Confirm
        </v-btn>
        <br>
        <br><br>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import VendorBreadCrumbs from '@/components/VendorBreadCrumbs.vue';
import firebase from 'firebase/compat/app';
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
import firebaseApp from "../firebase";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, collection, getDoc, getDocs} from "firebase/firestore";
import { useToast } from 'vue-toastification';
const toast = useToast(); 
const db = getFirestore(firebaseApp);

export default {
  components:{
        VendorBreadCrumbs
  },
  data() {
    return {
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
        file: null,
        imageUrl: 'https://firebasestorage.googleapis.com/v0/b/bt3103-project-8c8a0.appspot.com/o/Default.png?alt=media&token=f058916d-bc50-47de-a8eb-81c0194d22ad',
        image: null,
        imageFirebase: null,
        formErrors: {},
    }
  },
  computed: {
    // image() {
    //   if (this.file) {
    //     console.log("Got image");
    //     //return URL.createObjectURL(this.file); 
    //     return this.file
    //   }  else {
    //     console.log("NOO image");
    //     return '@/assets/FoodHuntLogo.png';
    //   }
    // }
  },
  methods: {
    onFileSelected(event) {
      const file = event.target.files[0];
      this.imageUrl = URL.createObjectURL(file);
      this.image = file;
    },

    async submitForm() {
        this.formErrors = {};
        
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
        
        

        // Submit form if no errors
        if (Object.keys(this.formErrors).length === 0) {
          
          if (this.image === null) {
            this.imageFirebase = this.imageUrl;
          } else {
            
            let fileName = this.name;
            const path = "images/Listings/" + fileName;
            console.log(path)           
            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, path);
            await uploadBytes(storageRef, this.image);
            // Get the download URL of the uploaded image
            const downloadUrl = await getDownloadURL(storageRef);
            this.imageFirebase = downloadUrl;   
            this.image = null;
          }
          
          //this.imageFirebase = this.imageUrl;
          console.log(this.imageFirebase)
          

          this.updateListing();
          // eh why this is not working ah? 
          toast.success("Listing is added successfully!", {
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
          this.$router.push('/vendor-dashboard')
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
        const food_listing_id = (vendor_name + "_" + vendor_id.substring(0,5) + "prod" + this.name).replace(/\s+/g, '')
        const vendor_doc_id = (vendor_name + vendor_id.substring(0,5)).replace(/\s+/g, '')
        console.log(food_listing_id)
        
        // const collectionRef = collection(db, "food_listings");
        // const foodListingRef = doc(collectionRef);
        const foodListingRef = doc(db, "food_listings", food_listing_id);

        await setDoc(foodListingRef, {
            Name: this.name,
            ImageURL: this.imageFirebase,
            Description: this.description,
            Category: this.category,
            Price: this.price,
            AvailableQty: this.quantity,
            VendorID: Docdata.VendorID,
            Food_listingID: food_listing_id,
            Restaurant_PersonalisationId: vendor_doc_id,
            VendorName: vendor_name
        })

    },
  }
}
</script>

