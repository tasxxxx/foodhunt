<template> 
  <v-parallax
    :src="backgroundImg"
  >
  <div class="navigation-bar"> 
        <NavigationBar1 v-if="isLoggedIn && isCustomer"/>
        <VendorBreadCrumbs v-else-if="isLoggedIn"/>
        <NavigationBar2 v-else/>

    </div>
  <div class="error-customer" v-if="isLoggedIn && isCustomer"> 
    <img id ="error404" src="@/assets/shutterstock_774749455-removebg-preview.png" alt = "">
      <h1 id="message">Page not found! <br> Please click on the above available option </h1>
      <v-breadcrumbs-item :to="{ name: 'restaurantlisting'}" >
        <v-btn rounded="lg" color="primary" id="btn"> Start Hunting!</v-btn>
      </v-breadcrumbs-item>
    </div>

    <div class="error-vendor" v-else-if="isLoggedIn"> 
    <img id ="error404" src="@/assets/shutterstock_774749455-removebg-preview.png" alt = "">
      <h1 id="message">Page not found! <br> Please click on the above available option </h1>
      <v-breadcrumbs-item :to="{ name: 'restaurantlisting'}" >
        <v-btn rounded="lg" color="primary" id="btn"> Start Hunting!</v-btn>
      </v-breadcrumbs-item>
    </div>

    <div class="error-nonuser" v-else> 
    <img id ="error404" src="@/assets/shutterstock_774749455-removebg-preview.png" alt = "">
      <h1 id="message">Page not found! <br> Please click on the above available option </h1>
    </div>
    </v-parallax>
    </template>
    
    <script>
    import NavigationBar1 from '@/components/NavigationBar1.vue'
    import NavigationBar2 from '@/components/NavigationBar2.vue'
    import VendorBreadCrumbs from '@/components/VendorBreadCrumbs.vue'
    import { getAuth, onAuthStateChanged} from "firebase/auth";
    import { getDoc, doc, getFirestore} from 'firebase/firestore';
    const db = getFirestore();

    export default {
        name: "Error404", 
    
        components: {
            NavigationBar1, 
            NavigationBar2,
            VendorBreadCrumbs
        }, 
    
        data() {
            return {
                useremail: "", 
                isCustomer: false,
                isLoggedIn: false, 
                backgroundImg: "https://firebasestorage.googleapis.com/v0/b/bt3103-project-8c8a0.appspot.com/o/VendorBackground3.jpg?alt=media&token=b39dfd4b-eb7e-4164-977e-39a8498bcfbd"
        }
    }, 
    
        async mounted() {
            const auth = getAuth();
            onAuthStateChanged(auth, async (user) => {
                if (user) {
                    this.useremail = auth.currentUser.email;
                    this.isLoggedIn = true; 
                    const userRef = doc(db, 'Users', this.useremail);
                    const docSnap = await getDoc(userRef);
                    const documentData = docSnap.data();
                    if ("Customer" === documentData.UserType) {
                        this.isCustomer = true; 
                    }
                }
            })
        }
    }
    </script>
    <style scoped> 
    .navigation-bar {
    position: relative;
    /* z-index: 1; */
    }

    .error-nonuser {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    }

    .error-vendor {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-left: -250px;
    }

    .error-customer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-left: 100px;
    }

    #error404 {
    margin-top: -200px;
    margin-left:325px;
    width: 500px;
    }

    #message {
    margin-top: -25px;
    margin-left:340px;
    margin-bottom: 25px;
    font-family: Nunito; 
    text-align: center;
    }

    #btn {
        margin-left:340px;
    } 

    </style>