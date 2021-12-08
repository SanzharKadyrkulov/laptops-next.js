import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyACRG66FTmhmmTi5UkRiSfcBe3bXMV08ek",
  authDomain: "laptops-6ac3b.firebaseapp.com",
  projectId: "laptops-6ac3b",
  storageBucket: "laptops-6ac3b.appspot.com",
  messagingSenderId: "354029873138",
  appId: "1:354029873138:web:5b87b5cdba6013966f6d6b",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
