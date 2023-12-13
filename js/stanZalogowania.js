function updateUIBasedOnLogin() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const loginRegister = document.getElementById('loginRegister');
  const myProfile = document.getElementById('myProfile');
  const logoutButton = document.getElementById('logoutButton');

  if (loggedInUser) {
    loginRegister.style.display = 'none';
    myProfile.style.display = 'block';
  } else {
    loginRegister.style.display = 'block';
    myProfile.style.display = 'none';
  }

  if (logoutButton) {
    logoutButton.addEventListener('click', function() {
      localStorage.removeItem('loggedInUser');
      window.location.href = 'index.html';
    });
  }
}

document.addEventListener('DOMContentLoaded', updateUIBasedOnLogin);
