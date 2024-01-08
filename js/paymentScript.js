// Dodaj do istniejącego pliku js/paymentScript.js

document.addEventListener('DOMContentLoaded', () => {
    displayCartSummary();
    displayCartItems();
});

function displayCartSummary() {
    const cartSummaryContainer = document.getElementById('cartSummary');
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItems.length === 0) {
        cartSummaryContainer.innerHTML = '<p>Koszyk jest pusty.</p>';
        return;
    }

    const products = JSON.parse(localStorage.getItem('products')) || [];
    let totalPrice = 0;

    cartItems.forEach(productId => {
        const product = products.find(p => p.id === parseInt(productId));

        if (product) {
            // Dodaj produkt do listy koszyka
            const cartItem = document.createElement('li');
            cartItem.classList.add('cart-summary-item');
            cartItem.innerHTML = `
                <span>${product.title}</span>
                <span>${product.price} $</span>
            `;
            cartSummaryContainer.appendChild(cartItem);

            // Dodaj cenę produktu do łącznej ceny
            totalPrice += product.price;
        }
    });

    // Dodaj łączną cenę do listy koszyka
    const totalElement = document.createElement('li');
    totalElement.classList.add('cart-total');
    totalElement.textContent = `Łączna cena: ${totalPrice.toFixed(2)} $`;
    cartSummaryContainer.appendChild(totalElement);
}
