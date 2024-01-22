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

  //clear button
  const clearBtn = document.getElementById('clearLocalStorageBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        localStorage.clear();
        alert("Dane w LocalStorage zostały wyczyszczone.");
        location.reload();
    });
  }
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

  displayUserReviews();

  displayUserPurchases();
});

// Funkcja do wyświetlania produktów użytkownika
function displayProductsForUser(username) {
  const listedItemsContainer = document.getElementById('ListedItems');
  const products = JSON.parse(localStorage.getItem('products')) || [];

  // Filtruj produkty należące do użytkownika
  const userProducts = products.filter(product => product.owner === username);
  if(userProducts.length == 0){
     listedItemsContainer.innerHTML = '<p>Brak produktów.</p>';
     return;
  }

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

function displayUserReviews(){
    const reviewContainer = document.getElementById('Reviews');
    const reviews = JSON.parse(localStorage.getItem('productReviews')) || [];

    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const userId = loggedInUser.username;

    if(reviews.length == 0){
        reviewContainer.innerHTML = '<p>Brak opinii.</p>';
        return;
    }
    //zrobic to wyglądające jakoś + możliwośc usuwania
    reviews.forEach(review => {
        if(review.user == userId){
            const li = document.createElement('li');
            li.innerHTML = `<strong>${review.user}</strong> (${review.date}): ${review.text}`;
            reviewContainer.appendChild(li);
        }
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
  const editButton = document.getElementById('editProfileBtn');
  editButton.style.display = 'none';

  // Create a form for editing user details
  //email nie waliduje i nie wiem dlaczego
  const editForm = document.createElement('form');
  editForm.innerHTML = `
    <label for="firstName">Imię:</label>
    <input type="text" id="firstName" pattern = "([a-zA-Z]| )+" value="${loggedInUser.firstName}" required><br>

    <label for="lastName">Nazwisko:</label>
    <input type="text" id="lastName" pattern = "([a-zA-Z]| )+" value="${loggedInUser.lastName}" required><br>

    <label for="email">Email:</label>
    <input type="email" id="email" value="${loggedInUser.email}" required><br>

    <label for="username">Login:</label>
    <input type="text" id="username" value="${loggedInUser.username}" required><br>

    <button type="submit" id="zapisz">Zapisz</button>
    <button type="button" id= "anuluj" onclick="location.href = 'profil.html'">Anuluj</button>
  `;

  // Replace existing details with the edit form
  profileDetails.innerHTML = '';
  profileDetails.appendChild(editForm);
  profileDetails.addEventListener('submit', (event) => {
    event.preventDefault();
    saveUserProfileChanges();
  });
}

function saveUserProfileChanges() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const userData = JSON.parse(localStorage.getItem('userData-' + loggedInUser.username));


  // Update user details based on the form values
  loggedInUser.firstName = document.getElementById('firstName').value;
  loggedInUser.lastName = document.getElementById('lastName').value;
  loggedInUser.email = document.getElementById('email').value;
  const newUsername = document.getElementById('username').value;


  const userCheck = JSON.parse(localStorage.getItem('userData-' + newUsername));
  if(userCheck && newUsername!=loggedInUser.username){
    alert('Nazwa użytkownika jest zajęta');
    return;
  }
  // Check if the username has been changed
  if (loggedInUser.username !== newUsername) {
    // Update the username in the user's products
    updateProductsOwner(loggedInUser.username, newUsername);

    // Update the username in the product reviews
    updateReviewsUsername(loggedInUser.username, newUsername);
  }
  oldUsername = loggedInUser.username;
  loggedInUser.username = newUsername;

  userData.email = document.getElementById('email').value;
  userData.username = document.getElementById('username').value;
  userData.firstName = document.getElementById('firstName').value;
  userData.lastName = document.getElementById('lastName').value;

  // Save the updated user details to localStorage
  localStorage.setItem('userData-' + newUsername, JSON.stringify(userData));
  localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  if(newUsername!=oldUsername){
    localStorage.removeItem('userData-' + oldUsername);
  }
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

function deleteProductByID(productID){
  event.preventDefault();
  products = JSON.parse(localStorage.getItem('products'));
  products = products.filter(x => x.id!=productID);
  localStorage.setItem('products', JSON.stringify(products));
  location.reload();
}

