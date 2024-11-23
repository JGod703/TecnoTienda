const searchInput = document.getElementById('search-input');
const autocompleteResults = document.getElementById('autocomplete-results');

const allowedCategories = ['smartphones', 'laptops', 'tablets', 'mobile-accessories'];

searchInput.addEventListener('input', async (e) => {
    const query = e.target.value.trim();
    if (query.length >= 2) {
        try {
            const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
            const data = await response.json();
            const products = data.products;

            // categorias de electronica
            const filteredProducts = products.filter(product => 
                allowedCategories.includes(product.category)
            );

            // sugerencias
            autocompleteResults.innerHTML = filteredProducts.length > 0 
                ? filteredProducts.map(product => `
                    <div class="autocomplete-item" onclick="selectProduct(${product.id})">
                        <img src="${product.images[0]}" alt="${product.title}" />
                        <span>${product.title}</span>
                    </div>
                `).join('')
                : '<div class="autocomplete-item">No se encontraron resultados</div>';
        } catch (error) {
            console.error('Error al buscar productos:', error);
        }
    } else {
        autocompleteResults.innerHTML = '';
    }
});

function selectProduct(productId) {
    // ir a la pagina del producto
    window.location.href = `product.html?id=${productId}`;
}
