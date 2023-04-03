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
        >
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
            Indian
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
            Café
          </v-chip>
        </v-chip-group>
      </v-card-text>
  
      <v-card-text>
        <h2 class="text-h6 mb-2">
          Price range
        </h2>
  
        <v-chip-group
          v-model="pricerange"
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
    </v-card>


        <!-- <v-card>
          <v-card-title>My Card Title</v-card-title>
          <v-card-text>Some text for the card</v-card-text>
        </v-card> -->
  
        <!-- <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list> -->
      </v-menu>
</div>
</template>

<script>
import { computed } from 'vue'
export default {
    data() {
        return {
            searchText: '',
            items: [
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me 2' },
                ],
            cuisines: [],
            pricerange: [],

        }
    },

    emits: ["search"],

    methods: {
        onChange() {
            this.$emit("search", this.searchText)
        },

    },
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