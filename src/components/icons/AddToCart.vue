<template>
    <v-btn class="add-to-cart" rounded="lg" color="primary" @click="addToCart"> Add to Cart</v-btn>  </template>
  <script>
//   import firebase from 'firebase';
  import {getAuth, onAuthStateChanged} from "firebase/auth";
  import firebaseApp from '../../firebase.js';
  import {getFirestore} from "firebase/firestore";
  // import { getDoc, doc, updateDoc} from "firebase/firestore";
  import { useToast } from 'vue-toastification'
  const db = getFirestore(firebaseApp);
  
  export default {
    name: 'AddToCart',
    data() {
          return {
              user: false,
          }
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
            // // Get the details of the product that the user wants to add to the cart
            // const productRef = await getDoc(doc(db, "products", this.productID));
            // const productData = productRef.data();
            // //// For the alert
            // const toast = useToast();

            if(this.user) {
            //     // Retrieve the user's shopping cart
            //     const cartRef = doc(db, "shopping-carts", this.user.uid);
            //     const cartData = await getDoc(cartRef);

            //     // Get the current list of products in the cart, or create an empty list if none exists
            //     const products = cartData.exists() ? cartData.data().products : {};

            //     // Add the desired quantity of the product to the cart
            //     if (products.hasOwnProperty(this.productID)) {
            //         products[this.productID] += this.quantity;
            //     } else {
            //         products[this.productID] = this.quantity;
            //     }

            //     // Update the cart document in Firestore with the updated product list
            //     await setDoc(cartRef, { products: products });

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

