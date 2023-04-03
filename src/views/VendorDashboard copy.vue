
  
<template>
    <v-container fluid>
        <BreadCrumbs/>
        <v-row>
        <v-col cols="12">
            <!-- Top container -->
            <v-container fluid>
                <img id = "girlImage" src="@/assets/girl.jpg" alt = "">
                <br><h1 id ='heading' style="font-family:Lato"><center>Welcome Back "Vendor Name"!</center></h1><br>
                <v-btn @click = "goCreateListing" id = 'searchbutton' variant="outlined">Create Listing</v-btn>
            </v-container>
        </v-col>
        </v-row>
        <v-row>
        <v-col cols="6">
            <!-- Bottom left container -->
            <v-container fluid>
            <h2>Bottom Left Container</h2>
            </v-container>
        </v-col>
        <v-col cols="6">
            <!-- Bottom right container -->
            <v-container fluid>
            <h2>Bottom Right Container</h2>
            </v-container>
        </v-col>
        </v-row>
    </v-container>
</template>

  
<script>
import BreadCrumbs from '@/components/BreadCrumbs.vue'

export default {
    name: "PartnerUs",
    components:{
        BreadCrumbs
    },
    methods: {
        goCreateListing() {
            this.$router.push('/mainlisting')
        }
    }
}
</script>

<style scoped>
#girlImage{
    width: 100%;
    height: auto;
    opacity: 1;
}

#heading { 
    font-size: 3vw;
}

#box {
    margin-top: 16vh;
    margin-left: 5vw;
    width:625px;
    height:625px;
    padding: 20px;
    background: white;
    position: absolute; 
    border-radius: 25px;
    box-shadow: 6.1px 12.2px 12.2px hsl(0deg 0% 0% / 0.31);
    font-size: smaller;
    top: 30px;
    left: 16px;
    text-align: center;
    letter-spacing: 0.1em;
    line-height: 2;
    opacity: 0.73;
}
</style>