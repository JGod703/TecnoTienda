// categorías de productos
const apiSmartphonesUrl = 'https://dummyjson.com/products/category/smartphones';
const apiLaptopsUrl = 'https://dummyjson.com/products/category/laptops';
const apiTabletsUrl = 'https://dummyjson.com/products/category/tablets';
const apiMobileAccessoriesUrl = 'https://dummyjson.com/products/category/mobile-accessories';

let combinedProducts = []; // guardar productos

async function fetchAllProducts() {
    try {
        const [smartphonesResponse, laptopsResponse, tabletsResponse, mobileAccessoriesResponse] = await Promise.all([
            fetch(apiSmartphonesUrl),
            fetch(apiLaptopsUrl),
            fetch(apiTabletsUrl),
            fetch(apiMobileAccessoriesUrl)
        ]);

        if (!smartphonesResponse.ok || !laptopsResponse.ok || !tabletsResponse.ok || !mobileAccessoriesResponse.ok) {
            throw new Error('Error al obtener los productos');
        }

        const smartphonesData = await smartphonesResponse.json();
        const laptopsData = await laptopsResponse.json();
        const tabletsData = await tabletsResponse.json();
        const mobileAccessoriesData = await mobileAccessoriesResponse.json();

        combinedProducts = [
            ...smartphonesData.products,
            ...laptopsData.products,
            ...tabletsData.products,
            ...mobileAccessoriesData.products
        ];

        mostrarProductos(combinedProducts);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}

function mostrarProductos(lista) {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // Limpiar contenedor

    lista.forEach(product => {
        // Crear un contenedor para cada producto
        const productElement = document.createElement('div');
        productElement.classList.add('product-card');

        // Insertar datos del producto
        productElement.innerHTML = `
            <a href="product.html?id=${product.id}" class="view-details">
            <div class="status in-stock">${product.availabilityStatus || 'In Stock'}</div>
            <img src="${product.images[0]}" alt="${product.title}" />
            <h3>${product.title}</h3>
            </a>
            <div class="reviews">Valoracion ${product.rating}</div>
            <p class="price">$${product.price}</p>
            <div class="reviews">Quedan: ${product.stock} unidades</div>
        `;
        container.appendChild(productElement);
    });
}

function filtrarProductos() {
    const categoriaSeleccionada = document.getElementById('filter-category').value;
    const rating = document.getElementById('filter-rating').value;
    const ordenPrecio = document.getElementById('filter-price').value;

    let productosFiltrados = [...combinedProducts]; // Copiar productos

    if (categoriaSeleccionada !== 'todos') {
        productosFiltrados = productosFiltrados.filter(producto => producto.category === categoriaSeleccionada);
    }

    if (rating === 'asc') {
        productosFiltrados.sort((a, b) => a.rating - b.rating);
    } else if (rating === 'desc') {
        productosFiltrados.sort((a, b) => b.rating - a.rating);
    }

    if (ordenPrecio === 'asc') {
        productosFiltrados.sort((a, b) => a.price - b.price);
    } else if (ordenPrecio === 'desc') {
        productosFiltrados.sort((a, b) => b.price - a.price);
    }

    mostrarProductos(productosFiltrados);
}

window.onload = fetchAllProducts;
