import { initializeApp } from "firebase/app";
import { getApps } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import e from "express";

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
const storage = getStorage();

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

export const handleLogin = async (provider) => {
  if (provider === "github") {
    const githubProvider = new GithubAuthProvider();
    githubProvider.setCustomParameters(firebaseConfig);

    return signInWithPopup(auth, githubProvider);
  } else if (provider === "google") {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters(firebaseConfig);

    return signInWithPopup(auth, googleProvider);
  }
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

const mapPostFromFirebase = (doc) => {
  const data = doc.data();
  const id = doc.id;
  const { createdAt } = data;

  return {
    id,
    ...data,
    createdAt: +createdAt.toDate(),
  };
};

export const listenLatestPosts = async (callback) => {
  const qry = query(
    collection(db, "notes"),
    orderBy("createdAt", "desc"),
    limit(20)
  );
  return onSnapshot(qry, ({ docs }) => {
    const newPosts = docs.map(mapPostFromFirebase);
    callback(newPosts);
  });
};

export const fetchLatestPosts = async () => {
  const qry = query(collection(db, "notes"), orderBy("createdAt", "desc"));
  const { docs } = await getDocs(qry);
  const res = docs.map(mapPostFromFirebase);
  return res;
};
export const logout = () => {
  auth.logout().catch((e) => console.log(e));
};
