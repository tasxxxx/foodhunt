<template>
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
    >
    <template v-slot:append>
        <v-icon>{{ icon }}</v-icon>
        </template>
    </v-text-field>

    <v-menu
        open-on-hover
    >
    </v-menu>
</template>

<script>
export default {
    data() {
        return {
            searchText: '',
            icon: "mdi-filter",

        }
    },

    emits: ["search"],

    methods: {
        onChange() {
            this.$emit("search", this.searchText)
        }
    }
}
</script>

<style scoped>
.search {
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 30vw;
  padding-right: 30vw;
  border-radius: 10px;
}

</style>