<template>
Confirm your reservation!
<br>
{{ this.reservationNumber }}
<br>
{{ details.dateTimeString }}
<div v-for="prod in details.cart" :key="prod.id">
    {{ prod.restaurant }}
    {{ prod.item }}
    {{ prod.quantity }}
    ${{ prod.subtotal }}
</div>
<br>
Total: ${{ details.total }}
<br>
Payment by: In store payment
<v-btn rounded="lg" color="primary" @click="confirm"> Confirm Reservation</v-btn>

</template>

<script>
import NavigationBar1 from '@/components/icons/NavigationBar1.vue'
import firebaseApp from "../firebase";
import { getFirestore } from 'firebase/firestore';
import { getDoc, getDocs, collection, doc, updateDoc} from 'firebase/firestore';
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
}, 
data() {
  return {
    details: [],
  }
},    
async mounted() {
    const reserveRef = doc(db, "reservation_orders", this.reservationNumber);
    const docSnap = await getDoc(reserveRef); 

    if (docSnap.exists()) {
        const documentData = docSnap.data();
        const cart = documentData.cart;
        const timestamp = documentData.createdAt;
        const date = timestamp.toDate();
        const dateString = date.toDateString();
        const timeString = date.toLocaleTimeString();
        const dateTimeString = dateString + ' ' + timeString;
        const total = documentData.total;
        this.details = {
            cart, 
            dateTimeString, 
            total
        }
    } else {
        console.log('No such document!');
    }
    console.log(this.details)
},
methods: {
    async confirm() {
        const productRef = await getDocs(collection(db, "food_listings"));
        const products = productRef.docs;
        for (const item of this.details.cart) {
          for (const prod of products) {
            if (item.restaurant === prod.data().Vendor && item.item === prod.data().Name) {
              const targetProd = doc(db, "food_listings", prod.id);
                await updateDoc(targetProd, {
                  AvailableQty: prod.data().AvailableQty - item.quantity
                });
            }
          }
        }
        const reserveRef = doc(db, "reservation_orders", this.reservationNumber);
        updateDoc(reserveRef, {
        confirmed: true
        })
        toast.success("Reservation confirmed! Happy Hunting!", {
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
        this.$router.push('/mainlisting') 
    }
  }
}
</script>

<style scoped>

</style>
