<template>
    <NavigationBar1/>
    <div className="banner">
      <img src="../assets/banner1.jpg">
    </div>
    <div className="text">
      Around the island.. 
    </div>
    <v-breadcrumbs-item :to="{ name: 'restaurant'}">
          <v-icon icon="mdi-shopping"></v-icon>
            My restaurant |
        </v-breadcrumbs-item>
        
    <div className="restaurants">
      <div v-for="f in restaurants" :key="f" className="restaurant" :data-location="f.location">
       
          
          <!-- <img src="../assets/banner.jpg"> -->
          <div>
            <img :src="f.img" alt="Restaurant Image" className="restaurant-img">

          </div>
          
          <!-- {{ f.id }} -->
          <div className="restaurant-name">
            {{ f.name }}
          </div>
          <div className="description">
            <div className="cuisine"> 
              <v-chip color="rgba(109,93,36,1)"> {{ f.cuisine }} </v-chip>
            </div>
            <div className="price">
              <v-chip color="rgba(109,93,36,1)"> {{ f.price }} </v-chip>
            </div>
            <div className="location">
              <!-- <div class="restaurant-location">{{ f.location }}</div> -->
              <img src="../assets/location.png" :title="f.location">
              
            </div>
            <div className="closingTime">
              {{ closingTime(f) }}
            </div>
          </div>
          

        
          
        
      </div>
    </div>
    
    
  
  </template>
  
  <script>
  import NavigationBar1 from '@/components/icons/NavigationBar1.vue'
  // import Restaurant from '@/components/icons/Restaurant.vue'
  import image from "../assets/macs.jpg"
  import subway from "../assets/subway.png"
  import location from "../assets/location.png"
  export default {
    name: "RestaurantListing",
    components:{
    NavigationBar1
  },
  data() {
    return {
      restaurants: [
        {id: 1, name: "macs", cuisine:"western", price: "$", img: image, location: "blk 123 paya lebar road", closingTime: "22:00"},
        {id: 2, name: "kfc", cuisine:"western", price: "$$", img: image, location: "blk 123 bishan street", closingTime: "23:00"},
        {id: 3, name: "subway", cuisine:"western", price: "$", img: subway, location: "blk 123 serangoon road (s)123123", closingTime: "21:00"},
        {id: 4, name: "subways", cuisine:"western", price: "$", img: image, location: "paya lebar", closingTime: "21:30"},
      ]
    }
  },
  computed: {
    closingTime() {
      return restaurant => {
        const now = new Date()
        const closing = new Date(now)
        const [hours, minutes] = restaurant.closingTime.split(':')
        closing.setHours(hours)
        closing.setMinutes(minutes)
        if (now > closing) {
          return "Closed" 
        }
        const timeDiff = closing - now
        if (timeDiff <= 60 * 60 * 1000 && timeDiff > 0) {
          return `Closing in ${Math.floor(timeDiff / 1000 / 60)} minutes`
        } else {
          return " Closing at " + restaurant.closingTime
        }
      }
    }
  }
  }
  </script>
  
<style scoped>
.closingTime {
  margin-top:20px;
  float:right;
  position: absolute;
  right: 0;
  margin-right: 10px;

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

.restaurant .img {
  width: 100%;
  height: 120px;
}

.restaurants {
  display:flex;
  flex-wrap: wrap;
  margin: 50px;
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

#searchbutton {
  border-radius: 10px;
  top: 30vh;
  left: 39vw;
  height: 7.0%;
  font-size: 1.0vw;
  position: relative;
  color: black;
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