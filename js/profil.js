document.addEventListener('DOMContentLoaded', function() {
  const profileDetails = document.getElementById('profileDetails');
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (loggedInUser) {
    profileDetails.innerHTML = `
      <p>Imię: ${loggedInUser.firstName}</p>
      <p>Nazwisko: ${loggedInUser.lastName}</p>
      <p>Email: ${loggedInUser.email}</p>
      <p>Login: ${loggedInUser.username}</p>
    `;
  } else {
    profileDetails.innerHTML = '<p>Nie znaleziono danych użytkownika.</p>';
    // Można dodać przekierowanie na stronę logowania
  }
});
