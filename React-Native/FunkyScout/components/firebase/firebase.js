import * as firebase from "firebase";

class Firebase {

  /**
  * Initialises Firebase
  */
  static initialise() {
    firebase.initializeApp({
      apiKey: "AIzaSyBuU1c53vtVJUNsoNGgBm-2lvQNFpgZDVs",
      authDomain: "funky-scout-326ed.firebaseapp.com",
      databaseURL: "https://funky-scout-326ed.firebaseio.com",
      storageBucket: "funky-scout-326ed.appspot.com"
    });
  }

}

module.exports = Firebase;
