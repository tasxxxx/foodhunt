<template>
  <v-card
    class="mx-auto"
    color="purple"
    elevation="20"
    max-width="400"
  >
    <div class="d-flex justify-between">
      <v-card-title class="flex-grow-1 flex-column align-start">
        <div class="text-h5">
          Halycon Days
        </div>
        <div class="text-h6 font-weight-thin">Ellie Goulding</div>

        <div class="text-h6 font-weight-thin">(2013)</div>
      </v-card-title>

      <v-img
        contain
        height="125px"
        src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
        style="flex-basis: 125px"
        class="flex-grow-0"
      ></v-img>
    </div>

    <v-divider></v-divider>

    <v-card-actions class="pa-4">
      Rate this album

      <v-spacer></v-spacer>

      <span class="text-grey-lighten-2 text-caption me-2">
        ({{ rating }})
      </span>

      <v-rating
        v-model="rating"
        color="white"
        active-color="yellow-accent-4"
        half-increments
        hover
        size="18"
      ></v-rating>
    </v-card-actions>
  </v-card>

  <v-card>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="center"
    >
      <v-tab :value="1">Landscape</v-tab>
      <v-tab :value="2">City</v-tab>
      <v-tab :value="3">Abstract</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
        v-for="n in 3"
        :key="n"
        :value="n"
      >
        <v-container fluid>
          <v-row>
            <v-col
              v-for="i in 6"
              :key="i"
              cols="12"
              md="4"
            >
              <v-img
                :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                aspect-ratio="1"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>


<script>
export default {
    data() { 
      return {
        rating: 4.5,
        tab: null, 
      }
    }
}
</script>