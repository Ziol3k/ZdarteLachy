document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.querySelector('.login-form');
  const registerForm = document.querySelector('.register-form');

  if(loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if(registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
});


function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById('login').value;
  const password = document.getElementById('password').value;
  const userData = JSON.parse(localStorage.getItem('userData-' + username));

  if (userData && userData.password === password) {
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    window.location.href = 'profil.html';
  } else {
    alert('Nieprawidłowy login lub hasło.');
  }
}

function handleRegister(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if (password !== confirmPassword) {
    alert('Hasła nie są takie same.');
    return;
  }

  const userData = { email, username, firstName, lastName, password };
  const userCheck = JSON.parse(localStorage.getItem('userData-' + username));
  if(userCheck){
    if(userCheck.username === userData.username){
        alert('Nazwa użytkownika jest zajęta.');
    }
    else if(userCheck.email === userData.email){
        alert('Adres email jest w użyciu.');
    }
    else{
        alert('Użytkownik już istnieje');
    }
  }else{
      localStorage.setItem('userData-' + username, JSON.stringify(userData));
      localStorage.setItem('loggedInUser', JSON.stringify(userData));
      alert('Rejestracja przebiegła pomyślnie.');
      window.location.href = 'profil.html';
  }
}
