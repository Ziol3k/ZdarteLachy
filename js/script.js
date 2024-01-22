// Początkowa lista produktów
const initialProducts = [
  { id: 1, title: "Czerwona koszulka", description: "Opis produktu 1", category: "Koszulki", color: "Czerwony", size: "L", material: "Bawełna", price: 20.00, imageName: "koszulka.jpg" },
  { id: 2, title: "Zielona kurtka puchowa", description: "Opis produktu 2", category: "Kurtki", color: "Zielony" , size: "M", material: "Bawełna", price: 30.00, imageName: "kurtka.jpg"  },
  { id: 3, title: "Czarne spodnie", description: "Opis produktu 3", category: "Spodnie", color: "Czarny", size: "S", material: "Jeans", price: 70.00, imageName: "spodnie.jpg"   },
  { id: 4, title: "Biała koszula", description: "Opis produktu 4", category: "Koszule", color: "Biały", size: "XL", material: "Bawełna", price: 50.00, imageName: "koszula.jpg"   },
  { id: 5, title: "Czarna Bluza", description: "Opis produktu 4", category: "Bluzy", color: "Zielony", size: "XL", material: "Bawełna", price: 90.00, imageName: "Bluza.jpg"   },
  // Dodaj więcej produktów z różnymi kategoriami
];

if (!localStorage.getItem('products')) {
  localStorage.setItem('products', JSON.stringify(initialProducts));
}

products = JSON.parse(localStorage.getItem('products'));


//filtrowanie z strony produktów
redirect = JSON.parse(localStorage.getItem('redirect'));
redirect_search = JSON.parse(localStorage.getItem('redirect_search'));


function filterProducts(category) {
  const filteredProducts = products.filter(product => product.category === category);
  displayProducts(filteredProducts);
}

function displayProducts(productsToDisplay) {
  const productsContainer = document.querySelector('.products');
  productsContainer.innerHTML = '';

  productsToDisplay.forEach(product => {
    const productLink = document.createElement('a');
    productLink.href = `product.html?id=${product.id}`;
    productLink.className = 'product';
    productLink.style.textDecoration = 'none';
    productLink.style.color = 'inherit';
    productLink.style.display = 'block'; // ważne, aby link był blokowy
    productLink.style.border = '1px solid #ccc';
    productLink.style.padding = '10px';
    productLink.style.marginBottom = '20px';

    productLink.innerHTML = `
      <img src="img/${product.imageName}" alt="${product.title}" style="width:200px; height:200px;">
      <h3>${product.title}</h3>
      <p>Kategoria: ${product.category}</p>
      <p>Cena: ${product.price} $</p>
    `;

    productsContainer.appendChild(productLink);
  });
}





document.addEventListener('DOMContentLoaded', () => {
  updateUIBasedOnLogin();
  if(redirect){
       const redirectFilter = redirect;
       filterProducts(redirectFilter);
       localStorage.removeItem('redirect');
   }
   else if(redirect_search){
       displayProducts(redirect_search);
       localStorage.removeItem('redirect_search');
   }
   else{
       displayProducts(products);
   }

  const categoryLinks = document.querySelectorAll('.category-link');
  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if(e.target.dataset.category==="Wszystkie"){
          displayProducts(products);
      }else{
          const category = e.target.dataset.category;
          filterProducts(category);
      }
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
    const searchValue = searchInput.value.toLowerCase();
    const matchingProducts = products.filter(product => product.title.toLowerCase().includes(searchValue));

    if (matchingProducts.length > 0) {
      if (matchingProducts.length === 1) {
        // Jeśli jest tylko jeden pasujący produkt, przekieruj na jego stronę
        window.location.href = `product.html?id=${matchingProducts[0].id}`;
      } else {
        // Jeśli jest więcej niż jeden pasujący produkt, wyświetl je wszystkie
        displayProducts(matchingProducts);
      }
    } else {
      alert("Brak pasujących produktów.");
    }
  });
});
