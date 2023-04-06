<template>
  <v-parallax
    :src="backgroundImg"
  >
  <NavigationBar1/>
  <ConfirmationCard :reservationNumber="reservationNumber"/>
  </v-parallax>
</template>

<script>
import NavigationBar1 from '@/components/NavigationBar1.vue'
import ConfirmationCard from '@/components/ConfirmationCard.vue'

import firebaseApp from "../firebase";
import { getFirestore } from 'firebase/firestore';
import { getDoc, deleteDoc, collection, doc, updateDoc} from 'firebase/firestore';
import { useToast } from 'vue-toastification'
import { getAuth} from "@firebase/auth";
const db = getFirestore(firebaseApp);
const toast = useToast();


export default {
name: "Confirmation",
props: {
    reservationNumber: {
      type: String,
      required: true,
    }
}, 
components:{
  NavigationBar1,
  ConfirmationCard
}, 
data() {
  return { 
    backgroundImg: "https://firebasestorage.googleapis.com/v0/b/bt3103-project-8c8a0.appspot.com/o/VendorBackground3.jpg?alt=media&token=b39dfd4b-eb7e-4164-977e-39a8498bcfbd"
  }
}   
}
</script>

<style scoped>
</style> 
