const loginUrl = 'https://testapi.io/api/Stanelisa/resource/User';

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  try {
    const username = document.getElementById('username-login').value;
    const password = document.getElementById('password-login').value;
    const data = { username, password };

    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch(loginUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const responseData = await response.json();
    console.log(responseData);
    hideLoginForm();
  } catch (error) {
    console.error('Error:', error);
    const output = document.getElementById('output');
    output.textContent = 'There was an error logging in. Please try again later.';
  }
});

function hideLoginForm() {
  const loginContainer = document.querySelector('.login-container');
  loginContainer.style.display = 'none';
}