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

registro.addEventListener('click', (e) => {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    console.log(email,password);

    createUserWithEmailAndPassword(auth, email, password).then(cred => {
        alert("Usuario creado");
        sendEmailVerification(auth.currentUser).then(() => {
            alert('Se ha enviado un correo de verificacion');
            window.location.href = 'login.html';
        });
    }).catch(error => {
        const errorCode = error.code;

        if(errorCode == 'auth/email-already-in-use')
            alert('El correo ya esta en uso');
        else if(errorCode == 'auth/invalid-email')
            alert("El correo no es valido");
        else if(errorCode == 'auth/weak-password')
            alert('La contrasena debe tener al menos 6 caracteres');
    });
});