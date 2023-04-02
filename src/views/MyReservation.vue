<template>  
    <NavigationBar1/>
    <h3>All orders at a glance</h3>
    <div class="reservation-panel">
      <div class="left-panel">
        <div v-for="reservation in reservations" :key="reservation.id" className='restaurant' @click="selectReservation(reservation)">
          <p>{{ reservation.reservationNo }}</p>
          <p>{{ reservation.isPickedUp ? 'Completed' : 'Pending Pickup' }}</p>
          <p>${{ reservation.total }}</p>
          <p>{{ reservation.createdAt.toDate().toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric' }) }}</p>
        </div>
      </div>
      <div class="right-panel">
        <div v-if="selected_reservation">
          <!-- <p>{{ selected_reservation.cart }}</p> -->
          <div v-for="order in selected_reservation.cart" :key="order.id">
            <p>{{ order }}</p>
            <p>{{ order.quantity}}x {{ order.item }} ${{ order.subtotal }}</p>
          </div>
          
          <p>{{ selected_reservation.isPickedUp ? 'Completed' : 'Pending Pickup' }}</p>
          <p>{{ selected_reservation.createdAt.toDate().toLocaleString('en-SG', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) }}</p>
          <hr>
          
          <hr>
          <p>Total: ${{ selected_reservation.total }}</p>
          <button>Cancel reservation</button>
          <!-- Display more details about the selected reservation here -->
        </div>
      </div>
    </div>
    
</template>

<script> 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useToast } from 'vue-toastification'
import firebaseApp from "../firebase";
import { getFirestore, doc, getDoc, getDocs, setDoc, updateDoc, collection, deleteDoc, serverTimestamp} from 'firebase/firestore';
import NavigationBar1 from '@/components/icons/NavigationBar1.vue'
const toast = useToast();
const db = getFirestore(firebaseApp);

export default {
  name: "MyReservation",
  components:{
    NavigationBar1
  },
  data() {
    return {
      useremail: '',
      reservations: [],
      selected_reservation: null,

    }
  },

  created() {
    const auth = getAuth();
     onAuthStateChanged(auth, (user) => {
      if (user) {
        this.useremail = auth.currentUser.email;
        this.getReservations();
      } else {
        if (this.$route.path.split('/').pop() !== "restaurantlisting") {
          toast.error("Access denied! Please sign in!", {
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
          this.$router.push('/login');
        } else { 
          this.$router.push('/login');
        }
      }
    });
  },
  methods: {
    async getReservations() {
      const querySnapshot = await getDocs(collection(db, "reservation_orders"))
      console.log("printing data")
      const allReservations = querySnapshot.docs.filter(doc => doc.data().user === this.useremail);
      
      allReservations.forEach(doc => {
        const reservation = doc.data();
        console.log(reservation)
        this.reservations.push(reservation);
        
      });
    },
    selectReservation(reservation) {
      this.selected_reservation = reservation;
    }
  }
}
</script>

<style scoped> 

.restaurant {
  border: 1px solid #d3cdcd;
  width: 300px;
  /* height: 250px; */
  /* border-radius: 20px; */
  margin: 20px;
  /* box-shadow: 2px 2px grey; */
  box-shadow: 0 3px #d3cdcd;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}
.reservation-panel {
  display: flex;
  flex-direction: row;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
}
.left-panel {
  width: 50%;
}
.right-panel {
  width: 50%;
  border: 1px solid #d3cdcd;
  /* height: 250px; */
  /* border-radius: 20px; */
  margin: 20px;
  /* box-shadow: 2px 2px grey; */
  box-shadow: 0 3px #d3cdcd;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}
.reservation {
  border: 1px solid #d3cdcd;
  width: 300px;
  height: 250px;
  /* border-radius: 20px; */
  margin: 20px;
  /* box-shadow: 2px 2px grey; */
  box-shadow: 0 3px #d3cdcd;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}
</style>