const categories = ['smartphones', 'laptops', 'tablets', 'accessories'];
const baseUrl = 'https://dummyjson.com/products/category/';

async function fetchBestDeals() {
    try {
        const urls = categories.map(category => `${baseUrl}${category}`);
        
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(response => response.json()));
        
        const allProducts = data.flatMap(categoryData => categoryData.products);

        const bestDeals = allProducts
            .sort((a, b) => b.discountPercentage - a.discountPercentage)
            .slice(0, 8);

        console.log('Mejores ofertas:', bestDeals);
        
        const dealsContainer = document.getElementById('deals-container');
        if (dealsContainer) {
            dealsContainer.innerHTML = bestDeals.map(product => `
                    <div class="deal-item">
                        <a href="../product.html?id=${product.id}" class="view-details">
                        <img src="${product.images[0]}" alt="${product.title}" />
                        <h3>${product.title}</h3>
                        <p class="old-price">Antes: $${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}</p>
                        <p class="new-price">Ahora: $${product.price}</p>
                        <p class="discount">Descuento: ${product.discountPercentage.toFixed(1)}%</p>
                    </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error al obtener las mejores ofertas:', error);
    }
}

fetchBestDeals();
