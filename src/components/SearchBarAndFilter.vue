<template>
<div class="d-flex">
    <v-text-field
        v-model="searchText"
        label= "Search"
        variant="outlined"
        append-inner-icon="mdi-magnify"
        single-line
        style="font-family:Nunito"
        density="compact"
        class="search"
        @change="onChange"
        @keyup="onChange"
    />

    <v-menu 
    open-on-click
    :close-on-content-click="false"
    location="end"
    >
    <template v-slot:activator="{ props }">
      <v-col class="m-0">
      <v-btn
        color="primary"
        v-bind="props"
        style="font-family:Nunito"
      >
        Filter
      </v-btn>
    </v-col>
    </template>
    <v-card
      class="mx-auto"
      max-width="300"
    >
      <v-toolbar
        flat
        color="primary"
        dark
      >
        <v-toolbar-title style="font-family:Nunito">Tags</v-toolbar-title>
      </v-toolbar>
        <v-card-text>
        <h2 class="text-h6 mb-2">
          Cuisines
        </h2>
        <v-chip-group
          v-model="cuisines"
          column
          multiple
          @clearFilters="handleClearFilters"
        >
          <v-chip
            filter
            variant="outlined"
          >
            American
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            Bakery
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            Café
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            Cakes
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            Chinese
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            Coffee
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            Dessert
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            Fast Food
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            Hawker
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            Ice Cream
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            Indian
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            Italian
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            Japanese
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            Korean
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            Malay
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            Taiwanese
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            Thai
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            Vietnamese
          </v-chip>
        </v-chip-group>
      </v-card-text>
  
      <v-card-text>
        <h2 class="text-h6 mb-2">
          Price range
        </h2>
        <v-chip-group
          v-model="price"
          column
          multiple
        >
          <v-chip
            filter
            variant="outlined"
          >
            $
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            $$
          </v-chip>
          <v-chip
            filter
            variant="outlined"
          >
            $$$
          </v-chip>
        </v-chip-group>
      </v-card-text>

      <v-card-text>
        <h2 class="text-h6 mb-2">
          Postal code
        </h2>
        <v-text-field
          v-model="postalcode"
          variant="underlined"
          type="text"
          @change="postalCodeChange"
          @keyup="postalCodeChange"
          maxlength="6"
          @updatePostalCode="handleUpdatePostalCode"
        ></v-text-field>
      </v-card-text>
    </v-card>
    </v-menu>
</div>
</template>

<script>

export default {
    data() {
      return {
        searchText: '',
        cuisines: [],
        price: [],
        postalcode: '',

        }
    },

    emits: ["search", "filterCuisine", "filterPrice", "filterPostalCode"],

    methods: {
        onChange() {
          this.$emit("search", this.searchText)
        },
        postalCodeChange() {
          this.$emit("filterPostalCode", this.postalcode)
        },

    },

    created() {
      this.emitter.on("clearFilters", () => {
        this.cuisines = []
        this.price = []
        this.postalcode = ''
        console.log("clearFilters event received")
      })

      this.emitter.on("handleUpdatePostalCode", (value) => {
        this.postalcode = value
      })
    },

    watch: {
      cuisines(val) {
        this.$emit("filterCuisine", this.cuisines)
      },

      price(val) {
        this.$emit("filterPrice", this.price)
      }
    }
}

</script>

<style scoped>
.search {
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 30vw;
  /* padding-right: 30vw;
  border-radius: 10px; */
}

.v-btn {
    top: -10px;
}
</style>