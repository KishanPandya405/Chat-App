// Import Firebase functions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANBmUgHLfYLHl0uXtnlaA-_hCGy1yZbzg",
  authDomain: "chat-app-react-c9aeb.firebaseapp.com",
  databaseURL: "https://chat-app-react-c9aeb-default-rtdb.firebaseio.com",
  projectId: "chat-app-react-c9aeb",
  storageBucket: "chat-app-react-c9aeb.appspot.com",
  messagingSenderId: "441346105299",
  appId: "1:441346105299:web:677979acdc37bae0ba5926",
  measurementId: "G-FEN6PRM135"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
