<template>  
    <NavigationBar1/>

    <div>

      <div className="banner">
        <img src="../assets/bg1.png">
      </div>

        <!-- <img id = "restaurantimg" src="@/assets/macdonaldbanner.jpeg" alt = ""> -->
      <div className="text">
        <h2 style="font-family:Nunito; margin-left: 5vw;">Around the island..</h2>
      </div>

      <SearchBar @search="handleSearch"/>

      <!-- <v-breadcrumbs-item :to="{ name: 'restaurant'}">
        <v-icon icon="mdi-shopping"></v-icon>
          My restaurant |
      </v-breadcrumbs-item> -->

    <div class="restaurants">       
      <div v-if="showPlaceholder && openRestaurants.length === 0">
          <h3 class="information">All restaurants are currently closed. Please check back later.</h3>
      </div>
      <div v-else v-for="restaurant in searchRestaurant" :key="restaurant.id" className="restaurant">
        <router-link :to="{ name: 'restaurant', params: { id: restaurant.Restaurant_PersonalisationId }}">
          <div>
            <img src="../assets/macs.jpg" alt="Restaurant Image" className="restaurant-img">
          </div>
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
    <h3 v-if="searchOn" class="searchtagline" >The end... Happy hunting!</h3>
  </div>
</template>
  
  <script> 
import NavigationBar1 from '@/components/icons/NavigationBar1.vue'
import SearchBar from '@/components/icons/SearchBar.vue'
import AddToCart from '@/components/icons/AddToCart.vue';
import firebaseApp from "../firebase";
import { getFirestore } from 'firebase/firestore';
import { getDoc, doc, getDocs, collection} from 'firebase/firestore';
const db = getFirestore(firebaseApp);
  
export default {
  name: "RestaurantListing",
  components:{
    NavigationBar1,
    SearchBar
  },

  data() {
    return {
      restaurants: [],
      searchRestaurant: [],
      searchOn: false,
      showPlaceholder: false // Add a boolean data property
    }
  },

  async mounted() {
    try {
      const querySnapshot = await getDocs(collection(db, "restaurant_personalisation"))
      this.restaurants = querySnapshot.docs.map(doc => doc.data())
      this.searchRestaurant = querySnapshot.docs.map(doc => doc.data())
      console.log(this.restaurants)
      // Set showPlaceholder to true after a delay of 3 seconds
      setTimeout(() => {
        this.showPlaceholder = true;
      },0.003);
    } catch (error) {
      console.log(error)
    }
  },

  computed: {
    
    closingTimes() {
      return restaurant => {
        const now = new Date()
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        const currentDay = days[now.getDay()]
        const closingTime = restaurant[currentDay] 
        const regex = /^(?!(\d{2}:\d{2} - \d{2}:\d{2})$).*/;
        const isMatch = regex.test(closingTime); 
        console.log(closingTime + isMatch)
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

          // const closingTime = restaurant[currentDay].split(' - ')[1]
          // const closing = new Date(now)
          // const [hours, minutes] = closingTime.split(':')
          // closing.setHours(hours)
          // closing.setMinutes(minutes)
          // if (now > closing) {
          //   return "Closed" 
          // }
          // const timeDiff = closing - now
          // if (timeDiff <= 60 * 60 * 1000 && timeDiff > 0) {
          //   return `Closing in ${Math.floor(timeDiff / 1000 / 60)} minutes`
          // } else {
          //   return " Closing at " + closingTime
          //   }
          }
      }
    },
    openRestaurants() {
      return this.restaurants.filter(restaurant => this.closingTimes(restaurant) !== 'Closed')
    },

    searchRestaurant() {
      return this.searchRestaurant.filter(restaurant => this.closingTimes(restaurant) !== 'Closed')
    }
  },
  methods: {
    handleSearch(value) {
      if (value && value.length > 0) {
        this.searchOn = true;
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
      } else {
        this.searchOn = false;
        this.searchRestaurant = this.restaurants
      }
    }
  }

}

</script>

<style scoped>
[v-cloak] {
  display: none;
}

a {
    text-decoration: none;
}
.closingTime {
  margin-top:20px;
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
  font-size: 20px;
  margin-top: -10px;
  color: black;
}
.restaurant-img {
  width: 100%;
  height: 150px;
}
.banner {
  text-align: center;
  /* width: 500px; */
}

.banner img {
  height: 200px;
  width: 90%;
}

.cuisine {
  margin-top: 20px;
  text-align: center;
}
.restaurant{
  border: 1px solid #d3cdcd;
  width: 300px;
  height: 250px;
  /* border-radius: 20px; */
  margin: 20px;
  /* box-shadow: 2px 2px grey; */
  box-shadow: 0 3px #d3cdcd;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
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

#landingimage {
  width: 45%;
  position: absolute;
  left: 0px;
  height: 100%;
}

.rightHalf {
  width: 55%;
  position: absolute;
  right: 0px;
  height: 100%;
}

#foodimage { 
    height: 5.5vh;
    top: 1.9vh;
    left: 3vw;
    background-position: center center;
    background-size: cover;
    opacity: 1;
    position: relative;
}

#lpbreadcrumbs {
    color: rgba(109,93,36,1);
    position: relative;
    height: 0vh;
    top: -2.5vh;
    left: 32vw;
    font-family: Nunito; 
    font-size: 1.1vw;
    text-align: right;
    display: flex;
} 

#tagline {
  width: 500px;
  color: rgba(0,0,0,1);
  position: relative;
  top: 30vh;
  left: 3vw;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0);
  font-family: Lato;
  font-size: 2.67vw;
  opacity: 1;
  text-align: center;
}

.searchtagline {
  text-align: center;
  font-family:Nunito; 
  color: rgb(128,128,128);
}

.text-field-wrapper {
  margin-top: 23.1vh; 
  margin-left: 3vw; 
  margin-right: 30%;
}

#PostalField { 
  height: 7.0%;
  
}

</style>