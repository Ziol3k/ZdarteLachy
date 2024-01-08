function updateUIBasedOnLogin() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const loginRegister = document.getElementById('loginRegister');
  const myProfile = document.getElementById('myProfile');
  const logoutButton = document.getElementById('logoutButton');

  const addLoggedOut = document.getElementById('addLoggedOut');
  const addLoggedIn = document.getElementById('addLoggedIn');

  if (loggedInUser) {
    loginRegister.style.display = 'none';
    myProfile.style.display = 'block';
    addLoggedIn.style.display = 'none';
    addLoggedOut.style.display = 'block';
  } else {
    loginRegister.style.display = 'block';
    myProfile.style.display = 'none';
    addLoggedIn.style.display = 'block';
    addLoggedOut.style.display = 'none';
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', function() {
      localStorage.removeItem('loggedInUser');
      window.location.href = 'index.html';
    });
  }
}

document.addEventListener('DOMContentLoaded', updateUIBasedOnLogin);
