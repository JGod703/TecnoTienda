const apiSmartphonesUrl = 'https://dummyjson.com/products/category/smartphones';
const apiLaptopsUrl = 'https://dummyjson.com/products/category/laptops';
const apiTabletsUrl = 'https://dummyjson.com/products/category/tablets';
const apiMobileAccessoriesUrl = 'https://dummyjson.com/products/category/mobile-accessories';

// Función para obtener productos
async function fetchLatestProducts() {
    try {
        // solicitudes a las cuatro categorías
        const [smartphonesResponse, laptopsResponse, tabletsResponse, mobileAccessoriesResponse] = await Promise.all([
            fetch(apiSmartphonesUrl),
            fetch(apiLaptopsUrl),
            fetch(apiTabletsUrl),
            fetch(apiMobileAccessoriesUrl)
        ]);

        // Verificar respuestas válidas
        if (!smartphonesResponse.ok || !laptopsResponse.ok || !tabletsResponse.ok || !mobileAccessoriesResponse.ok) {
            throw new Error('Error al obtener los productos');
        }

        // Convertir respuestas a JSON
        const smartphonesData = await smartphonesResponse.json();
        const laptopsData = await laptopsResponse.json();
        const tabletsData = await tabletsResponse.json();
        const mobileAccessoriesData = await mobileAccessoriesResponse.json();

        const combinedProducts = [
            ...smartphonesData.products,
            ...laptopsData.products,
            ...tabletsData.products,
            ...mobileAccessoriesData.products
        ];

        const latestProducts = combinedProducts.slice(0, 8);
        const container = document.getElementById('products-container');
        container.innerHTML = '';
        latestProducts.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-card');
            productElement.innerHTML = `
                <a href="product.html?id=${product.id}" class="view-details">
                <div class="status in-stock">${product.availabilityStatus}</div>
                <img src="${product.images[0]}" alt="${product.title}" />
                <h3>${product.title}</h3>
                </a>
                <div class="reviews">Valoracion ${product.rating}</div>
                <p class="price">$${product.price}</p>
                <div class="reviews">Quedan: ${product.stock} unidades</div>
            `;
            container.appendChild(productElement);
        });
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
}
window.onload = fetchLatestProducts;
