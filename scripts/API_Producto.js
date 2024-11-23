async function fetchProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  const productDetailsUrl = `https://dummyjson.com/products/${productId}`;

  try {
    const response = await fetch(productDetailsUrl);

    if (!response.ok) {
      throw new Error("No se pudo obtener los detalles del producto");
    }

    const product = await response.json();

    const container = document.getElementById("product-details");
    if (container) {
      container.innerHTML = `
                <div class="product-image">
                    <img src="${product.images[0]}" alt="${product.title}" />
                </div>
                <div class="product-info">
                    <h1>${product.title}</h1>
                    <p>${product.description}</p>
                    <p class="price">$${product.price}</p>
                    <button class="btn btn-success" onclick="buyNow(${product.id})">Comprar ahora</button>
                    <br>
                    <br>
                    <button class="btn btn-outline-dark add-to-cart" onclick="handleAddToCart(${product.id})">Agregar al carrito</button>
                </div>
            `;

      // especificaciones del producto
      const specificationsContainer = document.createElement("div");
      specificationsContainer.classList.add("product-specifications");
      specificationsContainer.innerHTML = `
                <h2>Especificaciones</h2>
                <ul>
                    <li><strong>Categoría:</strong> ${product.category}</li>
                    <li><strong>Marca:</strong> ${
                      product.brand || "Desconocida"
                    }</li>
                    <li><strong>Stock:</strong> ${product.stock}</li>
                    <li><strong>Garantia:</strong> ${product.returnPolicy}</li>
                </ul>
                <br>
                <div class="product-image">
                    <img src="${product.images[1]}" alt="${product.title}" />
                </div>
                <div class="product-image">
                    <img src="${product.images[2]}" alt="${product.title}" />
                </div>
            `;
      container.appendChild(specificationsContainer);

      // reseñas
      const reviewsContainer = document.getElementById("product-reviews");
      if (reviewsContainer) {
        reviewsContainer.innerHTML = `
                    <h3>Reseñas del producto</h3>
                    <p>⭐️ ${product.rating.toFixed(1)} / 5 (${
          Math.floor(Math.random() * 100) + 10
        } reseñas)</p>
                    <ul>
                        <li>"Producto excelente, cumplió mis expectativas." - Usuario1 ${
                          product.reviews.rating
                        } </li>
                        <li>"Calidad/precio inmejorable, muy satisfecho." - Usuario2</li>
                        <li>"Llegó rápido y funciona perfectamente." - Usuario3</li>
                    </ul>
                `;
      }
      container.appendChild(reviewsContainer);
    }
  } catch (error) {
    console.error("Error al obtener los detalles del producto:", error);
  }
}

// categorías de productos
const apiSmartphonesUrl = "https://dummyjson.com/products/category/smartphones";
const apiLaptopsUrl = "https://dummyjson.com/products/category/laptops";
const apiTabletsUrl = "https://dummyjson.com/products/category/tablets";
const apiMobileAccessoriesUrl =
  "https://dummyjson.com/products/category/mobile-accessories";

async function fetchLatestProducts() {
  try {
    const [
      smartphonesResponse,
      laptopsResponse,
      tabletsResponse,
      mobileAccessoriesResponse,
    ] = await Promise.all([
      fetch(apiSmartphonesUrl),
      fetch(apiLaptopsUrl),
      fetch(apiTabletsUrl),
      fetch(apiMobileAccessoriesUrl),
    ]);

    if (
      !smartphonesResponse.ok ||
      !laptopsResponse.ok ||
      !tabletsResponse.ok ||
      !mobileAccessoriesResponse.ok
    ) {
      throw new Error("Error al obtener los productos");
    }

    const smartphonesData = await smartphonesResponse.json();
    const laptopsData = await laptopsResponse.json();
    const tabletsData = await tabletsResponse.json();
    const mobileAccessoriesData = await mobileAccessoriesResponse.json();

    const combinedProducts = [
      ...smartphonesData.products,
      ...laptopsData.products,
      ...tabletsData.products,
      ...mobileAccessoriesData.products,
    ];

    const latestProducts = combinedProducts.slice(12, 16);

    const container = document.getElementById("products-container");

    container.innerHTML = "";

    latestProducts.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product-card");

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
    console.error("Error al obtener los productos:", error);
  }
}

window.onload = fetchLatestProducts;

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", fetchProductDetails);
} else {
  fetchProductDetails();
}

function handleAddToCart(productId) {
  addToCart(productId);
}
