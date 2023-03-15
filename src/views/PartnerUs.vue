<template>
    <!-- <router-view/> -->
    <BreadCrumbs/>
    <div class="container">
        <img id = "girlImage" src="@/assets/girl.jpg" alt = "">
    </div>
    <div id = 'box'>
            <br><h1 id ='heading' style="font-family:Lato"><center>Partner with us!</center></h1><br>
            <div id ='bs' style="font-family:Nunito">
                food hunt is a platform for Singaporeans to satisfy their late night food cravings at a reasonable cost. 
                With sustainability and reducing food wastage as our primary goals, we hope to create a community for food 
                vendors to list their unsold food items for the day on our website, and for hungry Singaporeans to still be exposed to some of the most popular food choices! 
                From fast food to fine dining, food hunt aims to be the go-to for Singaporeans whenever they feel hungry at night. food hunt’s “no-vehicle and pickup only” 
                policy also pushes for an environmentally friendly solution to an everyday problem. 
                So what are you waiting for? Join us by clicking the button below and let us build a food hunting ecosystem like no other! Happy hunting!
            </div><br><br>
            <center><v-btn id = 'searchbutton' variant="outlined">Register as a vendor!</v-btn></center>
        </div>
</template>
  
<script>
import BreadCrumbs from '@/components/icons/BreadCrumbs.vue'

export default {
name: "PartnerUs",
components:{
    BreadCrumbs
}
}
</script>

<style scoped>
#girlImage{
    margin-top: 11.5vh;
    width: 100vw;
    height: 89vh;
    position: absolute;
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