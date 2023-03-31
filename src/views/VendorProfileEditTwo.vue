<template>
    <div class="container">
      <VendorBreadCrumbs/>
      <div class="pa-6-wrapper">
    
        <v-container>
        <v-card class="pa-6">
 
          <h2 class="text-center mb-6" style="font-family:Nunito">Personalisation</h2>

            <v-form ref="form" @submit.prevent="checkerrors">

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
                        ></v-list-item>
                    </template>

                    <v-item-group mandatory v-model="selectedCuisines" selected-class="bg-grey">
                        <v-item v-for="cuisine in cuisiness" :key="cuisine" :selected="selectedCuisines"
                            v-slot="{ selectedClass, toggle }">

                            <v-chip :class="selectedClass" @click="toggle" v-text = "cuisine" style="font-family:Nunito"></v-chip>
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
                    <v-item-group mandatory v-model="selectedPriceRanges" selected-class="bg-grey">
                        <v-item v-for="pr in pricerange" :key="pr" :selected="selectedPriceRanges"
                            v-slot="{ selectedClass, toggle }">

                            <v-chip :class="selectedClass" @click="toggle" v-text = "pr" style="font-family:Nunito"></v-chip>
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
                    <v-item-group mandatory v-model="selectedTowns" selected-class="bg-grey">
                        <v-item v-for="town in townss" :key="town.type" :selected="selectedTowns"
                            v-slot="{ selectedClass, toggle }">

                            <v-chip :class="selectedClass" @click="toggle" v-text = "town" style="font-family:Nunito"></v-chip>
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
                                    v-model="form.monday"
                                    label="Start - End"
                                    style="font-family:Nunito"
                                    :error-messages="formErrors.monday"
                                ></v-text-field>
                                </v-col>
                            </v-row>
                        
                            <v-row>
                                <v-col cols="4">
                                <v-list-subheader style="font-family:Nunito">Tuesday</v-list-subheader>
                                </v-col>
                        
                                <v-col cols="8">
                                <v-text-field
                                    v-model="form.tuesday"
                                    label="Start - End"
                                    style="font-family:Nunito"
                                    :error-messages="formErrors.tuesday"
                                ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4">
                                <v-list-subheader style="font-family:Nunito">Wednesday</v-list-subheader>
                                </v-col>
                        
                                <v-col cols="8">
                                <v-text-field
                                    v-model="form.wed"
                                    label="Start - End"
                                    style="font-family:Nunito"
                                    :error-messages="formErrors.wed"
                                ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4">
                                <v-list-subheader style="font-family:Nunito">Thursday</v-list-subheader>
                                </v-col>
                        
                                <v-col cols="8">
                                <v-text-field
                                    v-model="form.thurs"
                                    label="Start - End"
                                    style="font-family:Nunito"
                                    :error-messages="formErrors.thurs"
                                ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4">
                                <v-list-subheader style="font-family:Nunito">Friday</v-list-subheader>
                                </v-col>
                        
                                <v-col cols="8">
                                <v-text-field
                                    v-model="form.fri"
                                    label="Start - End"
                                    style="font-family:Nunito"
                                    :error-messages="formErrors.fri"
                                ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4">
                                <v-list-subheader style="font-family:Nunito">Saturday</v-list-subheader>
                                </v-col>
                        
                                <v-col cols="8">
                                <v-text-field
                                    v-model="form.sat"
                                    label="Start - End"
                                    style="font-family:Nunito"
                                    :error-messages="formErrors.sat"
                                ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row>
                                <v-col cols="4">
                                <v-list-subheader style="font-family:Nunito">Sunday</v-list-subheader>
                                </v-col>
                        
                                <v-col cols="8">
                                <v-text-field
                                    v-model="form.sun"
                                    label="Start - End"
                                    style="font-family:Nunito"
                                    :error-messages="formErrors.sun"
                                    required
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
              label=""
              style="font-family:Nunito"
              hint="Separate remarks with a comma (,)"
            ></v-text-field><br>

            <v-divider class="border-opacity-25"></v-divider><br>

            <h2 class="text-center mb-6" style="font-family:Nunito">Confirmation</h2>

            <v-alert
                style="font-family:Nunito"
                type="success"
                title="Success!"
                text="Successfully updated restaurant personalisation"
                v-if="showPISuccess"
                closable
            ></v-alert>

            <v-btn
              type="submit"
              color="primary"
              class="mt-6"
              :loading="isLoading"
              block
              style="font-family:Nunito"
            >Save Changes</v-btn>

          </v-form>

        </v-card>
      </v-container>
    
      </div>
    </div>
    
    </template>
      
    <script>
    import VendorBreadCrumbs from '../components/icons/VendorBreadCrumbs.vue'
    import firebaseApp from "../firebase";
    import { collection, getFirestore, updateDoc } from "firebase/firestore"
    import { doc, setDoc, getDoc } from "firebase/firestore";
    import { getAuth, onAuthStateChanged } from "firebase/auth";
    const db = getFirestore(firebaseApp);
    
    export default {
      data() {
        return {
          form: {
            address: '',
            tags: '',
            monday: '',
            tuesday: '',
            wed: '',
            thurs: '',
            fri: '',
            sat: '',
            sun: '',
            remarks:''
          },

          cuisiness: ['Chinese',  'Indian',  'Malay', 'Café'],
          selectedCuisines: '',

          pricerange: ['$', '$$', '$$$'],
          selectedPriceRanges: '',

          townss: ['AMK', 'Orchard','Tampines'],
          selectedTowns: '',

          open: ['Cuisines'],

          formErrors: {},
          showPISuccess: false,
          isLoading: false,
          vendorDocId: ''
        };
      },
      async mounted() {
        const auth = getAuth()
        onAuthStateChanged(auth, async (user) => {
            if (user) {
            this.user = user

            //get email first
            const curr_email = this.user.email;

            //getting name and vendor id to access restaurant personalisation doc id as per vendorpersonalisation page
            const db = getFirestore();
            const docRef = doc(db, "Users", curr_email);
            const docSnap = await getDoc(docRef)
            const Docdata = docSnap.data();
            const vendor_id = Docdata.VendorID;
            const vendor_name = Docdata.Name;
            const vendor_doc_id = (vendor_name + vendor_id.substring(0,5)).replace(/\s+/g, '')

            //for updating later
            this.vendorDocId = vendor_doc_id

            //access restaurant_personalisation
            const docRef2 = doc(db, "restaurant_personalisation", vendor_doc_id)

            //get all fields
            const userDocument = await getDoc(docRef2);
            if (userDocument.exists()) {
                const userData = userDocument.data();
                this.form.address = userData.Address;
                this.form.monday = userData.Monday;
                this.form.tuesday = userData.Tuesday;
                this.form.wed = userData.Wednesday;
                this.form.thurs = userData.Thursday;
                this.form.fri = userData.Friday;
                this.form.sat = userData.Saturday;
                this.form.sun = userData.Sunday;
                this.form.remarks = userData.Remarks;
                this.selectedCuisines = this.cuisiness.indexOf(userData.Cuisines);
                this.selectedPriceRanges = this.pricerange.indexOf(userData.Price_Range);
                this.selectedTowns = this.townss.indexOf(userData.Town);
            } else {
                console.log("User document not found");
            }
            }
        })
      },
      components:{
        VendorBreadCrumbs
      },
      methods: {
        async checkerrors() {
            this.formErrors = {};
            if (!this.form.address) {
                this.formErrors.address = ['Please enter an address'];
            } 

            if (!this.form.monday) {
                this.formErrors.monday = ['Operating hours required'];
            }

            if (!this.form.tuesday) {
                this.formErrors.tuesday = ['Operating hours required'];
            }

            if (!this.form.wed) {
                this.formErrors.wed = ['Operating hours required'];
            }

            if (!this.form.thurs) {
                this.formErrors.thurs = ['Operating hours required'];
            }

            if (!this.form.fri) {
                this.formErrors.fri = ['Operating hours required'];
            }

            if (!this.form.sat) {
                this.formErrors.sat = ['Operating hours required'];
            }

            if (!this.form.sun) {
                this.formErrors.sun = ['Operating hours required'];
            }
            if (Object.keys(this.formErrors).length === 0) {
                await this.updatePerson()
            }
        },
        async updatePerson() {
            const auth = getAuth();
            onAuthStateChanged(auth, user => {
            if (user) {
                console.log(this.vendorDocId)
                const docRef = doc(db, "restaurant_personalisation", this.vendorDocId)
                updateDoc(docRef, {
                Address: this.form.address,
                Monday: this.form.monday,
                Tuesday: this.form.tuesday,
                Wednesday: this.form.wed,
                Thursday: this.form.thurs,
                Friday: this.form.fri,
                Saturday: this.form.sat,
                Sunday: this.form.sun,
                Remarks: this.form.remarks,
                Cuisines: this.cuisiness[this.selectedCuisines],
                Price_Range: this.pricerange[this.selectedPriceRanges],
                Town: this.townss[this.selectedTowns],
                }).then(docRef =>
                    this.showPISuccess = "true"
                )
            } else {
                console.log('error');
            }
            });
        },

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