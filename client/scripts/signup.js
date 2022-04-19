const username = document.querySelector('#username');
const password = document.querySelector('#password');
const submit = document.querySelector('#submit');

const newUserSignup = () => {
  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  })
  .then((res) => {
    if (res.type === String) res.json();
  })
  .then((data) => {
    if (data) {
      const errorMessage = document.createElement('div')
      errorMessage.appendChild(document.createTextNode(`Error: ${data.error}`));
      document.body.appendChild(errorMessage);
    }
    else {
      console.log('User created');
      window.location.assign('/secret');
    }
  })
  .catch((err) => {
    console.log('An error occurred', err);
  });
}

submit.addEventListener('click', newUserSignup);
