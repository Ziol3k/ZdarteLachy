// js/productScript.js

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const products = JSON.parse(localStorage.getItem('products'));
  const product = products.find(p => p.id == productId);

  displayProductDetails(product);
});

function displayProductDetails(product) {
  if (!product) {
    document.getElementById('product-container').innerHTML = '<p>Produkt nie został znaleziony.</p>';
    return;
  }

  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML = `
    <div class="product-details-container">
      <img src="img/${product.imageName}" alt="${product.title}" class="product-image">
      <div class="product-details">
        <h2>${product.title}</h2>
        <p>Kategoria: ${product.category}</p>
        <p>Materiał: ${product.material}</p>
        <p>Kolor: ${product.color}</p>
        <p>Rozmiar: ${product.size}</p>
        <p>${product.description}</p>
        <p>Cena: ${product.price} $</p>
        <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Dodaj do koszyka</button>
      </div>
    </div>
  `;
}

function addToCart(productId) {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.push(productId);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  alert('Dodano do koszyka!');
}
