const menuBtn = document.querySelector('.burger-menu');
const menu = document.querySelector('.menu');
const postTemplate = document.getElementById('post-template');
const postsContainer = document.getElementById('posts');
document.getElementById('addPost').addEventListener('submit', addPost);
const toggleButton = document.getElementById('toggle-theme');
toggleButton.addEventListener('click', toggletheme);
const loginContainer = document.querySelector('.login-container');
const closeButtonLogin = loginContainer.querySelector('.close-button');
const registerContainer = document.getElementById("register-container");
const closeButtonRegister = registerContainer.querySelector('.close-button');
const toggleRegister = document.getElementById("toggle-register");
const registerLink = document.getElementById("show-register");
const container = document.querySelector('.container');
const container1 = document.querySelector('.container1');

toggleRegister.addEventListener("click", () => {
  registerContainer.classList.toggle("show");
});

document.addEventListener("click", (e) => {
  if (e.target !== toggleRegister && e.target !== registerLink && !registerContainer.contains(e.target)) {
    registerContainer.classList.remove("show");
  }
  if (e.target.matches('.login-button')) {
    loginContainer.style.display = 'block';
  } else if (e.target === closeButtonLogin) {
    loginContainer.style.display = 'none';
  } else if (e.target.matches('.close-button')) {
    registerContainer.classList.remove("show");
  }
  if (e.target.matches('.burger-menu')) {
    menuBtn.classList.toggle('open');
    menu.classList.toggle('show');
    container1.classList.toggle('open');
  }
  if (e.target.tagName === 'A') {
    menu.classList.remove('show');
    menuBtn.classList.remove('open');
  }
});

registerLink.addEventListener("click", () => {
  registerContainer.classList.add("show");
});

closeButtonLogin.addEventListener('click', () => {
  loginContainer.style.display = 'none';
});

closeButtonRegister.addEventListener('click', () => {
  registerContainer.classList.remove("show");
});

function addPost(e) {
  e.preventDefault();

  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    alert('You must be logged in to create a post.');
    return;
  }

  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  const imageUrl = document.getElementById('image-url').value;

  let formData = new FormData();
  formData.append('title', title);
  formData.append('body', body);

  if (imageUrl) {
    formData.append('image', imageUrl);
  }

  fetch('https://testapi.io/api/Stanelisa/resource/newPosts', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.id) {
        const card = postTemplate.content.cloneNode(true);
        card.querySelector('.card').setAttribute('data-id', data.id);
        card.querySelector('.card-title').textContent = title;
        card.querySelector('.card-body').textContent = body;

        const cardImage = card.querySelector('.card-image');
        if (imageUrl) {
          cardImage.src = imageUrl;
        }

        card.querySelector('.edit-button').addEventListener('click', editPost);
        card.querySelector('.delete-button').addEventListener('click', deletePost);

        postsContainer.appendChild(card);
        document.getElementById('title').value = '';
        document.getElementById('body').value = '';
        document.getElementById('image-url').value = '';
      } else {
        const errorMessage = document.createElement('p');
        errorMessage.textContent =
          'There was a problem submitting your post. Please try again later.';
        document.getElementById('output').appendChild(errorMessage);
      }
    });
}

  
function editPost() {
  const card = this.parentElement;
  const id = card.dataset.id;
  const titleEl = card.querySelector('.card-title');
  const bodyEl = card.querySelector('.card-body');
  const imageEl = card.querySelector('.card-image');
  const title = titleEl.textContent;
  const body = bodyEl.textContent;
  const imageUrl = imageEl.src;

  const newTitle = prompt('Enter a new title:', title);
  const newBody = prompt('Enter a new body:', body);
  const newImageUrl = prompt('Enter a new image URL:', imageUrl);

  if (newTitle && newBody) {
    titleEl.textContent = newTitle;
    bodyEl.textContent = newBody;

    if (newImageUrl) {
      imageEl.src = newImageUrl;
    }

    let postData = { title: newTitle, body: newBody };

    if (newImageUrl) {
      postData.image = newImageUrl;
    }

    fetch(`https://testapi.io/api/Stanelisa/resource/newPosts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'success') {
          console.log('Post updated successfully');
        } else {
          throw new Error('Error editing post');
        }
      })
  }
}

function deletePost() {
    const card = this.parentElement;
    const id = card.dataset.id;
    const imageSrc = card.querySelector('.card-image').src;
  
    fetch(`https://testapi.io/api/Stanelisa/resource/newPosts/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          card.remove();
          if (imageSrc) {
            fetch(imageSrc, { method: 'DELETE' })
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`HTTP error ${response.status}`);
                }
              })
              .catch((error) => {
                console.error(error);
        
              });
          }
        } else {
          throw new Error(`HTTP error ${response.status}`);
        }
      })
      .catch((error) => {
        console.error(error);
        alert('There was an error deleting the post. Please try again later.');
      });
}
menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  menu.classList.toggle('show');
  container1.classList.toggle('open');

  console.log('Burger menu clicked');
});

toggleButton.addEventListener('click', toggletheme);

function toggletheme() {
  const body = document.body;
  body.classList.toggle('dark-mode');
  container.classList.toggle('dark-mode-container');
  const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
}

$(document).ready(function() {
  $(".burger-menu").click(function() {
    $("#toggle-theme").toggleClass("open");
  });
});