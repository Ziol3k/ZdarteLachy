// script.js
function submitForm() {
  // Symulacja przetwarzania formularza
  // Tutaj możesz dodać kod AJAX do wysłania formularza na serwer

  // Po dodaniu ogłoszenia, pokaż okienko informacyjne
  document.getElementById("overlay").style.display = "flex";
}

function closePopup() {
  // Zamknij okienko po kliknięciu przycisku "Zamknij"
  document.getElementById("overlay").style.display = "none";
}

