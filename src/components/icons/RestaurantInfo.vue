<template>
    <div class="restaurantinfo">
        <img id = "restaurantimg" src="@/assets/mcdonalds.jpg" alt = "">
        <h1 id="restaurantname">Placeholder for Restaurant Name</h1>
        <h4 id="restauranttag">Placeholder for tag</h4>
        <div class="text-right">
          <v-dialog v-model="dialog" width="auto"> 
            <template v-slot:activator="{ props }">
              <v-btn
                color="rgba(109,93,36,1)"
                v-bind="props"
                prepend-icon="mdi-information" 
                variant="tonal"
                style="font-family:Nunito"
              >
              View Info
              </v-btn>
            </template>
            <v-card>
            <v-card-text>
              <h2 class="text-center" style="font-family:Nunito">About </h2>
              <v-table>
                <thead>
                </thead>
                  <tr class="text-left" style="font-family:Mulish"> 
                    Address
                    <td style="font-family:Mulish">Placeholder</td>
                  </tr>
                  <tr class="text-left" style="font-family:Mulish"> 
                    Operating 
                    <br>
                    Hours
                    <td style="font-family:Mulish">Placeholder</td>
                  </tr>
                  <tr class="text-left" style="font-family:Mulish"> 
                    Remarks
                    <td style="font-family:Mulish">Placeholder</td>
                  </tr>
              </v-table>
           </v-card-text>
            <v-card-actions>
            <v-btn color="rgba(109,93,36,1)" block @click="dialog = false">Close</v-btn>
            </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>
<style scoped> 
    #restaurantimg {
        width: 100vw;
        height: 35vh;
    }
    #restaurantname {
      margin-left:5vw;
      font-family:"Nunito";
    }

    #restauranttag {
      margin-left:5vw;
      font-family:"Lato";
    }
    .text-right {
      margin-top:-65px;
      margin-right:50px;
  }
</style>
