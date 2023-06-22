import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD8z7SP3m1wDzwehsYDajpyvtMwKsppLBY",
  authDomain: "atv-ux.firebaseapp.com",
  projectId: "atv-ux",
  storageBucket: "atv-ux.appspot.com",
  messagingSenderId: "380707940124",
  appId: "1:380707940124:web:cd370ec0e00ef042acbcd9",
  measurementId: "G-H840WDBQBG"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const database = getDatabase(app);
export const firebaseAuth = getAuth(app);

