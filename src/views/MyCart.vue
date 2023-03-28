<template>
  <NavigationBar1/>
  <div>
    <div class="empty-cart-container" v-if="cart.length === 0">
      <img id ="emptycart" src="@/assets/preview.png" alt = "">
      <h1 id="message">Oops! It seems like your cart is feeling a bit empty. Time to add some items and fill it up!</h1>
      <v-breadcrumbs-item :to="{ name: 'mainlisting'}">
        <v-btn rounded="lg" color="primary"> Start Hunting!</v-btn>
      </v-breadcrumbs-item>
      <img id ="emojisad" src="@/assets/emoji.webp" alt = "">

    </div>
    <div v-else>
      <h1>What's in your cart...</h1>
      <table id="table" class="auto-index">
        <tr>
          <th>S.No</th>
          <th>Restaurant</th>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Actions</th>
        </tr>
        <tr v-for="(item, index) in cart" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.restaurant }}</td>
          <td>{{ item.item }}</td>
          <td>{{ item.price }}</td>
          <td>
            <button @click="minusItem(item.item, item.restaurant, item.price)" class="bwtminus">-</button>
            {{ item.quantity }}
            <button @click="addItem(item.item, item.restaurant, item.price)" class="bwtplus">+</button>
          </td>
          <td>
            <button @click="deleteItem(item.item, item.restaurant, item.price)" class="bwt">X</button>
          </td>
        </tr>
      </table>
      <h2 id="totalProfit"> Total Profit is : {{totalCost}} USD</h2>
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
  methods: {
    async retrieveCart() {
      const toast = useToast();
      const cartRef = doc(db, "shopping_carts", this.useremail);
      const cartData = await getDoc(cartRef);
      const products = cartData.data().products || {};
      this.cart = [];
      
      this.cart = Object.entries(products).map(([key, value]) => {
      const [restaurant, item, price] = key.split(",");
      return { restaurant, item, price, quantity: value, id: `${restaurant}-${item}-${price}` };
      });
      
      // sort the cart by id
      this.cart.sort((a, b) => a.id.localeCompare(b.id));
      }, 

      async minusItem(item, restaurant, price) {
        const cartRef = doc(db, "shopping_carts", this.useremail);
        const cartData = await getDoc(cartRef);
        const products = cartData.data().products
        const productKey = `${restaurant},${item},${price}`;
        const productQuantity = products[productKey];
        if(productQuantity > 1) {
          products[productKey]--
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
        } else if (productQuantity === 0) {
          deleteItem(item, restaurant, price)
        }
        console.log(products[productKey])
        // update the cart data
        await setDoc(cartRef, { products }, { merge: true });
        await this.retrieveCart();
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
            updateDoc(cartRef, { products });
            // refresh the cart data
            this.retrieveCart();
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
/* Set the font size for the table headers */
#table th {
  font-size: 1.2em;
  font-weight: bold;
}

/* Set the font size for the table cells */
#table td {
  font-size: 1.1em;
}

/* Set the width of the first column */
#table td:first-child {
  width: 5%;
}

/* Add a background color to the table headers */
#table th {
  background-color: #f7f7f7;
}

/* Add a border to the table */
#table {
  border-collapse: collapse;
  border: 1px solid #ddd;
  width: 100%;
  margin-top: 20px;
}

/* Add a border to the table cells and alternate background colors */
#table tr:nth-child(even) {
  background-color: #f2f2f2;
}

#table tr:hover {
  background-color: #f5f5f5;
}

#table td, #table th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

/* Style the delete button */
.bwt {
  background-color: red;
  border: none;
  color: black;
  padding: 5px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}

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

.bwtminus,
.bwtplus {
  font-size: 1.2rem;
  width: 30px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #ccc;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 5px;
  text-align:center;
}

.bwtminus:hover,
.bwtplus:hover {
  background-color: #ccc;
  color: #fff;
}

.bwt:hover {
  background-color: #dc3545;
  color: white;
}
</style>
