<template>
    <div class="container">
      <!-- This looks super weird atm with the background image so let's just comment this out first :)-->
      <!-- <img id = "backgroundimg" src="@/assets/loginbg.jpg" alt = ""> -->

      <div class="pa-6-wrapper">
    
        <v-container>
        <v-card class="pa-6">
          <v-breadcrumbs-item :to="{ name: 'landing'}"><img id = "backgroundimg1" src="@/assets/foodhuntlogo.png" alt = "">
          </v-breadcrumbs-item>
 
          <h2 class="text-center mb-6" style="font-family:Nunito">Personalisation</h2>

            <v-form ref="form">

            <!-- Address -->
            <v-text-field
              v-model="form.address"
              label="Address"
              required
              :error-messages="formErrors.address"
              style="font-family:Nunito"
            ></v-text-field>

            <!-- Tags -->
            
            <v-card class="mx-auto" width="500">
                <v-list v-model:opened="open">
                    <v-list-item title="Tags" style="font-family:Nunito"></v-list-item>
            
                <v-list-group value="Cuisines">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                        v-bind="props"
                        title="Cuisines"
                        style="font-family:'Nunito"
                        ></v-list-item>
                    </template>

                    <v-item-group multiple selected-class="bg-grey">
                        <v-item v-for="cuisine in cuisiness" :key="cuisine.type"
                            v-slot="{ selectedClass, toggle }">

                            <v-chip :class="selectedClass" @click="toggle" v-text = "cuisine.type" style="font-family:Nunito"></v-chip>
                        </v-item>
                    </v-item-group>
                </v-list-group>
                
                <v-list-group value="Price Range">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                        v-bind="props"
                        title="Price Range"
                        style="font-family:Nunito"
                        ></v-list-item>
                    </template>
                    <v-item-group multiple selected-class="bg-grey">
                        <v-item v-for="pr in pricerange" :key="pr.type"
                            v-slot="{ selectedClass, toggle }">

                            <v-chip :class="selectedClass" @click="toggle" v-text = "pr.type" style="font-family:Nunito"></v-chip>
                        </v-item>
                    </v-item-group>
                </v-list-group>

                <v-list-group value="Town">
                    <template v-slot:activator="{ props }">
                        <v-list-item
                        v-bind="props"
                        title="Town"
                        style="font-family:Nunito"
                        ></v-list-item>
                    </template>
                    <v-item-group multiple selected-class="bg-grey">
                        <v-item v-for="town in townss" :key="town.type"
                            v-slot="{ selectedClass, toggle }">

                            <v-chip :class="selectedClass" @click="toggle" v-text = "town.type" style="font-family:Nunito"></v-chip>
                        </v-item>
                    </v-item-group>
                </v-list-group>
                </v-list>
            </v-card><br>

            <!-- Operating hours -->
            <center>
                <v-card class="max-auto" width="500">
                    <v-list v-model:opened="open">
                        <v-list-item title="Operating Hours" style="font-family:Nunito"></v-list-item>
                
                        <v-container fluid>
                            <v-row>
                                <v-col cols="4">
                                <v-list-subheader style="font-family:Nunito">Monday</v-list-subheader>
                                </v-col>
                        
                                <v-col cols="8">
                                <v-text-field
                                    label="Start - End"
                                    style="font-family:Nunito"
                                ></v-text-field>
                                </v-col>
                            </v-row>
                        
                            <v-row>
                                <v-col cols="4">
                                <v-list-subheader style="font-family:Nunito">Tuesday</v-list-subheader>
                                </v-col>
                        
                                <v-col cols="8">
                                <v-text-field
                                    label="Start - End"
                                    style="font-family:Nunito"
                                ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4">
                                <v-list-subheader style="font-family:Nunito">Wednesday</v-list-subheader>
                                </v-col>
                        
                                <v-col cols="8">
                                <v-text-field
                                    label="Start - End"
                                    style="font-family:Nunito"
                                ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4">
                                <v-list-subheader style="font-family:Nunito">Thursday</v-list-subheader>
                                </v-col>
                        
                                <v-col cols="8">
                                <v-text-field
                                    label="Start - End"
                                    style="font-family:Nunito"
                                ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4">
                                <v-list-subheader style="font-family:Nunito">Friday</v-list-subheader>
                                </v-col>
                        
                                <v-col cols="8">
                                <v-text-field
                                    label="Start - End"
                                    style="font-family:Nunito"
                                ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4">
                                <v-list-subheader style="font-family:Nunito">Saturday</v-list-subheader>
                                </v-col>
                        
                                <v-col cols="8">
                                <v-text-field
                                    label="Start - End"
                                    style="font-family:Nunito"
                                ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4">
                                <v-list-subheader style="font-family:Nunito">Sunday</v-list-subheader>
                                </v-col>
                        
                                <v-col cols="8">
                                <v-text-field
                                    label="Start - End"
                                    style="font-family:Nunito"
                                ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-list>
                </v-card>
            </center><br>

            <!-- Remarks -->
            <v-list-item title="Remarks" style="font-family:Nunito"></v-list-item>
            <v-text-field
              v-model="form.address"
              label=""
              required
              :error-messages="formErrors.address"
              style="font-family:Nunito"
            ></v-text-field>

            <!-- Register as vendor button -->
            <v-btn
              type="submit"
              color="primary"
              class="mt-6"
              :loading="isLoading"
              block
              style="font-family:Nunito"
            >Register</v-btn>

          </v-form>

        </v-card>
      </v-container>
    
      </div>
    </div>
    
    </template>
      
    <script>
    import firebaseApp from "../firebase";
    //import firebase from 'firebase/compat/app';
    //import { firebase } from 'firebase/app';
    
    export default {
      data() {
        return {
          form: {
            address: '',
            tags: ''
          },

          cuisiness: [
            {
                type: 'Chinese'
            },
            {
                type: 'Indian'
            },
            {
                type: 'Malay'
            },
            {
                type: 'Café'
            }
          ],

          pricerange: [
            {
                type: '$'
            },
            {
                type: '$$'
            },
            {
                type: '$$$'
            }
          ],
          townss: [
            {
                type: 'AMK'
            },
            {
                type: 'Orchard'
            },
            {
                type: 'Tampines'
            }
          ],

          open: ['Cuisines'],

          formErrors: {},
          isLoading: false,
        };
      },
      methods: {

      },
    };
    </script>
    
    <style scoped>
      #backgroundimg {
        width: 100vw;
        height: 130vh;
        position: absolute;
        opacity: 0.5;
      }
    
      #backgroundimg1{
        width:10vw;
      }
      .pa-6-wrapper {
        padding:15vh;
        padding-left: 30vw;
        padding-right: 30vw;
      }
    
    </style>