<template>
    <div class="container">
      <img id = "backgroundimg" src="@/assets/slashio-photography-1JruuClwZmc-unsplash.jpg" alt = "">

      <div class="pa-6-wrapper">
    
        <v-container>
        <v-card class="pa-6">
          <v-breadcrumbs-item><img id = "backgroundimg1" src="@/assets/foodhuntlogo.png" alt = "">
          </v-breadcrumbs-item>
 
          <h2 class="text-center mb-6" style="font-family:Nunito">Personalisation</h2>

            <v-form ref="form" @submit.prevent = "personalise">

            <!--Imaging-->
            <center>
              <h4 style="font-family:Nunito">Company Profile Image</h4> 
                  <v-img 
                  :src="url"
                  :width="150" 
                  :height="150" 
                  contain class="ma-4"
                  accept="image/png, image/gif, image/jpeg"
                  ></v-img>  
            </center>        

              <!-- Image picker-->
              <div id = 'imagePicker'>
                  <v-file-input 
                  @change="previewImage"
                  prepend-icon="mdi-camera" 
                  v-model="file" 
                  label="Select image"
                  style="font-family:Nunito"
                  :error-messages="formErrors.image"
                  ></v-file-input>
              </div>

            <!-- Address -->
            <v-text-field
              v-model="form.address"
              clearable label="Address"
              required
              :error-messages="formErrors.address"
              style="font-family:Nunito"
            ></v-text-field>

            <!-- Postal Code -->
            <v-text-field
              v-model="form.postalcode"
              label="Postal Code"
              required
              :error-messages="formErrors.postalcode"
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

                    <v-item-group mandatory v-model="selectedCuisines" selected-class="bg-primary">
                        <v-item v-for="cuisine in cuisines"
                            v-slot="{ selectedClass, toggle }">

                            <v-chip :class="selectedClass" @click="toggle" v-text = "cuisine" style="font-family:Nunito; margin-left: 10px; padding: 8px;"></v-chip>
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

                    <v-item-group mandatory v-model="selectedPriceRanges" selected-class="bg-primary">
                        <v-item v-for="pr in priceranges" 
                            v-slot="{ selectedClass, toggle }">

                            <v-chip :class="selectedClass" @click="toggle" v-text = "pr" style="font-family:Nunito; margin-left: 10px; padding: 8px;"></v-chip>
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
                    <v-item-group mandatory v-model="selectedTowns" selected-class="bg-primary">
                        <v-item v-for="town in towns" 
                            v-slot="{ selectedClass, toggle }">

                            <v-chip :class="selectedClass" @click="toggle" v-text = "town" style="font-family:Nunito; margin-left: 10px; padding: 8px;"></v-chip>
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
                                    clearable label="Start - End"
                                    style="font-family:Nunito"
                                    placeholder="07:00 - 23:00"
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
                                    clearable label="Start - End"
                                    style="font-family:Nunito"
                                    placeholder="07:00 - 23:00"
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
                                    clearable label="Start - End"
                                    style="font-family:Nunito"
                                    placeholder="07:00 - 23:00"
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
                                    clearable label="Start - End"
                                    placeholder="07:00 - 23:00"
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
                                    clearable label="Start - End"
                                    placeholder="07:00 - 23:00"
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
                                    clearable label="Start - End"
                                    placeholder="07:00 - 23:00"
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
                                    clearable label="Start - End"
                                    placeholder="07:00 - 23:00"
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
              clearable label="Separate remarks with a comma (,)"
              placeholder="Remark 1, Remark 2, Remark 3"
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

    //Imaging tools
    import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
    const storage = getStorage(firebaseApp)
    
    export default {
      data() {
        return {
          form: {
            image: '',
            address: '',
            postalcode: '',
            time1:'',
            time2:'',
            time3:'',
            time4:'',
            time5:'',
            time6:'',
            time7:'',
            remarks:''
          },

          file: null,
          //if no image selected display this by default
          url: 'https://i.imgur.com/cbERxrb.png',

          cuisines: ['Chinese',  'Indian',  'Malay', 'Café', 'American', 'Thai', 'Taiwanese', 'Dessert', 'Japanese', 'Korean', 'Vietnamese', 'Fast Food', 'Coffee', 'Cakes', 'Ice Cream', 'Hawker', 'Italian', 'Bakery'].sort(),

          priceranges: ['$', '$$', '$$$'],

          towns: ['AMK', 'Orchard','Tampines', 'CBD', 'Tiong Bahru', 'Clementi', 'Bugis', 'Toa Payoh', 'Serangoon', 'Geylang','Bedok', 'Pasir Ris', 'Hougang', 'Sengkang', 'Bishan', 'Jurong', 'CCK', 'Yishun'].sort(),

          selectedCuisines: null,
          selectedPriceRanges: null,
          selectedTowns: null,

          open: ['Cuisines'],

          formErrors: {},
          isLoading: false,
        };
      },
      methods: {
        previewImage() {
          this.url = URL.createObjectURL(this.file[0])
        },

        async personalise() {
          this.formErrors = {};

          if (!this.file) {
            this.formErrors.image = ['Please choose a company profile picture'];
          } 

          if (!this.form.address) {
            this.formErrors.address = ['Please enter an address'];
          } 

          if (!this.form.postalcode) {
            this.formErrors.postalcode = ['Please enter a postal code'];
          }

          if (this.form.postalcode.length != 6) {
            this.formErrors.postalcode = ['Please enter a valid postal code'];
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

                //Other fields
                const curr_email = getAuth().currentUser.email;
                const db = getFirestore();
                const docRef = doc(db, "Users", curr_email);

                const docSnap = await getDoc(docRef)
    
                const Docdata = docSnap.data();
                const vendor_id = Docdata.VendorID;
                const vendor_name = Docdata.Name;
                const vendor_doc_id = (vendor_name + vendor_id.substring(0,5)).replace(/\s+/g, '')

                //Imaging
                //This accesses storage and sets the name for the file, concatenate with vendor_id to make filename unqiue
                const storageRef = ref(storage, `vendorProfilePic/${this.file[0].name + vendor_id}`);
                
                //This uploads to storage and w correct filename and correct storage collection
                await uploadBytes(storageRef, this.file[0]);

                //This gets imageurl that has been uploaded to storage, so we will 
                //write this url to restaurant_personalisation collection lor
                const imageURL = await getDownloadURL(storageRef);

                //console.log(this.file[0].name)
                //console.log(this.file[0][0]) 
                //console.log(imageURL);

                //Change for vendorid/ vendor name
                const docRef2 = doc(db, "restaurant_personalisation", vendor_doc_id)

                //Change reservation status 
                const reserveRef = doc(db, "Users", curr_email);

                await setDoc(docRef2, {
                    Address: this.form.address,
                    Postal_Code: this.form.postalcode,
                    Cuisines: this.cuisines[this.selectedCuisines],
                    Price_Range: this.priceranges[this.selectedPriceRanges],
                    Town: this.towns[this.selectedTowns],
                    Monday: this.form.time1,
                    Tuesday: this.form.time2,
                    Wednesday: this.form.time3,
                    Thursday: this.form.time4,
                    Friday: this.form.time5,
                    Saturday: this.form.time6,
                    Sunday: this.form.time7,  
                    Remarks: this.form.remarks,
                    Name: vendor_name,
                    VendorID: vendor_id,
                    Restaurant_PersonalisationId: vendor_doc_id,
                    ProfileURL: imageURL
                })

                await updateDoc(reserveRef, {
                Restaurant_PersonalisationId: vendor_doc_id
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
        height: 280vh;
        position: absolute;
      }
      #backgroundimg1{
        width:10vw;
      }
      .pa-6-wrapper {
        /* padding:10vh;
        padding-left: 30vw;
        padding-right: 30vw;
        margin-left: 5vh;
        position: absolute;
        top: 140%;
        transform: translateY(-50%) */
        padding:15vh;
        padding-left: 30vw;
        padding-right: 30vw;
      }
    </style>