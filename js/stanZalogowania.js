function updateUIBasedOnLogin() {
  // Pobieranie informacji o zalogowanym użytkowniku z localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  // Pobieranie elementów DOM
  const loginRegister = document.getElementById('loginRegister');
  const myProfile = document.getElementById('myProfile');
  const addAnnouncementBtn = document.getElementById('addAnnouncementBtn');

  // Logika dla przycisków Zaloguj/Zarejestruj i Wyloguj
  if (loggedInUser) {
    if (loginRegister) loginRegister.style.display = 'none';
    if (myProfile) myProfile.style.display = 'block';
  } else {
    if (loginRegister) loginRegister.style.display = 'block';
    if (myProfile) myProfile.style.display = 'none';
  }

  // Logika dla przycisku Dodaj ogłoszenie
  if (addAnnouncementBtn) {
    addAnnouncementBtn.href = loggedInUser ? 'dodaj_ogloszenie.html' : 'logowanie_rejestracja.html';
  }

}

// Dodawanie obsługi wylogowania
function setupLogoutButton() {
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', function(event) {
      event.preventDefault();
      localStorage.removeItem('loggedInUser');
      window.location.href = 'index.html'; // lub 'logowanie_rejestracja.html'
    });
  }
}

// Wywołanie funkcji po załadowaniu DOM
document.addEventListener('DOMContentLoaded', function() {
  updateUIBasedOnLogin();
  setupLogoutButton();
});
