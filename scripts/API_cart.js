const cart = JSON.parse(localStorage.getItem('cart')) || [];

// agregar producto al carrito
async function addToCart(productId) {
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const product = await response.json();

    const productToCart = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0],
        discount: product.discountPercentage,
        quantity: 1,
    };

    cart.push(productToCart);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Producto "${product.title}" añadido al carrito.`);
    console.log(product);

}

async function buyNow(productId) {
    try {
        // detalles del producto
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!response.ok) {
            throw new Error("Error al obtener el producto");
        }

        const product = await response.json();

        const productToCart = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0],
            discount: product.discountPercentage,
            quantity: 1,
        };

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProduct = cart.find(item => item.id === productToCart.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push(productToCart);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = "cart.html";
    } catch (error) {
        console.error("Error al agregar al carrito:", error);
        alert("Hubo un problema al intentar agregar el producto al carrito.");
    }
}

function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartContainer.innerHTML = '';

    let total = 0;

    cart.forEach((product, index) => {
        total += product.price;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h4>${product.title}</h4>
            <span class="item-price">$${product.price.toFixed(2)}</span>
            <button class="btn btn-danger" onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
}

function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', displayCart);
} else {
    displayCart();
}

