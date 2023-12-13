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
        <h2>${product.title}</h2>
        <img src="img/${product.imageName}" alt="${product.title}" class="product-image">
        <p>${product.description}</p>
        <p>Kategoria: ${product.category}</p>
        <p>Cena: ${product.price} $</p>
        <p>Materiał: ${product.material}</p>
        <p>Kolor: ${product.color}</p>
        <p>Rozmiar: ${product.size}</p>
    `;
}
