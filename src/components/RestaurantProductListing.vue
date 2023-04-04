<template>
    <div v-if="products.length === 0 && !showPlaceholder"> 
      <div class="loader"></div>
      <h1 id="loadingmessage" > Sourcing for available products...</h1>
    </div>
    <EmptyRestaurantListing v-else-if="products.length === 0 && showPlaceholder"/>
    <div v-else>
    <v-card id="finally">
    <v-tabs
        v-model="tab"
        background-color="primary"
    >
        <v-tab
        v-for="(products, category) in categorizedProducts"
        :key="category"
        :value="category"
        >
        {{ category }}
        </v-tab>
    </v-tabs>

    <v-card-text>
        <v-window v-model="tab">
        <v-window-item
            v-for="(products, category) in categorizedProducts"
            :key="category"
            :value="category"
        >
            <div class="category-wrapper">
            <div class="category">
                <div class="product-wrapper">
                <div v-for="prod in products" :key="prod.name" class="product">
                    <img src="@/assets/mcdonalds.jpg" alt="Restaurant Image" class="product-img">
                    <div class="product-name">
                    {{ prod.Name }}
                    </div>
                    <div class="description"> 
                    {{ prod.Description }}
                    </div>
                    <div class="addedQty"> 
                    <label for="quantity">Select Quantity: </label>
                    <select v-model="prod.selectedQty">
                        <option v-for="i in prod.AvailableQty" :key="i" :value="i">{{ i }}</option>
                    </select>          
                    </div>
                    <div class="price"> 
                    Price: ${{ prod.Price }}
                    </div>
                    <add-to-cart id="ATC" :quantity="prod.selectedQty" :prodID="prod"></add-to-cart>
                </div>
                </div>
            </div>
            </div>
        </v-window-item>
        </v-window>
    </v-card-text>
    </v-card>
</div>
</template>

<script>
    import firebaseApp from "../firebase";
    import { getFirestore } from 'firebase/firestore';
    import AddToCart from '@/components/AddToCart.vue';
    import { getDoc, doc, getDocs, collection} from 'firebase/firestore';
    import EmptyRestaurantListing from '@/components/EmptyRestaurantListing.vue'
    const db = getFirestore(firebaseApp);

    export default {
    name: "Restaurant",
    props: ['id'],
    components:{
        AddToCart,
        EmptyRestaurantListing
    },
    data() {
    return {
        products: [],
        uniqueCategories: [], 
        imageurl: "",
        tab: "",
        showPlaceholder: false
    }
    },

    async mounted() {
        const productRef = await getDocs(collection(db, "food_listings"));
        productRef.forEach((doc) => {
            if (doc.data().Restaurant_PersonalisationId === this.id && doc.data().AvailableQty > 0) {
            const product = doc.data();
            product.category = doc.data().Category;
            this.products.push(product);
            }
        });
        setTimeout(() => {
            this.showPlaceholder = true;
        },750);
},
  
    computed: {
        categorizedProducts() {
            const sortedCategories = Object.keys(this.products.reduce((acc, prod) => {
            if (!acc[prod.category]) {
                acc[prod.category] = [prod]
            } else {
                acc[prod.category].push(prod)
            }
            return acc
            }, {})).sort(); // sort the category keys in ascending order

            return sortedCategories.reduce((acc, category) => {
            acc[category] = this.products.filter(prod => prod.category === category)
            return acc
            }, {})
        },
    },

    async created() {
        const productRef = await getDocs(collection(db, "food_listings"));
        const uniqueCategories = [];
        productRef.forEach((doc) => {
            if (doc.data().Restaurant_PersonalisationId === this.id && doc.data().AvailableQty > 0) {
            const product = doc.data();
            product.category = doc.data().Category;
            if (!uniqueCategories.includes(product.category)) {
                uniqueCategories.push(product.category);
            }
            }
        })  
            uniqueCategories.sort((a, b) => a.localeCompare(b));
            this.tab = uniqueCategories[0]; // set default tab selected to first category
            console.log(uniqueCategories.length)
        }
    }

</script>
<style scoped>
.product-wrapper {
display: flex;
flex-wrap: wrap;
}

.product{
border: 2px solid #d3cdcd;
width: 300px;
height: 260px;
box-shadow: 0 2px #d3cdcd;
border-radius: 15px;
position: relative;
margin: 20px;
} 

#finally {
width:90vw;
height:auto;
padding-bottom:10px;
margin-bottom:20px;
margin-top:50px;
margin-left: 5vw;
}

.product-name {
  font-size: 22px;
  margin-left: 5px;
  font-family: "Lato";
  white-space: nowrap; 
  text-overflow: ellipsis; 
  overflow: hidden; 
}

.product-img {
width: 100%;
height: 150px;
border-radius: 15px;
font-family:"Lato";
}

.description{
width: 290px;
font-size: 16px;
margin-top: 2.5px;
margin-left: 5px;
font-family:"Lato";
white-space: nowrap; 
text-overflow: ellipsis; 
overflow: hidden; 
}

.addedQty{
width: 290px;
font-size: 16px;
margin-top: 2.5px;
margin-left: 5px;
font-family:"Lato";
}

.price{
width: 290px;
font-size: 16px;
margin-top: 2.5px;
margin-left: 5px;
font-family:"Lato";
}

#ATC{
left: 170px;
margin-top:-40px;
height: 10%;
width: 42%;
}

select {
-webkit-appearance: listbox !important;
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
  top: 70%;
  left: 45%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

#loadingmessage{
  text-align: center;
  position: absolute;
  top: 85%;
  left: 48%;
  transform: translate(-50%, -50%);
  font-family: Nunito; 
  
}

</style>
