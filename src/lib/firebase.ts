import { initializeApp } from "firebase/app" ;   
import { initializeFirestore, persistentLocalCache } from "firebase/firestore" ;   
import { getAuth } from "firebase/auth" ; 



const firebaseConfig = {
  apiKey: "AIzaSyAZjovLbrd7qeKTJg7vKxSinFzBkaA8wis",
  authDomain: "chat-app-20577.firebaseapp.com",
  projectId: "chat-app-20577",
  storageBucket: "chat-app-20577.firebasestorage.app",
  messagingSenderId: "631835234346",
  appId: "1:631835234346:web:b3c312f2bc22d62945f353",
  measurementId: "G-87FCLH4KMT"
};

const app = initializeApp ( firebaseConfig );

// Инициализация сервисов Firebase
const auth = getAuth ( app );
const firestore = initializeFirestore(app, {
  localCache: persistentLocalCache()
});

export { app, auth, firestore };