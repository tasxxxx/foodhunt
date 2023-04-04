<template>
  <NavigationBar1/>
  <ConfirmationCard :reservationNumber="reservationNumber"/>
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
}
</script>

<style scoped>
</style> 
