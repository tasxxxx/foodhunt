<template>
    <h1>Email: {{ email }}</h1>
  </template>
  <script>
  import firebaseApp from "../firebase";
  import { collection, getFirestore } from "firebase/firestore";
  import { doc, setDoc, getDoc } from "firebase/firestore";
  import { getAuth } from "firebase/auth";
  const db = getFirestore(firebaseApp);
  
  export default {
    data() {
      return {
        email: "test",
      };
    },
    async mounted() {
      const user = getAuth().currentUser;
      if (!user) {
        console.log("No user is currently signed in");
        return;
      }
  
      const userID = user.uid;
      console.log("User ID: " + userID);
  
    //   try {
        const docRef = doc(db, "Users", userID);
        const userDocument = await getDoc(docRef);
        console.log(userDocument.data().Email);
        this.email = userDocument.data().Email;
    //   } catch (error) {
    //     console.error("Error retrieving user document:", error);
    //   }
    },
  };
  </script>