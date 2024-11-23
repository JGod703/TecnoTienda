import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';

import {sendEmailVerification, getAuth, signInWithPopup, 
    createUserWithEmailAndPassword, signInWithEmailAndPassword,  
    onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';

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

login.addEventListener('click', (e) => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password).then(cred => {
        // Guardar correo en localStorage
        localStorage.setItem('userEmail', cred.user.email);

        alert("Usuario logueado");
        window.location.href = "index.html";
    }).catch(error => {
        const errorCode = error.code;
        console.log(errorCode);

        if (errorCode == 'auth/user-disabled')
            alert('El correo ha sido deshabilitado');
        else if (errorCode == 'auth/invalid-email')
            alert("El correo no es válido");
        else if (errorCode == 'auth/user-not-found')
            alert('El usuario no existe');
        else if (errorCode == 'auth/wrong-password')
            alert("Contraseña incorrecta");
        else if (errorCode == 'auth/invalid-login-credentials')
            alert("Credenciales inválidas");
    });
});