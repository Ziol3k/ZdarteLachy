// js/cartScript.js

document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
});

function displayCartItems() {
    const cartContainer = document.getElementById('cart-container');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Koszyk jest pusty.</p>';
        return;
    }

    // Pobierz dane produktów z localStorage
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Przygotuj obiekt do śledzenia ilości produktów w koszyku
    const cartItemQuantities = {};

    // Zlicz ilość produktów w koszyku
    cartItems.forEach(productId => {
        cartItemQuantities[productId] = (cartItemQuantities[productId] || 0) + 1;
    });

    // Wygeneruj HTML dla każdego produktu w koszyku
    const cartContentHTML = Object.keys(cartItemQuantities).map(productId => {
        const product = products.find(p => p.id === parseInt(productId));

        if (product) {
            // Wygeneruj HTML dla produktu
            return `
                <div class="cart-item">
                    <img src="img/${product.imageName}" alt="${product.title}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h3>${product.title}</h3>
                        <p>Cena: ${product.price} $</p>
                        <p>Ilość: ${cartItemQuantities[productId]}</p>
                        <button onclick="removeFromCart(${product.id})">Usuń z koszyka</button>
                    </div>
                </div>
            `;
        } else {
            return '<p>Nieznany produkt w koszyku.</p>';
        }
    }).join('');

    // Oblicz łączną cenę
    const totalPrice = cartItems.reduce((total, productId) => {
        const product = products.find(p => p.id === parseInt(productId));
        return total + (product ? product.price : 0);
    }, 0);

    // Wyświetl łączną cenę
    const totalPriceHTML = `<p>Łączna cena: ${totalPrice.toFixed(2)} $</p>`;

    cartContainer.innerHTML = totalPriceHTML + cartContentHTML;
}

function removeFromCart(productId) {
    // Tutaj dodaj logikę usuwania produktu o określonym ID z koszyka
    // Przykładowa implementacja:
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Usuń tylko jedno wystąpienie produktu z koszyka
    const indexToRemove = cartItems.indexOf(productId);
    if (indexToRemove !== -1) {
        cartItems.splice(indexToRemove, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Ponownie wyświetl zawartość koszyka
    displayCartItems();
}

