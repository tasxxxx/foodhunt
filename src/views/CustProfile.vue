<template>
    <NavigationBar1/>
    <h1>Email: {{ email }}</h1>
</template>

<script>
import firebaseApp from "../firebase";
import { collection, getFirestore } from "firebase/firestore";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, signOut, onAuthStateChanged} from "firebase/auth";
import NavigationBar1 from '@/components/icons/NavigationBar1.vue'
 
const db = getFirestore(firebaseApp);
export default {
  components:{
    NavigationBar1
  },
  data() {
    return {
      email: "",
    };
  },
  async mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user) {
        this.email = auth.currentUser.email; 
      }
    })
  },
  methods: {
    async fetchEmail(userID) {
      try {
        const docRef = doc(db, "Users", userID);
        const userDocument = await getDoc(docRef);
        console.log(userDocument.data().Email);
        this.email = userDocument.data().Email;
      } catch (error) {
        console.error("Error retrieving user document:", error);
      }
    },
    async signOut() {
      await signOut(getAuth());
      this.$router.push('/');
    }
  },
};
</script>