<template>  
    <NavigationBar1/>
    <div class="restaurant-info">
      <img id = "restaurantimg" src="@/assets/mcdonalds.jpg" alt = "">
      <img id="restaurantimg1" :src="restaurant.imageurl" alt="">
      <h1 id="restaurantname">{{ restaurant.name }}</h1>       
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

  <h2 class="text" style="font-family:Nunito">Available Products</h2>
  <div class="product-card-info">
      <div v-for="prod in products" :key="prod.name" className="product">
          <img src="@/assets/mcdonalds.jpg" alt="Restaurant Image" className="product-img">
          <!-- {{ f.id }} -->
          <div className="product-name">
            {{ prod.Name }}
          </div>
          <div className="description"> 
            {{ prod.Description }}
          </div>
          <div className="addedQty"> 
            <label for="quantity">Added Quantity: </label>
              <select>
              <option v-for="i in prod.AvailableQty" :key="i" :value="selectedQuantity">{{ i }}</option>
              </select>          
          </div>
          <div className="price"> 
            Price: ${{ prod.Price }}
          </div>
          <add-to-cart id="ATC"></add-to-cart>
      </div>
      
    </div> 
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
      imageurl: "",
      selectedQuantity: 1
    }
  },  
  async mounted() {
    // for the time being it is hardcoded, but i will need to wait for the router to be ready before I can... 
    const restaurantRef = doc(db, 'restaurant_personalisation', 'McDonalds');
    const docSnap = await getDoc(restaurantRef);

    if (docSnap.exists()) {
      const documentData = docSnap.data();

      const name = documentData.Name;
      // const image = documentData.imageID;
      const tags = documentData.Tags.join(" / ");
      const address = documentData.Address;
      const monday = documentData.Monday; 
      const tuesday = documentData.Tuesday; 
      const wednesday = documentData.Wednesday; 
      const thursday = documentData.Thursday; 
      const friday = documentData.Friday; 
      const saturday = documentData.Saturday; 
      const sunday = documentData.Sunday; 
      const remarks = documentData.Remarks.join("<br>");
      this.restaurant = {
        name,
        tags,
        address,
        monday,
        tuesday, 
        wednesday,
        thursday,
        friday, 
        saturday, 
        sunday, 
        remarks,
      };
      this.imageurl = documentData.imageID;
    } else {
      console.log('No such document!');
    }

    const productRef = await getDocs(collection(db, "food_listings"))
    productRef.forEach((doc) => {
      if ('McDonalds' === doc.data().Vendor) {
              this.products.push(doc.data()); 
            }
      });
    } 
  };  
</script>
<style scoped>
#restaurantimg {
  width: 100vw;
  height: 35vh;
}
#restaurantname {
  margin-left:5vw;
  font-family:"Nunito";
}

#restauranttag {
  margin-left:5vw;
  font-family:"Lato";
}
.text-right {
  margin-top:-65px;
  margin-right:5vw;
}

.product-card-info {
  display:flex;
  flex-wrap: wrap;
  margin-left:4vw;
  margin-top: 10px;

}
.text { 
  margin-left:5vw;
  margin-top: 50px;
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

.product-name {
  font-size: 20px;
  margin-top: -8px;
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
  margin-left: 5px;
  font-family:"Lato";
}
.addedQty{
  width: 99999999999999px;
  margin-left: 5px;
  font-family:"Lato";
}

.price{
  width: 99999999999999px;
  margin-left: 5px;
  font-family:"Lato";
}

#ATC{
  left: 170px;
  margin-top:-60px;
  height: 10%;
  width: 42%;
}

select {
  -webkit-appearance: listbox !important;
}

</style>

