import { getFirestore, collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyALhEjYD6FAC3IbGWQRdgqdAgRXFlz42NI",
  authDomain: "pia-front.firebaseapp.com",
  projectId: "pia-front",
  storageBucket: "pia-front.firebasestorage.app",
  messagingSenderId: "880159317357",
  appId: "1:880159317357:web:b5a676104e14079f024e64"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const carrito = JSON.parse(localStorage.getItem('cart') || '[]');
console.log(carrito);
let total = 0;
carrito.forEach(producto => {
  total += producto.price;
});

import { addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js';

function guardarCompra(uid) {
  const comprasRef = collection(db, 'users', uid, 'compras');

  //Crear pedido
  const nuevoPedido = {
    fecha: serverTimestamp(),
    total: total,
    productos: carrito.map(producto => ({ producto_id: producto.id })),
    estado: "pendiente"
  };

  // Guardar pedido 
  addDoc(comprasRef, nuevoPedido)
    .then(() => {
      console.log("Compra guardada correctamente.");
      localStorage.removeItem('cart');
      alert("Gracias por su compra!");
      window.location.href = 'index.html';
    })
    .catch(error => {
      console.error("Error al guardar la compra:", error);
    });
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        guardarCompra(uid);
      } else {
        console.error("No hay un usuario autenticado");
        window.location.href = 'login.html';
      }
    });
  });
  