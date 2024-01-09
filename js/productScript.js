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

function addReview() {
  const reviewText = document.getElementById('review-text').value.trim();
  if (reviewText === "") {
    alert('Proszę wprowadzić treść opinii.');
    return;
  }

  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!loggedInUser) {
    alert('Musisz być zalogowany, aby dodać opinię.');
    return;
  }

  const review = {
    user: loggedInUser.username,
    text: reviewText,
    date: new Date().toLocaleDateString()
  };

  // Pobierz istniejące opinie lub utwórz nową tablicę
  const reviews = JSON.parse(localStorage.getItem('productReviews')) || [];
  reviews.push(review);

  // Zapisz opinie w localStorage
  localStorage.setItem('productReviews', JSON.stringify(reviews));

  // Odśwież listę opinii na stronie
  displayProductReviews();
}

function displayProductReviews() {
  const reviewsList = document.getElementById('reviews-list');
  reviewsList.innerHTML = '';

  const reviews = JSON.parse(localStorage.getItem('productReviews')) || [];

  reviews.forEach(review => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${review.user}</strong> (${review.date}): ${review.text}`;
    reviewsList.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  updateUIBasedOnLogin();
  setupLogoutButton();
  displayProductReviews(); // Dodane wywołanie funkcji do wyświetlania opinii
});