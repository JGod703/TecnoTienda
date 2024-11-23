import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';

import {sendEmailVerification, getAuth, signInWithPopup, 
    createUserWithEmailAndPassword, signInWithEmailAndPassword,  
    onAuthStateChanged, sendPasswordResetEmail, fetchSignInMethodsForEmail} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALhEjYD6FAC3IbGWQRdgqdAgRXFlz42NI",
  authDomain: "pia-front.firebaseapp.com",
  projectId: "pia-front",
  storageBucket: "pia-front.firebasestorage.app",
  messagingSenderId: "880159317357",
  appId: "1:880159317357:web:b5a676104e14079f024e64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

recuperar.addEventListener('click', (e) => {
    var email = document.getElementById('email').value;
    console.log(email);
    
    try {
        console.log("Error");
        // Verificar si el correo existe.
        const signInMethods = async function fetchSignInMethodsForEmail(auth, email){
            if (signInMethods.length > 0) {
                resultElement.textContent = "El correo está registrado en Firebase.";
              } else {
                resultElement.textContent = "El correo no está registrado.";
              }
        };
    
      } catch (error) {
        console.error("Error al verificar el correo:", error);
        resultElement.textContent = "Hubo un error al verificar el correo.";
      }

    sendPasswordResetEmail(auth, email).then(() => {
        alert("Correo de restablecimiento enviado");
        window.location.href = 'login.html';
    }).catch((error) => {
        const errorCode = error.code;

        if(errorCode == 'auth/user-not-found')
            alert('Usuario no encontrado');
        else if(errorCode == 'auth/invalid-email')
            alert("El correo no es valido");
    });       
});