<template>
  <NavigationBar1/>
    <div class="empty-cart-container" v-if="cart.length === 0">
      <img id ="emptycart" src="@/assets/preview.png" alt = "">
      <h1 id="message">Oops! It seems like your cart is feeling a bit lonely. Time to add some items and fill it up!</h1>
      <v-breadcrumbs-item :to="{ name: 'mainlisting'}">
        <v-btn rounded="lg" color="primary"> Start Hunting!</v-btn>
      </v-breadcrumbs-item>
      <img id ="emojisad" src="@/assets/emoji.webp" alt = "">
    </div>
    <div v-else>
      <div class="shopping-cart">
        <!-- Title -->
        <div class="title">
          <h1>What's in your cart...</h1>
        </div>
        <!-- Item iteration -->
        <div class="item" v-for="(item, index) in cart" :key="index">
          <div class="buttons">
            <span class="delete-btn">
              <button @click="deleteItem(item.item, item.restaurant, item.price)" class="delete-btn">X</button>
            </span>
          </div>
          <div class="image">
            <img id="imageIter" src="@/assets/macs.jpg" alt="" />
          </div>
          <div class="description">
            <span>{{ item.restaurant }}</span>
            <span>{{ item.item }}</span>
            <span>${{ item.price }}</span>
          </div>
          <div class="quantity">
            <button class="minus-btn" @click="minusItem(item.item, item.restaurant, item.price)">
              -
            </button>
            {{ item.quantity }}
            <button class="plus-btn" @click="addItem(item.item, item.restaurant, item.price)">
              +             
            </button>
          </div>
          <div class="total-price">${{ item.subtotal }}</div>
        </div>   
        <div class="total">
          <h2 id="totalProfit"> Total: ${{totalCost}}</h2>
          <v-btn rounded="lg" color="orange" @click="deleteItem(item.item, item.restaurant, item.price)" class="checkout-btn"> Checkout</v-btn>
          </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useToast } from 'vue-toastification'
import firebaseApp from "../firebase";
import { getFirestore, doc, getDoc, getDocs, setDoc, updateDoc, collection} from 'firebase/firestore';
import NavigationBar1 from '@/components/icons/NavigationBar1.vue'
const toast = useToast();
const db = getFirestore(firebaseApp);

export default {
  name: 'AddToCart',
  components:{
    NavigationBar1
  }, 
  data() {
    return {
      useremail: '',
      cart: [],
      totalCost: 0,
      availableQty:0
    }
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.useremail = auth.currentUser.email;
        this.retrieveCart();
      } else {
        if (this.$route.path.split('/').pop() !== "mainlisting") {
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
      return this.subtotal;
    },
  },    
  methods: {
    async retrieveCart() {
      const toast = useToast();
      const cartRef = doc(db, "shopping_carts", this.useremail);
      const cartData = await getDoc(cartRef);
      const products = cartData.data().products || {};
      this.cart = [];
      
      this.cart = Object.entries(products).map(([key, value]) => {
      const [restaurant, item, price] = key.split(",");
      const quantity = value;
      const subtotal = price * quantity;
      return { restaurant, item, price, quantity, subtotal, id: `${restaurant}-${item}-${price}` };
    });
      
      // sort the cart by id
      this.cart.sort((a, b) => a.id.localeCompare(b.id));
      }, 

      async addItem(item, restaurant, price) {
        const cartRef = doc(db, "shopping_carts", this.useremail);
        const cartData = await getDoc(cartRef);
        const products = cartData.data().products
        const productKey = `${restaurant},${item},${price}`;
        
        const productRef = await getDocs(collection(db, "food_listings"));
        productRef.forEach((doc) => {
        if (restaurant === doc.data().Vendor && item === doc.data().Name) {
          this.availableQty = doc.data().AvailableQty
          console.log(this.availableQty)
        }
        });

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
      },


      async minusItem(item, restaurant, price) {
        const cartRef = doc(db, "shopping_carts", this.useremail);
        const cartData = await getDoc(cartRef);
        const products = cartData.data().products
        const productKey = `${restaurant},${item},${price}`;
        const productQuantity = products[productKey];
        if (productQuantity === 1) {
          await this.deleteItem(item, restaurant, price);
        } else {
          // Otherwise, decrease the quantity by 1
          products[productKey]--;
          // Update the cart data
          await setDoc(cartRef, { products }, { merge: true });
          await this.retrieveCart();
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
      },

      deleteItem(item, restaurant, price) {
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
            const productKey = `${restaurant},${item},${price}`;
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
    }
</script>

<style scoped>
.empty-cart-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#emptycart {
  width: 500px;
}

#emojisad {
  width: 310px;
}

#message {
  margin-bottom: 25px;
}

* {
box-sizing: border-box;
}

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

.item:nth-child(2) {
border-top:  1px solid #E1E8EE;
border-bottom:  1px solid #E1E8EE;
}

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
