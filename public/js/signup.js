const signUp = (event) => {
  event.preventDefault();

  const username = document.querySelector('#signUpUsername').value.trim();
  const password = document.querySelector('#signUpPw').value.trim();

  if (username && password) {
    const response = fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log('success')
      document.location.replace('/');
    } else {
      alert('Oops! Something went wrong!');
    }
  }
};



const submit = document.querySelector('#submit')
submit.addEventListener('click', signUp);