<template>
  <NavigationBar1/>
  <div class="shopping-cart">
    <div class="title">
      <h2>Confirm your reservation for {{ this.reservationNumber }}!</h2>
      <h4 id="time">{{ details.dateTimeString }}</h4>
    </div>
    <!-- Item iteration -->
    <div class="item" v-for="prod in details.cart" :key="index">
      <div class="image">
            <img id="imageIter" src="@/assets/macs.jpg" alt="" />
      </div>
      <div class="description">
        <span>{{ prod.restaurant }}</span>
        <span>{{ prod.item }}</span>
        <span>${{ prod.price }}</span>

      </div>
      <div class="quantity">
        {{ prod.quantity }}x
      </div>
      <div class="total-price">${{ prod.subtotal }}</div>
    </div>
    <div class="total">
      <h2 id="totalProfit"> Total: ${{ details.total }} </h2>
      <h3 id="totalProfit"> Payment by: In store payment </h3>
      <v-btn class="confirmreservationbtn" rounded="lg" color="primary" @click="confirm"> Confirm Reservation</v-btn>
    </div>
  </div>   
</template>

<script>
import NavigationBar1 from '@/components/NavigationBar1.vue'
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
},
methods: {
    async confirm() {
      let canConfirm = true;
      const reserveRef = doc(db, "reservation_orders", this.reservationNumber);
      for (const item of this.details.cart) {
        const productRef = doc(db, "food_listings", item.foodID);
        const thisproductData = await getDoc(productRef);
        if (thisproductData.data().AvailableQty < item.quantity) {
          canConfirm = false;
          break;
        } 
      }

      if (canConfirm) {
        for (const item of this.details.cart) {
          const productRef = doc(db, "food_listings", item.foodID);
          const thisproductData = await getDoc(productRef);
          await updateDoc(productRef, {
          AvailableQty: thisproductData.data().AvailableQty - item.quantity
        })
      }
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
                
      } else {
        await deleteDoc(reserveRef);
        toast.error("Product quantity is not available, please try again!", {
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
    this.$router.push('/restaurantlisting') 
  }
}
}
</script>

<style scoped>

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
  height: 100px;
  border-bottom: 1px solid #E1E8EE;
  padding: 20px;
  color: black;
  font-family: Nunito; 
}


.total {
  height: 140px;
  border-bottom: 1px solid #E1E8EE;
  padding: 20px;
  font-family: Nunito; 
  text-align: right;
}

.item {
padding: 20px;
width: 100%;
display: flex;
font-family: Lato; 
}
.image {
margin-right: 50px;
}

#imageIter{
width: 150px;
}

.description {
width: 350px;
}

.description span {
display: block;
font-size: 16px;
font-weight: 400;
}

.quantity {
padding-top: 25px;
margin-right: 12px;
}

.total-price {
width: 83px;
padding-top: 27px;
padding-left: 50px;
text-align: center;
font-size: 16px;
font-weight: 300;
}

.confirmreservationbtn {
  margin-top:8px;

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
</style>
