import { initializeApp } from "firebase/app";
import { getApps } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  Timestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdYsyM3ETN0C1w7ka3bn2yCUYMKtD4mqQ",
  authDomain: "devter-97454.firebaseapp.com",
  projectId: "devter-97454",
  storageBucket: "devter-97454.appspot.com",
  messagingSenderId: "141861551361",
  appId: "1:141861551361:web:3bdf347edec0dfaf712f00",
  measurementId: "G-QHN8ZNV14Z",
};
let app;
const apps = getApps();
!apps.length && app == initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore(app);
export const userFromFirebase = (user) => {
  const { photoURL, displayName, email, uid } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};
export const onAuthStateChange = (onChange) => {
  return auth.onAuthStateChanged((user) => {
    const normalizedUser = user ? userFromFirebase(user) : null;
    onChange(normalizedUser);
  });
};

export const gitHubLogin = async () => {
  const githubProvider = new GithubAuthProvider();
  githubProvider.setCustomParameters(firebaseConfig);

  return signInWithPopup(auth, githubProvider);
};

export const addNote = ({ avatar, content, userId, username }) => {
  return addDoc(collection(db, "notes"), {
    avatar,
    content,
    userId,
    username,
    createdAt: Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  });
};

export const fetchLatestNotes = async () => {
  const { docs } = await getDocs(collection(db, "notes"));
  const res = docs.map((doc) => {
    const data = doc.data();
    const id = doc.id;
    const { createdAt } = data;

    return {
      id,
      ...data,
      createdAt: +createdAt.toDate(),
    };
  });
  return res;
};
