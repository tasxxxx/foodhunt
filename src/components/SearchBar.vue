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

    <v-menu open-on-hover>
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
  
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
</div>
</template>

<script>
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

        }
    },

    emits: ["search"],

    methods: {
        onChange() {
            this.$emit("search", this.searchText)
        },
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