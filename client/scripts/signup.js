const username = document.querySelector('#username');
const password = document.querySelector('#password');
const submit = document.querySelector('#submit');

const newUserSignup = () => {
  fetch('/signup', {
    method: 'POST',
    body: {
      username: username.value,
      password: password.value
    }
  })
  .then((res) => res.json())
  .then((data) => {
    if (data.error) {
      const errorMessage = document.createElement('div')
      errorMessage.appendChild(document.createTextNode(`Error: ${data.error}`));
      document.body.appendChild(errorMessage);
    }
    else console.log('User created');
  })
  .catch((err) => {
    console.log('An error occurred:', err);
  })
}

submit.addEventListener('click', newUserSignup);