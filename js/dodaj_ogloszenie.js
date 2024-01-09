function addNewAd() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('opis').value;
  const category = document.getElementById('category').value;
  const color = document.getElementById('color').value;
  const size = document.getElementById('size').value;
  const material = document.getElementById('material').value;
  const price = document.getElementById('price').value;

  if (!title || !description || !category || !color || !size || !material || !price) {
    alert('Proszę wypełnić wszystkie pola formularza.');
    return;
  }

  let products = JSON.parse(localStorage.getItem('products')) || [];
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  // Generowanie unikalnego ID dla nowego produktu
  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

  const newProduct = {
    id: newId,
    title,
    description,
    category,
    color,
    size,
    material,
    price: Number(price),
    imageName: "default.jpg",
    owner: loggedInUser.username // Dodajemy nazwę użytkownika jako właściciela produktu
  };

  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));

  document.getElementById('confirmationMessage').style.display = 'block';
  document.getElementById('formularzDodawania').reset();

  // Przekierowanie na inną stronę
  setTimeout(() => {
    window.location.href = './index.html'; // Zmień na odpowiednią stronę
  }, 2000); // Opóźnienie 2 sekundy
}

document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', (event) => {
      event.preventDefault();
      addNewAd();
    });
  }
});
