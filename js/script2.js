products = JSON.parse(localStorage.getItem('products'));
displayProducts(products);
function filterProducts(category) {
    const filteredProducts = products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

function displayProducts(productsToDisplay) {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = '';

    productsToDisplay.filter(v => v.id>5).forEach(product => {
        const productLink = document.createElement('a');
        const productDelete = document
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
      <button type="deleteProduct">X</button>
    `;

        productsContainer.appendChild(productLink);
    });
}



document.addEventListener('DOMContentLoaded', () => {
    updateUIBasedOnLogin();
    displayProducts(products);

    const categoryLinks = document.querySelectorAll('.category-link');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            filterProducts(category);
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
});