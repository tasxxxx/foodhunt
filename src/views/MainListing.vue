<template>
    <!-- <router-view/> -->
    <NavigationBar1/>
<div class = "main">

        <add-to-cart></add-to-cart>
      
  <v-container>
    <router-link to="/test"><button>Go to test page</button></router-link>
    <br><br>
    <router-link to="/test2"><button>Go to ratings card page</button></router-link>
    <br><br>
    <router-link to="/custprofile"><button>Go to CUSTOMER PROFILE page</button></router-link>
    <br><br>
    <router-link to="/restaurantlisting"><button>restaurant listings</button></router-link>

    <!-- <input type="checkbox" id="checkbox1" name="checkbox1" value="option1">
    <label for="checkbox1">Option 1</label> -->
    <v-alert
      closable
      icon="mdi-vuetify"
      title="Alert title"
      text="Lopes test"
      type="warning"
    ></v-alert>
    <v-badge>
      <v-icon icon="mdi-home" size="x-large"></v-icon>
    </v-badge>

    <v-carousel show-arrows="hover">
      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        cover
      ></v-carousel-item>
    </v-carousel>



    <div class="text-center">
      <v-chip
        v-if="chip"
        class="ma-2"
        closable
        @click:close="chip = false"
      >
        Closable
      </v-chip>

      <v-btn
        v-if="!chip"
        close
        color="primary"
        dark
        @click="chip = true"
      >
        Reset Chip
      </v-btn>
    </div>

    <v-divider></v-divider>

    <v-color-picker></v-color-picker>

    <v-expansion-panels>
      <v-expansion-panel
        title="Title"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
      >
      </v-expansion-panel>
    </v-expansion-panels>
    <v-autocomplete
      label="Autocomplete"
      density="default"
      :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
    ></v-autocomplete>

    <v-switch label="Switch"></v-switch>

    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-card
          v-bind="props"
          :color="isHovering ? 'primary' : undefined"
          title="Hover over me"
          text="..."
        ></v-card>
      </template>
    </v-hover>
  </v-container>
</div>
</template>

<script>
import NavigationBar1 from '@/components/icons/NavigationBar1.vue'
import AddToCart from '@/components/icons/AddToCart.vue';

export default {
  name: "MainListing",
  components:{
    NavigationBar1,
    AddToCart
  },
  data() {
    return {
      chip: true,
      
    }
  }
}
</script>

<style scoped>
.main {
    margin-top: 0%;
    margin-left: 5vw;
}
</style>
