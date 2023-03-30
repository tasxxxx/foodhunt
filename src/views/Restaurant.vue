<template>  
  <NavigationBar1/>
  <div class="restaurant-info">
    <img id = "restaurantimg" src="@/assets/macdonaldbanner.jpeg" alt = "">
    <h1 id="restaurantname">{{ restaurant.name }}</h1>       
    <div class = "tags">
      <v-chip color="rgba(109,93,36,1)"> {{ restaurant.cuisine }} </v-chip>
      <v-chip color="rgba(109,93,36,1)"> {{ restaurant.pricerange }} </v-chip>
    </div>
    <h3 id="restauranttag" v-html="restaurant.tags"></h3>
    <div class="text-right">
      <v-dialog v-model="dialog" width="auto"> 
        <template v-slot:activator="{ props }">
            <v-btn
              color="rgba(109,93,36,1)"
              v-bind="props"
              prepend-icon="mdi-information" 
              variant="tonal"
              style="font-family:Nunito"
            >
            View Info
            </v-btn>
        </template>
          <v-card>
            <v-card-text>
              <h2 class="text-center" style="font-family:Nunito">About </h2>
              <table>
                <thead>
                </thead>
                  <tr class="text-left" style="font-family:Mulish"> 
                    Address
                    <td style="font-family:Mulish">{{ restaurant.address }}</td>
                  </tr>
                <h3 style="font-family:Nunito; text-align: center">Operating Hours </h3>
                  <tr class="text-left" style="font-family:Mulish"> 
                    Monday
                    <td style="font-family:Mulish">{{ restaurant.monday }}</td>
                  </tr>
                  <tr class="text-left" style="font-family:Mulish"> 
                    Tuesday
                    <td style="font-family:Mulish">{{ restaurant.tuesday }}</td>
                  </tr>
                  <tr class="text-left" style="font-family:Mulish"> 
                    Wednesday
                    <td style="font-family:Mulish">{{ restaurant.wednesday }}</td>
                  </tr>
                  <tr class="text-left" style="font-family:Mulish"> 
                    Thursday
                    <td style="font-family:Mulish">{{ restaurant.thursday }}</td>
                  </tr>
                  <tr class="text-left" style="font-family:Mulish"> 
                    Friday
                    <td style="font-family:Mulish">{{ restaurant.friday }}</td>
                  </tr>
                  <tr class="text-left" style="font-family:Mulish"> 
                    Saturday
                    <td style="font-family:Mulish">{{ restaurant.saturday }}</td>
                  </tr>
                  <tr class="text-left" style="font-family:Mulish"> 
                    Sunday
                    <td style="font-family:Mulish">{{ restaurant.sunday }}</td>
                  </tr>
                  <tr class="text-left" style="font-family:Mulish"> 
                    Remarks
                    <td style="font-family:Mulish" v-html="restaurant.remarks"></td>
                  </tr>
              </table>
          </v-card-text>
            <v-card-actions>
            <v-btn color="rgba(109,93,36,1)" block @click="dialog = false">Close</v-btn>
            </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
    </div> 

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
</template>

<script> 
import NavigationBar1 from '@/components/icons/NavigationBar1.vue'
import AddToCart from '@/components/icons/AddToCart.vue';
import firebaseApp from "../firebase";
import { getFirestore } from 'firebase/firestore';
import { getDoc, doc, getDocs, collection} from 'firebase/firestore';
const db = getFirestore(firebaseApp);

export default {
name: "Restaurant",
// props: ['id'],
components:{
  NavigationBar1,
  AddToCart
},
data() {
  return {
    dialog: false, 
    restaurant: [],
    products: [],
    uniqueCategories: [], 
    imageurl: "",
    tab: ""
  }
},  
async mounted() {
  // for the time being it is hardcoded, but i will need to wait for the router to be ready before I can... 
  const restaurantRef = doc(db, 'restaurant_personalisation', 'McDonalds');
  const docSnap = await getDoc(restaurantRef);

  if (docSnap.exists()) {
    const documentData = docSnap.data();

    const name = documentData.Name;
    const address = documentData.Address;
    const monday = documentData.Monday; 
    const tuesday = documentData.Tuesday; 
    const wednesday = documentData.Wednesday; 
    const thursday = documentData.Thursday; 
    const friday = documentData.Friday; 
    const saturday = documentData.Saturday; 
    const sunday = documentData.Sunday; 
    const remarks = documentData.Remarks.split(',').join("<br>");
    const pricerange = documentData.Price_Range; 
    const cuisine = documentData.Cuisines; 

    this.restaurant = {
      name,
      address,
      monday,
      tuesday, 
      wednesday,
      thursday,
      friday, 
      saturday, 
      sunday, 
      remarks,
      pricerange, 
      cuisine
    };

    this.imageurl = documentData.imageID;
  } else {
    console.log('No such document!');
  }

  const productRef = await getDocs(collection(db, "food_listings"));
  productRef.forEach((doc) => {
    if (doc.data().Vendor === 'McDonalds' && doc.data().AvailableQty > 0) {
      const product = doc.data();
      product.category = doc.data().Category;
      this.products.push(product);
    }
  });
  },
  
computed: {
  categorizedProducts() {
    return this.products.reduce((acc, prod) => {
      if (!acc[prod.category]) {
        acc[prod.category] = [prod]
      } else {
        acc[prod.category].push(prod)
      }
      return acc
    }, {})
  }, 
}, 
async created() {
  const productRef = await getDocs(collection(db, "food_listings"));
  const uniqueCategories = [];
  
  productRef.forEach((doc) => {
    if (doc.data().Vendor === 'McDonalds' && doc.data().AvailableQty > 0) {
      const product = doc.data();
      product.category = doc.data().Category;
      if (!uniqueCategories.includes(product.category)) {
        uniqueCategories.push(product.category);
      }
    }
  });  
  this.tab = uniqueCategories[0]; // set default tab selected to first category
}
}
</script>
<style scoped>

#restaurantimg {
width: 100%;
height: 400px;
}

#restaurantname {
margin-left:5vw;
font-family:"Nunito";
}

.tags {
margin-left:5vw;
font-family:"Lato";
}

.text-right {
margin-top:-65px;
margin-right:5vw;
}

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
font-family:"Lato";

}
.product-img {
width: 100%;
height: 150px;
border-radius: 15px;
font-family:"Lato";
}

.description{
width: 99999999999999px;
font-size: 16px;
margin-top: 2.5px;
margin-left: 5px;
font-family:"Lato";
}

.addedQty{
width: 99999999999999px;
font-size: 16px;
margin-top: 2.5px;
margin-left: 5px;
font-family:"Lato";
}

.price{
width: 99999999999999px;
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

</style>


