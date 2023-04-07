<template>
    <v-btn class="add-to-cart" rounded="lg" color="primary" @click="addToCart"> Add to Cart</v-btn>  </template>
  
  <script>
  import {getAuth, onAuthStateChanged} from "firebase/auth";
  import { useToast } from 'vue-toastification'
  import firebaseApp from "../../firebase";
  import { getFirestore } from 'firebase/firestore';
  import { getDoc, doc, setDoc} from 'firebase/firestore';
  const db = getFirestore(firebaseApp);
  
  export default {
    name: 'AddToCart',
    data() {
          return {
              user: false,
          }
    },

    props: {
      quantity: Number,
      prodID: Object
    },

    mounted() {
          const auth = getAuth()
          onAuthStateChanged(auth, (user) => {
              if (user) {
                  this.user = user
              }
          })
      },

    methods: {
        async addToCart() {
          const toast = useToast();
          // Can access the details here. 
          const productData = this.prodID;
          if(this.user) {
            // Retrieve the user's shopping cart
            const cartRef = doc(db, "shopping_carts", this.user.email);
            const cartData = await getDoc(cartRef);

            // Get the current list of vendors in the cart, or create an empty list if none exists
            const vendors = cartData.exists() ? cartData.data().vendors : {};

            // Get the vendor's ID from the product information
            const vendorID = this.prodID.Vendor;

            // Get the current list of products for the vendor, or create an empty list if none exists
            const vendorProducts = vendors.hasOwnProperty(vendorID) ? vendors[vendorID] : {};

            // Add the desired quantity of the product to the vendor's list in the cart
            if (vendorProducts.hasOwnProperty(this.prodID.Name)) {
                vendorProducts[this.prodID.Name] += this.quantity;
            } else {
                vendorProducts[this.prodID.Name] = this.quantity;
            }

            // Add or update the vendor's list in the cart
            vendors[vendorID] = vendorProducts;

            // Update the cart document in Firestore with the updated vendor list
            await setDoc(cartRef, { vendors: vendors });

            toast.success("Product is successfully added to the cart!", {
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
          else { //// if user is not logged in, and when it clicks on the add to cart
            //// error button will be prompted and push to login. 
            toast.error("Non-registered users are not permitted to add to cart!", {
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
            this.$router.push('/login') 
          }      
        }
      }
  };
  </script>
  
  <style scoped>
  /* Add styles for the AddToCart button here */
  </style>

