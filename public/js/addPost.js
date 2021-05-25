async function showPosts(e) {
    e.preventDefault();
  
    const title = document.querySelector('#title').value;
    const postContent = document.querySelector('contents').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        postContent
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('#submit').addEventListener('click', showPosts());