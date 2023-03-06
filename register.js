const registerUrl = 'https://testapi.io/api/Stanelisa/resource/Arnoldas';

const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  try {
    const username = document.getElementById('username-register').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password-register').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const data = {
      username: username,
      email: email,
      password: password,
      'confirm-password': confirmPassword
    };

    const response = await fetch(registerUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseData = await response.json();
    console.log(responseData);

    localStorage.setItem('accessToken', responseData.access_token);

    hideRegisterForm(); 
  } catch (error) {
    console.error('Error:', error);
    const output = document.getElementById('output');
    output.textContent = 'There was an error registering. Please try again later.';
  }
});

function hideRegisterForm() {
    const registerContainer = document.querySelector('.register-container');
    registerContainer.style.display = 'none';
}