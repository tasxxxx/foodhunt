<template>
  <v-card class="mx-auto" max-width="600">
    
    <v-card-text>
      <v-form @submit.prevent="submitForm">
        <h2>Food Name</h2> <br>
        <v-text-field 
            v-model="name" 
            label="Food Name" 
            :error-messages="formErrors.name"
            required>
        </v-text-field>

        <h2>Image</h2> <br>
        <v-img 
            :src="image" 
            :width="500" 
            :height="500" 
            contain class="ma-4"
            accept="image/png, image/gif, image/jpeg"
        ></v-img>

        <v-file-input 
          prepend-icon="mdi-camera" 
          v-model="file" 
          label="Upload Image"
        ></v-file-input>
        <v-textarea
            v-model="description"
            auto-grow
            variant="filled"
            color="deep-purple"
            label="Description"
            rows="5"
            :error-messages="formErrors.description"
        ></v-textarea>
        <v-text-field 
            v-model="category" 
            label="Food Category" 
            required
            :error-messages="formErrors.category"
        ></v-text-field>
        <v-text-field 
          v-model.number="price" 
          type="number" 
          label="Price" 
          step="0.1"
          :error-messages="formErrors.price"
        ></v-text-field>
        <v-text-field 
          v-model.number="quantity" 
          type="number" 
          label="Quantity" 
          step="1"
          :error-messages="formErrors.quantity"
        ></v-text-field>

        <v-btn type="submit" color="primary" class="ml-auto mt-4">Confirm</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import firebase from 'firebase/compat/app';
import firebaseApp from "../firebase";
import 'firebase/storage'
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";

export default {
  data() {
    return {
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
        file: null,
        
        formErrors: {},
    }
  },
  computed: {
    image() {
      if (this.file) {
        console.log("Got image");
        return URL.createObjectURL(this.file); 
      }  else {
        console.log("NOO image");
        return 'https://via.placeholder.com/500';
      }
    }
  },
  methods: {
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
            this.updateListing();
            const storageRef = firebase.storage().ref()
            const fileRef = storageRef.child(this.file.name)
            await fileRef.put(this.file)
            const downloadURL = await fileRef.getDownloadURL()
        }
      
      // save the form data and image download URL to Firebase database
    },
    async updateListing() {
        const db = getFirestore(firebaseApp); 
        setDoc(doc(db, "Food Listings", "test"), {
            Name: this.name,
            Description: this.description,
            Category: this.category,
            Price: this.price,
            Quantity: this.quantity,
        })
    },
  }
}
</script>

<style scoped>
/* add custom CSS styles here */
</style>
