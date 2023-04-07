<template>
  <v-parallax
    :src="backgroundImg"
  >
  <NavigationBar1/>
  <div v-if="cart.length === 0 && !showPlaceholder"> 
    <div class="loader"></div>
    <h1 id="loadingmessage" >Loading your cart...</h1>
  </div>
  <EmptyCart v-else-if="cart.length === 0 && showPlaceholder"/>
  <div v-else>
      <div class="shopping-cart">
        <div class="title">
          <h1>What's in your cart...</h1>
        </div>
        <div class="item" v-for="(item, index) in cart" :key="index">
          <div class="buttons">
            <span class="delete-btn">
              <button @click="deleteItem(item.foodID, item.ImageURL, item.item, item.restaurant, item.price )" class="delete-btn">X</button>
            </span>
          </div>
          <div class="image">
            <v-img
              :src="item.ImageURL"
              contain
              id="imageIter"
            ></v-img>
          </div>
          <div class="description">
            <span>{{ item.restaurant }}</span>
            <span>{{ item.item }}</span>
            <span>${{ item.price }}</span>
          </div>
          <div class="quantity">
            <button class="minus-btn" @click="minusItem(item.foodID, item.ImageURL, item.item, item.restaurant, item.price)">
              -
            </button>
            {{ item.quantity }}
            <button class="plus-btn" @click="addItem(item.foodID, item.ImageURL, item.item, item.restaurant, item.price)">
              +             
            </button>
          </div>
          <div class="total-price">${{ item.subtotal.toFixed(2) }}</div>
        </div>   
        <div class="total">
          <h2 id="totalProfit"> Total: ${{totalCost.toFixed(2)}}</h2>
          <v-btn rounded="lg" color="green" @click="addToReservation(this.cart)" class="checkout-btn"> Add to Reservations</v-btn>
          </div>
    </div>
  </div>
</v-parallax>

</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useToast } from 'vue-toastification'
import firebaseApp from "../firebase";
import { getFirestore, doc, getDoc, getDocs, setDoc, updateDoc, collection, deleteDoc, serverTimestamp} from 'firebase/firestore';
import NavigationBar1 from '@/components/NavigationBar1.vue'
import EmptyCart from '@/components/EmptyCart.vue'
const toast = useToast();
const db = getFirestore(firebaseApp);

export default {
  name: 'AddToCart',
  components:{
    NavigationBar1,
    EmptyCart
  }, 
  data() {
    return {
      useremail: '',
      cart: [],
      totalCost: 0,
      availableQty:0,
      showPlaceholder: false, // Add a boolean data property
      backgroundImg: "https://firebasestorage.googleapis.com/v0/b/bt3103-project-8c8a0.appspot.com/o/VendorBackground3.jpg?alt=media&token=b39dfd4b-eb7e-4164-977e-39a8498bcfbd"
    }
  },
  async mounted() {
    const auth = getAuth();
     onAuthStateChanged(auth, (user) => {
      if (user) {
        this.useremail = auth.currentUser.email;
        this.retrieveCart();
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

  computed: {
    subtotal() {
      return this.cart.reduce((sum, item) => sum + item.subtotal, 0);
    },
    totalCost() {
      return this.totalCost = this.subtotal; 
    },
  },    
  methods: {
    async addToReservation(cart) {
      const cartRef = doc(db, "shopping_carts", this.useremail);
      const cartData = await getDoc(cartRef);
      const items = cartData.data().products;
      let tempArray = []
      tempArray = Object.entries(items).map(async ([key, value]) => {
        const [foodID, ImageURL, restaurant, item, price] = key.split(",");
        const quantity = value;
        const subtotal = price * quantity;
        return { foodID, ImageURL, restaurant, item, price, quantity, subtotal };
    });

      let tempResult = await Promise.all(tempArray);
      let canAddReservation = true;

      for (const item of tempResult) {
        const productRef = doc(db, "food_listings", item.foodID);
        const thisproductData = await getDoc(productRef);
        if (thisproductData.data().AvailableQty < item.quantity) {
          canAddReservation = false;
          break;
        } 
      }

      if (canAddReservation) {
        const randNum = Math.floor(Math.random() * 876543);
        const thisUsername = this.useremail;
        const thisCart = cart;
        const reservationNo = `FH-${randNum}`;
        const reservationRef = doc(db, "reservation_orders", reservationNo);
        await setDoc(reservationRef, {
          reservationNo: reservationNo,
          user: thisUsername,
          createdAt: serverTimestamp(),
          cart: thisCart,
          total: this.totalCost,
          confirmed: false,
          isPickedUp: false,
        });
        this.cart = [];
        await deleteDoc(cartRef);
        const orderNumberWithPrefix = `FH-${randNum}`;
        this.$router.push({ name: 'Confirmation', params: { reservationNumber: orderNumberWithPrefix }});
        this.cart = [];
      } else {
        this.cart = [];
        await deleteDoc(cartRef);
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
        this.$router.push('/restaurantlisting');
      }
    },

    async retrieveCart() {
      const cartRef = doc(db, "shopping_carts", this.useremail);
      const cartData = await getDoc(cartRef);
      const products = cartData.data().products || {};
      this.cart = [];

      this.cart = Object.entries(products).map(async ([key, value]) => {
        const [foodID, ImageURL,restaurant, item, price] = key.split(",");
        const quantity = value;
        const subtotal = price * quantity;
        return { foodID, ImageURL,restaurant, item, price, quantity, subtotal };
    });
      // sort the cart by id
      this.cart = await Promise.all(this.cart);
      this.cart.sort((a, b) => a.foodID.localeCompare(b.foodID));
    }, 

    async addItem(foodID, ImageURL, item, restaurant, price) {
        const cartRef = doc(db, "shopping_carts", this.useremail);
        const cartData = await getDoc(cartRef);
        // products refer to the product inside the cart.
        const products = cartData.data().products       
        const thisProduct = await doc(db, "food_listings",foodID); 
        const productKey = `${foodID},${ImageURL},${restaurant},${item},${price}`;
        const thisProductData = await getDoc(thisProduct);
        // this.availableQty refers to the product itself.
        this.availableQty = thisProductData.data().AvailableQty
        console.log(this.availableQty)
        if(this.availableQty >= products[productKey] + 1) {
          products[productKey]++
          toast.success("Quantity is added successfully!", {
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
          toast.error("Unsuccessful, you are not allowed to add further", {
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
        }// update the cart data
        await setDoc(cartRef, { products }, { merge: true });
        await this.retrieveCart();
        // // update the cart array in place
        // const itemIndex = this.cart.findIndex((item) => item.key === productKey);
        // if (itemIndex >= 0) {
        //   this.cart[itemIndex].quantity += 1;
        //   this.cart[itemIndex].subtotal += this.cart[itemIndex].price;
        // } else {
        //   const thisProduct = await doc(db, "food_listings", productKey);
        //   const thisProductData = await getDoc(thisProduct);
        //   const restaurant = thisProductData.data().Vendor;
        //   const item = thisProductData.data().Name;
        //   const price = thisProductData.data().Price;
        //   const quantity = 1;
        //   const subtotal = price;
        //   const newItem = { key: productKey, restaurant, item, price, quantity, subtotal };
        //   this.cart.push(newItem);
        // }
      },

      async minusItem(foodID, ImageURL, item, restaurant, price) {
        const cartRef = doc(db, "shopping_carts", this.useremail);
        const cartData = await getDoc(cartRef);
        // products refer to the product inside the cart.
        const products = cartData.data().products       
        const thisProduct = await doc(db, "food_listings",foodID); 
        const thisProductData = await getDoc(thisProduct);
        const productKey = `${foodID},${ImageURL},${restaurant},${item},${price}`;
        // this.availableQty refers to the product itself.
        this.availableQty = thisProductData.data().AvailableQty
        const productQuantity = products[productKey];
        if (productQuantity === 1) {
          await this.deleteItem(foodID,ImageURL, item, restaurant, price);
        } else {
          // Otherwise, decrease the quantity by 1
          products[productKey]--;
          toast.success("Quantity is deducted successfully!", {
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
        // update the cart data
        await setDoc(cartRef, { products }, { merge: true });
        await this.retrieveCart();
        // // update the cart array in place
        // const itemIndex = this.cart.findIndex((item) => item.key === productKey);
        // if (itemIndex >= 0) {
        //   const item = this.cart[itemIndex];
        //   if (item.quantity === 1) {
        //     this.cart.splice(itemIndex, 1);
        //   } else {
        //     item.quantity -= 1;
        //     item.subtotal -= item.price;
        //   }
        // }
      },

      async deleteItem(foodID, ImageURL,item, restaurant, price) {
         this.$swal.fire({
          title: 'Are you sure?',
          text: "Please confirm that you are removing the item from the cart?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm'
        }).then(async (result) => {
           if (result.isConfirmed) {
            const cartRef = doc(db, "shopping_carts", this.useremail);
            const cartData = await getDoc(cartRef);
            const products = cartData.data().products
            const productKey = `${foodID},${ImageURL},${restaurant},${item},${price}`;
            // remove the product from the products object
            delete products[productKey];      
            // update the cart data in Firestore
            await updateDoc(cartRef, { products });
            // refresh the cart data
            await this.retrieveCart();
            toast.success("Item is removed successfully!", {
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
        })
      } 
    },
    created() {
      setTimeout(() => {
        this.showPlaceholder = true;
      }, 750);
  },
  }
    
</script>

<style scoped>
/* [v-cloak] {
  display: none;
} */

* {
box-sizing: border-box;
}

.shopping-cart {
width: 900px;
height: auto;
margin: 5vh auto;
background: #FFFFFF;
box-shadow: 1px 2px 3px 0px rgba(0,0,0,0.10);
border-radius: 15px;
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
width: 400px;
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
margin-right: 30px;
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
padding-left: 50px;
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
  left: 50%;
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
  left: 53%;
  transform: translate(-50%, -50%);
  font-family: Nunito; 
  
}

</style>
