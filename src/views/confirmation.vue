<template>
  <NavigationBar1/>
  <div class="shopping-cart">
    <div class="title">
      <h1>Confirm your reservation for {{ this.reservationNumber }}!</h1>
    </div>
    <h2 id="time">{{ details.dateTimeString }}</h2>
    <!-- Item iteration -->
    <div class="item" v-for="prod in details.cart" :key="index">
      <div class="description">
        <span>{{ prod.restaurant }}</span>
        <span>{{ prod.item }}</span>
      </div>
      <div class="quantity">
        {{ prod.quantity }}
      </div>
      <div class="total-price">${{ prod.subtotal }}</div>
    </div>
    <div class="total">
      <h2 id="totalProfit"> Total: ${{ details.total }} </h2>
      <h3 id="totalProfit"> Payment by: In store payment </h3>
      <v-btn rounded="lg" color="primary" @click="confirm"> Confirm Reservation</v-btn>
    </div>
  </div>   
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

.shopping-cart {
width: 50vw;
margin: 5vh auto;
background: #FFFFFF;
box-shadow: 1px 2px 3px 0px rgba(0,0,0,0.10);
border-radius: 6px;
display: flex;
flex-direction: column;
}
.title {
  height: 10vh;
  border-bottom: 1px solid #E1E8EE;
  padding: 20px;
  color: black;
  font-family: Nunito; 
}

.total {
  height: 14vh;
  border-bottom: 1px solid #E1E8EE;
  padding: 20px;
  color: black;
  font-family: Nunito; 
  text-align: right;
}

.item {
padding: 20px;
height: 15vh;
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
width: 460px;
}

.description span {
display: block;
font-size: 16px;
color: #43484D;
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
margin-right: 50px;
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
padding-left: 10px;
text-align: center;
font-size: 16px;
color: #43484D;
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
