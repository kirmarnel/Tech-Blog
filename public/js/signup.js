const signUp = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#signUpUsername').value.trim();
    const password = document.querySelector('#signUpPw').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Oops! Something went wrong!');
      }
    }
  };

  document
  .querySelector('#signUpForm')
  .addEventListener('submit', signUp);