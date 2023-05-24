import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArkblE4D3uozRdtrQbm-gtXg4YF1mDfHo",

  authDomain: "todo-49df9.firebaseapp.com",

  projectId: "todo-49df9",

  storageBucket: "todo-49df9.appspot.com",

  messagingSenderId: "196383246279",

  appId: "1:196383246279:web:ddc34384e71c3d79467be2",

  measurementId: "G-2F5KK3L2E4",
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
