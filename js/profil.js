// Funkcja do przełączania zakładek
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "flex";
  evt.currentTarget.className += " active";
}

// Obsługa zdarzenia DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  const profileDetails = document.getElementById('profileDetails');
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  // Wyświetl szczegóły profilu
  if (loggedInUser) {
    const table = document.createElement('table');
    table.className = 'profile-table';
    table.innerHTML = `
      <tr><th>Imię</th><td>${loggedInUser.firstName}</td></tr>
      <tr><th>Nazwisko</th><td>${loggedInUser.lastName}</td></tr>
      <tr><th>Email</th><td>${loggedInUser.email}</td></tr>
      <tr><th>Login</th><td>${loggedInUser.username}</td></tr>
      <!-- Dodaj więcej wierszy zgodnie z potrzebą -->
    `;
    profileDetails.appendChild(table);
  } else {
    profileDetails.innerHTML = '<p>Nie znaleziono danych użytkownika.</p>';
  }

  // Otwieranie domyślnej zakładki
  document.getElementsByClassName("tablinks")[0].click();

  // Wyświetlanie produktów wystawionych przez użytkownika
  displayProductsForUser(loggedInUser.username);


  displayUserPurchases()
});

// Funkcja do wyświetlania produktów użytkownika
function displayProductsForUser(username) {
  const listedItemsContainer = document.getElementById('ListedItems');
  const products = JSON.parse(localStorage.getItem('products')) || [];

  // Filtruj produkty należące do użytkownika
  const userProducts = products.filter(product => product.owner === username);

  // Wyświetlanie produktów użytkownika
  listedItemsContainer.innerHTML = '';
  userProducts.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
      <img src="img/${product.imageName}" alt="${product.title}" style="width:200px; height:200px;">
      <h3>${product.title}</h3>
      <p>Kategoria: ${product.category}</p>
      <p>Cena: ${product.price} $</p>
      <button onclick = "deleteProductByID(${product.id}, event)">Usuń</button>
    `;
    listedItemsContainer.appendChild(productDiv);
  });
}


function displayUserPurchases() {
  const purchasesContainer = document.getElementById('YourOrders');
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const purchases = JSON.parse(localStorage.getItem('purchases')) || [];
  const products = JSON.parse(localStorage.getItem('products')) || [];

  purchasesContainer.innerHTML = '';
  if (purchases.length === 0) {
    purchasesContainer.innerHTML = '<p>Brak zakupów.</p>';
    return;
  }

  purchases.forEach(purchase => {
    const product = products.find(p => p.id === purchase.itemId);
    if (!product) {
      return;
    }

    const purchaseDiv = document.createElement('div');
    purchaseDiv.className = 'product';
    purchaseDiv.innerHTML = `
      <img src="img/${product.imageName}" alt="${product.title}" style="width: 100px; height: 100px;">
      <h3>${purchase.itemName}</h3>
      <p>Cena: ${purchase.price} $</p>
      <p>Data zakupu: ${purchase.purchaseDate}</p>
    `;
    purchasesContainer.appendChild(purchaseDiv);
  });
}

function editUserProfile() {
  const profileDetails = document.getElementById('profileDetails');
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  // Create a form for editing user details
  const editForm = document.createElement('form');
  editForm.innerHTML = `
    <label for="firstName">Imię:</label>
    <input type="text" id="firstName" value="${loggedInUser.firstName}"><br>
    
    <label for="lastName">Nazwisko:</label>
    <input type="text" id="lastName" value="${loggedInUser.lastName}"><br>
    
    <label for="email">Email:</label>
    <input type="email" id="email" value="${loggedInUser.email}"><br>
    
    <label for="username">Login:</label>
    <input type="text" id="username" value="${loggedInUser.username}"><br>
    
    <button type="button" onclick="saveUserProfileChanges()">Zapisz</button>
  `;

  // Replace existing details with the edit form
  profileDetails.innerHTML = '';
  profileDetails.appendChild(editForm);
}

function saveUserProfileChanges() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  // Update user details based on the form values
  loggedInUser.firstName = document.getElementById('firstName').value;
  loggedInUser.lastName = document.getElementById('lastName').value;
  loggedInUser.email = document.getElementById('email').value;
  const newUsername = document.getElementById('username').value;

  // Check if the username has been changed
  if (loggedInUser.username !== newUsername) {
    // Update the username in the user's products
    updateProductsOwner(loggedInUser.username, newUsername);

    // Update the username in the product reviews
    updateReviewsUsername(loggedInUser.username, newUsername);
  }

  loggedInUser.username = newUsername;

  // Save the updated user details to localStorage
  localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

  // Reload the page or update the displayed details
  // You may need to modify this part based on your application flow
  location.reload();
}

function updateReviewsUsername(oldUsername, newUsername) {
  const reviews = JSON.parse(localStorage.getItem('productReviews')) || [];

  // Update the username in the product reviews
  reviews.forEach(review => {
    if (review.user === oldUsername) {
      review.user = newUsername;
    }
  });

  // Save the updated reviews back to localStorage
  localStorage.setItem('productReviews', JSON.stringify(reviews));
}

function updateProductsOwner(oldUsername, newUsername) {
  const products = JSON.parse(localStorage.getItem('products')) || [];

  // Update the owner of products with the old username to the new username
  products.forEach(product => {
    if (product.owner === oldUsername) {
      product.owner = newUsername;
    }
  });

  // Save the updated products back to localStorage
  localStorage.setItem('products', JSON.stringify(products));
}