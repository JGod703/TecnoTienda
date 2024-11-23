import {
  getFirestore,
  collection,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyALhEjYD6FAC3IbGWQRdgqdAgRXFlz42NI",
  authDomain: "pia-front.firebaseapp.com",
  projectId: "pia-front",
  storageBucket: "pia-front.firebasestorage.app",
  messagingSenderId: "880159317357",
  appId: "1:880159317357:web:b5a676104e14079f024e64",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const apiURL = "https://dummyjson.com/products/";

// Función para mostrar los pedidos del usuario
async function mostrarPedidos(uid) {
  const pedidosRef = collection(db, "users", uid, "compras");
  const q = query(pedidosRef);

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(async (doc) => {
    const pedido = doc.data();
    const fecha = pedido.fecha.toDate().toLocaleDateString();
    const total = pedido.total;
    const estado = pedido.estado;
    const productos = pedido.productos;

    const pedidoHTML = `
      <div class="pedido">
        <p>Pedido #${doc.id}</p>
        <p>Fecha: ${fecha}</p>
        <div class="productos">
          ${await obtenerProductosDetalles(productos)}
        </div>
        <p>Estado: ${estado}</p>
        <p>Total: $${total}</p>
      </div>
    `;
    document.getElementById("orders-container").innerHTML += pedidoHTML;
  });
}

// Función para obtener los productos desde la API
async function obtenerProductosDetalles(productos) {
  let productosHTML = "";

  for (let producto of productos) {
    const productId = producto.producto_id;

    try {
      const response = await fetch(`${apiURL}${productId}`);
      const data = await response.json();
      //console.log(data);

      // detalles del producto
      const { title, price, images } = data;

      productosHTML += `
        <div class="producto">
          <img src="${images[0]}" alt="${name}" />
          <p><strong>${title}</strong></p>
          <p>Precio: $${price}</p>
        </div>
      `;
    } catch (error) {
      console.error("Error al obtener los detalles del producto:", error);
    }
  }

  return productosHTML;
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    const userEmail = user.email;
    if (!userEmail) {
      console.error("El usuario no tiene un email válido");
      return;
    }
    console.log("Usuario autenticado:", userEmail);
    document.getElementById("account-email").textContent = userEmail;
    console.log(user.uid);

    // Mostrar los pedidos del usuario
    mostrarPedidos(user.uid);
  } else {
    console.error("No hay un usuario autenticado");
    window.location.href = "../login.html";
  }
});

document.getElementById("Cerrar").addEventListener("click", () => {
  auth
    .signOut()
    .then(() => {
      alert("Sesion cerrada");
    })
    .catch((error) => {
      alert("Error al cerrar sesion");
    });
});
