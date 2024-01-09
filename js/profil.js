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
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Obsługa zdarzenia DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  const profileDetails = document.getElementById('profileDetails');
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  // Wyświetl szczegóły profilu
  if (loggedInUser) {
    profileDetails.innerHTML = `
      <p>Imię: ${loggedInUser.firstName}</p>
      <p>Nazwisko: ${loggedInUser.lastName}</p>
      <p>Email: ${loggedInUser.email}</p>
      <p>Login: ${loggedInUser.username}</p>
    `;
  } else {
    profileDetails.innerHTML = '<p>Nie znaleziono danych użytkownika.</p>';
  }

  // Otwieranie domyślnej zakładki
  document.getElementsByClassName("tablinks")[0].click();

  // Wyświetlanie produktów wystawionych przez użytkownika
  displayProductsForUser(loggedInUser.username);
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
