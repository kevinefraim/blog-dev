var admin = require("firebase-admin");

var serviceAccount = require("./firebase-keys.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://devter97454.firebaseio.com",
  });
} catch (error) {}

export const firestore = admin.firestore();
