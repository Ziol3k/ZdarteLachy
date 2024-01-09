document.addEventListener('DOMContentLoaded', () => {
    displayCartSummary();

    // Dodaj obsługę zdarzenia dla formularza płatności
    const paymentForm = document.getElementById('paymentForm');
    paymentForm.addEventListener('submit', handlePaymentSubmission);
});

function handlePaymentSubmission(event) {
    // Zapobiegaj domyślnej akcji formularza (przeładowanie strony)
    event.preventDefault();

    // Po zakończeniu płatności usuń zawartość koszyka z localStorage
    clearCart();

    // Wyświetl komunikat po zakończeniu płatności
    alert('Płatność została zatwierdzona pomyślnie!');
}

function clearCart() {
    // Wyczyść zawartość koszyka w localStorage
    localStorage.removeItem('cart');
    // Odśwież podsumowanie koszyka na stronie
    displayCartSummary();
}

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


function handlePaymentSubmission(event) {
  event.preventDefault();

  // Tutaj logika płatności...

  // Po zakończeniu płatności zapisz zakupy
  savePurchases();

  clearCart();
  alert('Płatność została zatwierdzona pomyślnie!');
}

function savePurchases() {
  // Sprawdź, czy użytkownik jest zalogowany
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!loggedInUser) {
    // Jeśli użytkownik nie jest zalogowany, nie kontynuuj dalej
    return;
  }

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const products = JSON.parse(localStorage.getItem('products')) || [];
  const purchases = JSON.parse(localStorage.getItem('purchases')) || [];

  cartItems.forEach(productId => {
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
      purchases.push({
        userId: loggedInUser.username, // Unikalny identyfikator użytkownika
        itemId: product.id,
        itemName: product.title,
        price: product.price,
        purchaseDate: new Date().toISOString().slice(0, 10) // Data zakupu
      });
    }
  });

  localStorage.setItem('purchases', JSON.stringify(purchases));
}


