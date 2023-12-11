// script.js

// Funkcja wyświetlająca komunikat po dodaniu ogłoszenia
function showConfirmation() {
  // Wyświetlenie komunikatu w oknie dialogowym
  alert('Ogłoszenie zostało dodane!!!');
}


document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("submitBtn");

  submitBtn.addEventListener("click", function () {
    // Tutaj możesz dodać kod obsługi formularza, np. wysłanie danych do serwera

    // Po zatwierdzeniu, przekieruj użytkownika do produkt1.html
    window.location.href = "produkt1.html";
  });
});
