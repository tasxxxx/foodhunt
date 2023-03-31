<template>
    <v-btn class="add-to-cart" rounded="lg" color="primary" @click="addToCart"> Add to Cart</v-btn>  
</template>
  
  <script>
  import {getAuth, onAuthStateChanged} from "firebase/auth";
  import { useToast } from 'vue-toastification'
  import firebaseApp from "../../firebase";
  import { getFirestore } from 'firebase/firestore';
  import { getDoc, getDocs, collection, doc, setDoc} from 'firebase/firestore';
  const db = getFirestore(firebaseApp);
  
  export default {
    name: 'AddToCart',
    data() {
          return {
              user: false,
              maxQuantity: 0, 
              currentCartQty: 0
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
              // Add the desired quantity of the product to the cart
              if (this.quantity === undefined) { 
                toast.error("Error in adding to cart!", {
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
              // Retrieve the user's shopping cart
              const cartRef = doc(db, "shopping_carts", this.user.email);
              const cartData = await getDoc(cartRef);

              if (!cartData.exists()) {
                // If the document does not exist, create it
                await setDoc(cartRef, { products: {}});
              }
                
              // Get the current list of products in the cart, or create an empty list if none exists
              const products = cartData.exists() ? cartData.data().products : {};
              // const products = cartData.data().products
                const productKey = `${this.prodID.Vendor},${this.prodID.Name},${this.prodID.Price}`
                // get maxQuantity 
                const productRef = await getDocs(collection(db, "food_listings"));
                productRef.forEach((doc) => {
                if (this.prodID.Vendor === doc.data().Vendor && this.prodID.Name === doc.data().Name) {
                  this.maxQuantity = doc.data().AvailableQty
                }})

                if(this.maxQuantity < (products[productKey] + this.quantity)) {
                  toast.error("Unsuccessful execution! Please reduce quantity!", {
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
                  if (products.hasOwnProperty([this.prodID.Vendor, this.prodID.Name, this.prodID.Price])) {
                  products[[this.prodID.Vendor, this.prodID.Name, this.prodID.Price]] += this.quantity;
                  } else {
                  products[[this.prodID.Vendor, this.prodID.Name, this.prodID.Price]] = this.quantity;
                  }
                  await setDoc(cartRef, { products: products });
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
            }
            } 
        else { 
          //// if user is not logged in, and when it clicks on the add to cart
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
  </style>

