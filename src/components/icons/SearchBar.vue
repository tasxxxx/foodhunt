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
    ></v-text-field>
</template>

<script>
export default {
    data() {
        searchText: ''
    },

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
  padding-left:30vw;
  padding-right: 30vw;
}
</style>