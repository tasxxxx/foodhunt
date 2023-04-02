<template>
    <v-text-field
        v-model="searchText"
        label= "Search"
        variant="outlined"
        append-inner-icon="mdi-magnify"
<<<<<<< Updated upstream
=======
        append-icon="mdi-filter"
        @click:append="openMenu = true"
>>>>>>> Stashed changes
        single-line
        style="font-family:Nunito"
        density="compact"
        class="search"
        @change="onChange"
<<<<<<< Updated upstream
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
=======
        @keyup="onChange">
    >

    <v-menu v-model="openMenu" offset-y>
        <v-list>
            <v-list-item v-for="item in items" :key="item.id" @click="selectItem(item)">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
      </v-list>
    </v-menu>


        <!-- <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
        <template v-slot:append>
            <v-icon class="filterIcon" v-bind="props">{{ icon }}</v-icon>
        </template> -->
    </v-text-field>

>>>>>>> Stashed changes
</template>

<script>
export default {
    data() {
        return {
            searchText: '',
            icon: "mdi-filter",
<<<<<<< Updated upstream
=======
            openMenu: false,
            items: [
                { id: 1, title: 'Item 1' },
                { id: 2, title: 'Item 2' },
                { id: 3, title: 'Item 3' }
            ],
>>>>>>> Stashed changes

        }
    },

    emits: ["search"],

    methods: {
        onChange() {
            this.$emit("search", this.searchText)
<<<<<<< Updated upstream
        }
=======
        },

        selectItem(item) {
            this.text = item.title;
            this.showMenu = false;
        },
>>>>>>> Stashed changes
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