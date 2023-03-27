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
      <h1>What's in your cart!</h1>
      <table id="table" class="auto-index">
        <tr>
          <th>S.No</th>
          <th>Restaurant</th>
          <th>Item</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        <tr v-for="(item, index) in cart" :key="item.item">
          <td>{{ index + 1 }}</td>
          <td>{{ item.restaurant }}</td>
          <td>{{ item.item }}</td>

          <td>{{ item.price }}</td>
          <td>{{ item.quantity }}</td>
          <td>
            <button @click="deleteInstrument(row.coin, useremail)" class="bwt">Delete</button>
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
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import NavigationBar1 from '@/components/icons/NavigationBar1.vue'

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
        const toast = useToast();
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
        for (const key in products) {
          if (products.hasOwnProperty(key)) {
            const value = products[key];
            const keyArray = key.split(",");
            const product = { restaurant: keyArray[0], item: keyArray[1], price: keyArray[2], quantity: value };
            this.cart.push(product);
          }
        }
      }
    }
  };
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
  background-color: #dc3545;
  border: none;
  color: white;
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
</style>
