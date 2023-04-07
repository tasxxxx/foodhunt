<template>  
    <div class="navigation-bar">
      <NavigationBar1 v-if="isLoggedIn" />
      <NavigationBar2 v-else />
    </div>

      <div className="banner">
        <img :src="bgImageUrl">
        <!-- :src="bgImageUrl" -->
      </div>

        <!-- <img id = "restaurantimg" src="@/assets/macdonaldbanner.jpeg" alt = ""> -->
      <div className="text">
        <h2 style="font-family:Nunito; margin-left: 5vw;">Around the island..</h2>
      </div>

      <SearchBarAndFilter 
        @search="handleSearch"
        @filterCuisine="handleCuisine" 
        @filterPrice="handlePrice" 
        @filterPostalCode="handlePostalCode"
      />

      <!-- <v-breadcrumbs-item :to="{ name: 'restaurant'}">
        <v-icon icon="mdi-shopping"></v-icon>
          My restaurant |
      </v-breadcrumbs-item> -->

    <div v-if="openRestaurants.length === 0 && !showPlaceholder"> 
      <div class="loader"></div>
      <h1 id="loadingmessage" > Sourcing for available restaurants...</h1>
    </div>
    <EmptyRestaurant v-else-if="openRestaurants.length === 0 && showPlaceholder"/>
    <div v-else>
    <div class="restaurants">       
      <div v-for="restaurant in searchRestaurant" :key="restaurant.id" className="restaurant">
        <router-link :to="{ name: 'restaurant', params: { id: restaurant.Restaurant_PersonalisationId }}">
          <v-img
                      :src="restaurant.ProfileURL"
                      contain
                      class="restaurant-img"
                    ></v-img>
          <div className="restaurant-name">
            {{ restaurant.Name }}
          </div>
          <div className="description">
            <div className="cuisine"> 
              <v-chip color="rgba(109,93,36,1)"> {{ restaurant.Cuisines }} </v-chip>
            </div>
            <div className="price">
              <v-chip color="rgba(109,93,36,1)"> {{ restaurant.Price_Range }} </v-chip>
            </div>
            <div className="location">
              <img src="../assets/location.png" :title="restaurant.Address">
            </div>
            <div className="closingTime">
              {{ closingTimes(restaurant) }}
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <h3 v-if="showTagline" class="searchtagline" >The end... Happy hunting!<br><br><br></h3>
  </div>
</template>
  
<script> 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavigationBar1 from '@/components/NavigationBar1.vue'
import NavigationBar2 from '@/components/NavigationBar2.vue'
import SearchBarAndFilter from '@/components/SearchBarAndFilter.vue'
import firebaseApp from "../firebase";
import { getFirestore } from 'firebase/firestore';
import { getDoc, doc, getDocs, collection} from 'firebase/firestore';
import { onRenderTracked } from 'vue';
import EmptyRestaurant from '@/components/EmptyRestaurant.vue'

const db = getFirestore(firebaseApp);
  
export default {
  name: "RestaurantListing",
  components:{
    NavigationBar1,
    NavigationBar2,
    SearchBarAndFilter,
    EmptyRestaurant,
  },

  data() {
    return {
      isLoggedIn: false,
      restaurants: [],
      bgImageUrl: "https://firebasestorage.googleapis.com/v0/b/bt3103-project-8c8a0.appspot.com/o/images%2Ffinal_banner.png?alt=media&token=9746cd21-22c2-462a-adb1-c65163fa75b9",
      searchRestaurant: [],
      searchValue: "",
      searchOn: false,
      cuisines: [ //hardcoded and order matches SearchBarAndFilter.vue same for pricerange
      'Chinese',  'Indian',  'Malay', 'Café', 'American', 'Thai', 'Taiwanese', 'Dessert', 'Japanese', 'Korean', 'Vietnamese', 'Fast Food', 'Coffee', 'Cakes', 'Ice Cream', 'Hawker', 'Italian', 'Bakery'].sort(),
      // [,
      pricerange: [
        "$",
        "$$",
        "$$$",
      ],
      cuisineFilter: false,
      priceFilter: false,
      selectedCuisineTags : [],
      selectedPriceTags: [],
      needOriginalSearch: false,
      postalCodeFilter: false,
      selectedPostalCode: '',
      showTagline: false,
    }
  },

  emits: ["clearFilters", "selectedPostalCode"],

  async mounted() {
    try {
      const querySnapshot = await getDocs(collection(db, "restaurant_personalisation"))
      this.restaurants = querySnapshot.docs.map(doc => doc.data())
      this.searchRestaurant = querySnapshot.docs.map(doc => doc.data())
      // Set showPlaceholder to true after a delay of 3 seconds
      setTimeout(() => {
        this.showPlaceholder = true;
      },750);
    } catch (error) {
      console.log(error)
    }

    if (this.$route.query.postalcode) {
      this.selectedPostalCode = this.$route.query.postalcode
      this.handlePostalCode(this.selectedPostalCode)
      this.emitter.emit("selectedPostalCode", this.selectedPostalCode)
    }
  },

  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    }
  )},
  computed: {
    closingTimes() {
      return restaurant => {
        const now = new Date()
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const currentDay = days[now.getDay()]
        const closingTime = restaurant[currentDay] 
        const regex = /^(?!(\d{2}:\d{2} - \d{2}:\d{2})$).*/;
        const isMatch = regex.test(closingTime); 
        if (isMatch) {
          return "Closed" 
        } else { 
          const openingTime = restaurant[currentDay].split(' - ')[0]
          const closingTime = restaurant[currentDay].split(' - ')[1]
          const closing = new Date(now)
          const [openingHours, openingMinutes] = openingTime.split(':')
          const [closingHours, closingMinutes] = closingTime.split(':')
          const opening = new Date(now)
          opening.setHours(openingHours)
          opening.setMinutes(openingMinutes)
          closing.setHours(closingHours)
          closing.setMinutes(closingMinutes)

          if (now < opening || now > closing) {
            return "Closed"
          }

          const timeDiff = closing - now

          if (timeDiff <= 60 * 60 * 1000 && timeDiff > 0) {
            return `Closing in ${Math.floor(timeDiff / 1000 / 60)} minutes`
          } else {
            return " Closing at " + closingTime
          }
        }
      }
    },

    openRestaurants() {
      return this.restaurants.filter(restaurant => this.closingTimes(restaurant) !== 'Closed')
    },

    searchRestaurant() {
      return this.searchRestaurant.filter(restaurant => this.closingTimes(restaurant) !== 'Closed')
    },

  },

  methods: {

    handleLandingPostalCode(value) {
      console.log("in restaurantlisting2,vue")
      console.log(value)
      console.log(" ")
      this.selectedPostalCode = value
      this.emitter.emit("updatePostalCode", this.selectedPostalCode)
      this.handlePostalCode(this.selectedPostalCode)
    },

    handleSearch(value) {
      if (value && value.length > 0 && this.needOriginalSearch) {
        this.searchValue = value
        this.searchOn = true;
        this.showTagline = true;
        this.needOriginalSearch = false
        this.searchRestaurant = this.restaurants.filter(r => {
          const val = value.toLowerCase()
          const restaurantName = r.Name.toString().toLowerCase().split(" ")
          for (let i = 0; i < restaurantName.length; i++) {
            if (restaurantName[i].indexOf(val) !== -1) {
              this.searchOn = true;
              return true;
            }
          }
        })
        return false;      
      } else if (value && value.length > 0) {
        this.searchValue = value
        this.searchOn = true;
        this.showTagline = true;
        this.searchRestaurant = this.searchRestaurant.filter(r => {
          const val = value.toLowerCase()
          const restaurantName = r.Name.toString().toLowerCase().split(" ")
          for (let i = 0; i < restaurantName.length; i++) {
            if (restaurantName[i].indexOf(val) !== -1) {
              this.searchOn = true;
              return true;
            }
          }
        })
        return false; 
      } else {
        this.searchValue = false;
        this.searchOn = false;
        this.showTagline = false;
        this.searchRestaurant = this.restaurants
        this.emitter.emit("clearFilters")
      }
    },

    handleCuisine(value) {
      if (value.length > 0 && this.searchOn) {
        this.needOriginalSearch = true
        this.cuisineFilter = true
        this.selectedCuisineTags = value
      } else if (value.length > 0) {
        this.cuisineFilter = true
        this.selectedCuisineTags = value
      } else if (this.searchOn) {
        this.needOriginalSearch = true
        this.cuisineFilter = false
      } else {
        this.cuisineFilter = false
      }
      this.filtering()
    },

    handlePrice(value) {
      if (value.length > 0 && this.searchOn) {
        this.needOriginalSearch = true
        this.priceFilter = true
        this.selectedPriceTags = value
      } else if (value.length > 0) {
        this.priceFilter = true
        this.selectedPriceTags = value
      } else if (this.searchOn){
        this.needOriginalSearch = true
        this.priceFilter = false
      } else {
        this.priceFilter = false
      }
      this.filtering()
    },

    handlePostalCode(value) {
      if (value && value.length >= 2 && this.searchOn) {
        this.needOriginalSearch = true
        this.postalCodeFilter = true
        this.selectedPostalCode = value
      } else if (value && value.length >= 2) {
        this.postalCodeFilter = true
        this.selectedPostalCode = value
      } else if (this.searchOn) {
        this.needOriginalSearch = true
        this.postalCodeFilter = false
      } else {
        this.postalCodeFilter = false
      }
      this.filtering()
    },

    filtering() {
      if (this.cuisineFilter || this.priceFilter || this.postalCodeFilter) {

        this.showTagline = true;

        if (this.searchOn) {
          this.handleSearch(this.searchValue)
        }

        if (this.cuisineFilter && (this.searchOn) ) {
          this.searchRestaurant = this.searchRestaurant.filter(r => {
            for (let i = 0; i < this.selectedCuisineTags.length; i++) {
              const index = this.selectedCuisineTags[i]
                if (r.Cuisines === this.cuisines[index]) {
                  return true
                }
          }
          return false;
          })
        } else if (this.cuisineFilter) {
          this.searchRestaurant = this.restaurants.filter(r => {
            for (let i = 0; i < this.selectedCuisineTags.length; i++) {
              const index = this.selectedCuisineTags[i]
                if (r.Cuisines === this.cuisines[index]) {
                  return true
                }
          }
          return false;
          })
        }

        if (this.priceFilter && (this.searchOn || this.cuisineFilter)) {
          this.searchRestaurant = this.searchRestaurant.filter(r => {
          for (let i = 0; i < this.selectedPriceTags.length; i++) {
            const index = this.selectedPriceTags[i]
              if (r.Price_Range === this.pricerange[index]) {
                return true
              }
          }
          return false;
          })
        } else if (this.priceFilter) {
          this.searchRestaurant = this.restaurants.filter(r => {
          for (let i = 0; i < this.selectedPriceTags.length; i++) {
            const index = this.selectedPriceTags[i]

              if (r.Price_Range === this.pricerange[index]) {
                return true
              }
          }
          return false;
          })
        }

        if (this.postalCodeFilter && (this.searchOn || this.cuisineFilter || this.priceFilter)) {
          this.searchRestaurant = this.searchRestaurant.filter(r => {
            const restaurantPC = r.Postal_Code.substring(0, 2)
            const searchPC = this.selectedPostalCode.substring(0, 2)
            if (restaurantPC === searchPC) {
              return true;
            } else {
              return false;
            }
          })
        } else if (this.postalCodeFilter) {
            this.searchRestaurant = this.restaurants.filter(r => {
            const restaurantPC = r.Postal_Code.substring(0, 2)
            const searchPC = this.selectedPostalCode.substring(0, 2)
            if (restaurantPC === searchPC) {
              return true;
            } else {
              return false;
            }
          })
        }

      } else {
        if (this.searchValue) {
          this.needOriginalSearch = true;
          this.handleSearch(this.searchValue)
        } else {
          this.searchRestaurant = this.restaurants;
          this.showTagline = false;
        }
      }
    },
  }

}

</script>

<style scoped>
[v-cloak] {
  display: none;
}

.navigation-bar {
  position: relative;
  z-index: 1;
}

a {
    text-decoration: none;
}
.closingTime {
  margin-top:22px;
  float:right;
  position: absolute;
  right: 0;
  margin-right: 10px;
  font-size: 18px;
  color: black;

}

/* .closingTime {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 5px;
    max-width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  } */

.location img[title]:hover::after {
  position: absolute;
  top: -100%;
  left: 0;
}
.restaurant-location {
  display: none;
}

.location:hover .restaurant-location {
  display:block;
}

.description {
  display:flex;
  font-family:Nunito;
}

.location img{
  width: 20px;
  margin-top: 25px;
  /* content: attr(data-location); */
}

.location:hover::before {
  color: green;
  opacity: 0.3;
}

.price {
  margin-top: 20px;
}
.restaurant-name {
  font-size: 22px;
  /* margin-top: -6px; */
  color: black;
  font-family:Nunito;
  margin-left: 5px;
}
.restaurant-img {
  width: 100%;
  height: 200px;
}
.banner {
  text-align: center;
  top: -30px;
  position: relative;
  /* width: 500px; */
}

.banner img {
  height: 250px;
  width: 90%;
}

.cuisine {
  margin-top: 20px;
  text-align: center;
}
.restaurant{
  border: 1px solid #d3cdcd;
  width: 400px;
  height: 300px;
  /* border-radius: 20px; */
  margin: 20px;
  /* box-shadow: 2px 2px grey; */
  box-shadow: 0 3px #d3cdcd;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  padding-left: 5px;
}

.information {
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    margin-left: 600px;
    color: red;
}

.restaurant .img {
  width: 100%;
  height: 120px;
}

.restaurants {
  display:flex;
  flex-wrap: wrap;
  margin-left: 3.5%;
}

.searchtagline {
  position: relative;
  text-align: center;
  margin-top:20px;
  color:rgba(109,93,36,1);  
  font-family:Nunito;
  font-style: italic;
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
  top: 60%;
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
  top: 80%;
  left: 48%;
  transform: translate(-50%, -50%);
  font-family: Nunito; 
  
}


</style>