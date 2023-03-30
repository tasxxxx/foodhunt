<template>
    <div class="container">
      <!-- This looks super weird atm with the background image so let's just comment this out first :)-->
      <!-- <img id = "backgroundimg" src="@/assets/loginbg.jpg" alt = ""> -->

      <div class="pa-6-wrapper">
    
        <v-container>
        <v-card class="pa-6">
          <v-breadcrumbs-item><img id = "backgroundimg1" src="@/assets/foodhuntlogo.png" alt = "">
          </v-breadcrumbs-item>
 
          <h2 class="text-center mb-6" style="font-family:Nunito">Personalisation</h2>

            <v-form ref="form" @submit.prevent = "personalise">

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
                        style="font-family:Nunito"
                        required
                        ></v-list-item>
                    </template>

                    <v-item-group mandatory v-model="selectedCuisines" selected-class="bg-grey">
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
                        required
                        ></v-list-item>
                    </template>

                    <v-item-group mandatory v-model="selectedPriceRanges" selected-class="bg-grey">
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
                        required
                        ></v-list-item>
                    </template>
                    <v-item-group mandatory v-model="selectedTowns" selected-class="bg-grey">
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
                                    :error-messages="formErrors.time1"
                                    required
                                    v-model="form.time1"
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
                                    :error-messages="formErrors.time2"
                                    required
                                    v-model="form.time2"
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
                                    :error-messages="formErrors.time3"
                                    required
                                    v-model="form.time3"
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
                                    :error-messages="formErrors.time4"
                                    required
                                    v-model="form.time4"
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
                                    :error-messages="formErrors.time5"
                                    required
                                    v-model="form.time5"
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
                                    :error-messages="formErrors.time6"
                                    required
                                    v-model="form.time6"
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
                                    :error-messages="formErrors.time7"
                                    required
                                    v-model="form.time7"
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
              v-model="form.remarks"
              label="Separate remarks with a comma (,)"
              required
              style="font-family:Nunito"
            ></v-text-field>

            <!-- Register as vendor button FOR NOW GO TO VENDOR DASHBOARD PAGE-->
            <v-btn
              type="submit"
              color="primary"
              block
              style="font-family:Nunito"
            >Complete Profile</v-btn>

          </v-form>

        </v-card>
      </v-container>
    
      </div>
    </div>
    
    </template>
      
    <script>
    import firebaseApp from "../firebase";
    import { getDoc, getFirestore, setDoc } from "firebase/firestore";
    import { doc, updateDoc} from "firebase/firestore";
    import firebase from 'firebase/compat/app';
    import 'firebase/compat/auth';
    import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "@firebase/auth";
    const db = getFirestore(firebaseApp); 
    
    export default {
      data() {
        return {
          form: {
            address: '',
            time1:'',
            time2:'',
            time3:'',
            time4:'',
            time5:'',
            time6:'',
            time7:'',
            remarks:''
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

          selectedCuisines: null,
          selectedPriceRanges: null,
          selectedTowns: null,

          open: ['Cuisines'],

          formErrors: {},
          isLoading: false,
        };
      },
      methods: {


        async personalise() {
          this.formErrors = {};

          if (!this.form.address) {
            this.formErrors.address = ['Please enter an address'];
          } 

          if (!this.form.time1) {
            this.formErrors.time1 = ['Operating hours required'];
          }

          if (!this.form.time2) {
            this.formErrors.time2 = ['Operating hours required'];
          }

          if (!this.form.time3) {
            this.formErrors.time3 = ['Operating hours required'];
          }

          if (!this.form.time4) {
            this.formErrors.time4 = ['Operating hours required'];
          }

          if (!this.form.time5) {
            this.formErrors.time5 = ['Operating hours required'];
          }

          if (!this.form.time6) {
            this.formErrors.time6 = ['Operating hours required'];
          }

          if (!this.form.time7) {
            this.formErrors.time7 = ['Operating hours required'];
          }

          // Submit form if no errors
          if (Object.keys(this.formErrors).length === 0) {
            try {
                // console.log('Form submitted:', this.form);
                // const curr_email = getAuth().currentUser.email;


                // const db = getFirestore();
                // const docRef = doc(db, "Users", curr_email);

                // await updateDoc(docRef, {
                //     Address: this.form.address,
                //     Cuisines: this.selectedCuisines,
                //     Price_Range: this.selectedPriceRanges,
                //     Town: this.selectedTowns,
                //     Monday: this.form.time1,
                //     Tuesday: this.form.time2,
                //     Wednesday: this.form.time3,
                //     Thursday: this.form.time4,
                //     Friday: this.form.time5,
                //     Saturday: this.form.time6,
                //     Sunday: this.form.time7,  
                //     Remarks: this.form.remarks            
                // });
                // this.$router.push('/vendor-dashboard')

                const curr_email = getAuth().currentUser.email;
                const db = getFirestore();
                const docRef = doc(db, "Users", curr_email);

                const docSnap = await getDoc(docRef)
    
                const Docdata = docSnap.data();
                const vendor_id = Docdata.VendorID;
                const vendor_name = Docdata.Name;
                const vendor_doc_id = (vendor_name + vendor_id.substring(0,5)).replace(/\s+/g, '')

                //Change for vendorid/ vendor name
                const docRef2 = doc(db, "restaurant_personalisation", vendor_doc_id)
                
                await setDoc(docRef2, {
                    Address: this.form.address,
                    Cuisines: this.cuisiness[this.selectedCuisines],
                    Price_Range: this.pricerange[this.selectedPriceRanges],
                    Town: this.townss[this.selectedTowns],
                    Monday: this.form.time1,
                    Tuesday: this.form.time2,
                    Wednesday: this.form.time3,
                    Thursday: this.form.time4,
                    Friday: this.form.time5,
                    Saturday: this.form.time6,
                    Sunday: this.form.time7,  
                    Remarks: this.form.remarks,
                    Name: vendor_name
                })
                this.$router.push('/vendor-dashboard')
            } catch(error) {
              console.log(error.message);
            }
          }
        },
        handleClick() {
          // do something when clicked
        }
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