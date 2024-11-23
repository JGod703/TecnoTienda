const firebaseConfig = {
    apiKey: "AIzaSyALhEjYD6FAC3IbGWQRdgqdAgRXFlz42NI",
    authDomain: "pia-front.firebaseapp.com",
    projectId: "pia-front",
    storageBucket: "pia-front.firebasestorage.app",
    messagingSenderId: "880159317357",
    appId: "1:880159317357:web:b5a676104e14079f024e64"
  };

  const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { db, storage, analytics, auth };

console.log("Conexión a Firebase establecida correctamente.");