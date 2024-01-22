// js/productScript.js

urlParams = new URLSearchParams(window.location.search);
productId = urlParams.get('id');
products = JSON.parse(localStorage.getItem('products'));

addedToCart = false;

document.addEventListener('DOMContentLoaded', () => {
  urlParams = new URLSearchParams(window.location.search);
  productId = urlParams.get('id');

  products = JSON.parse(localStorage.getItem('products'));
  const product = products.find(p => p.id == productId);

  addedToCart = false;
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
      <div id = "details" class="product-details">
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
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if(loggedInUser){
    found = products.find((element) => (element.id === productId && element.owner === loggedInUser.username));
    if(found){
     alert('Nie możesz kupić swojego produktu!');
     return;
    }};
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.push(productId);
  localStorage.setItem('cart', JSON.stringify(cartItems));
  if(!addedToCart){
    container = document.getElementById('details').innerHTML + "<p>Dodano do koszyka!</p>";
    document.getElementById('details').innerHTML = container;
    addedToCart = true;
  }
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
    product: productId,
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
    if(review.product == productId){
        const li = document.createElement('li');
        li.innerHTML = `<strong>${review.user}</strong> (${review.date}): ${review.text}`;
        reviewsList.appendChild(li);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateUIBasedOnLogin();
  setupLogoutButton();
  displayProductReviews(); // Dodane wywołanie funkcji do wyświetlania opinii

    //przekierowanie kategorii i search
  const categoryLinks = document.querySelectorAll('.category-link');
  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if(e.target.dataset.category==="Wszystkie"){}
      else{
          localStorage.setItem('redirect',JSON.stringify(e.target.dataset.category));
      }
      location.href="index.html";
    });
  });

  const clearBtn = document.getElementById('clearLocalStorageBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      localStorage.clear();
      alert("Dane w LocalStorage zostały wyczyszczone.");
      location.reload();
    });
  }

  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');

  searchButton.addEventListener('click', () => {
    products = JSON.parse(localStorage.getItem('products'));
    const searchValue = searchInput.value.toLowerCase();
    const matchingProducts = products.filter(product => product.title.toLowerCase().includes(searchValue));

    if (matchingProducts.length > 0) {
      if (matchingProducts.length === 1) {
        // Jeśli jest tylko jeden pasujący produkt, przekieruj na jego stronę
        window.location.href = `product.html?id=${matchingProducts[0].id}`;
      } else {
        // Jeśli jest więcej niż jeden pasujący produkt, wyświetl je wszystkie
        localStorage.setItem('redirect_search',JSON.stringify(matchingProducts));
        window.location.href = 'index.html';
      }
    } else {
      alert("Brak pasujących produktów.");
    }
  });
});