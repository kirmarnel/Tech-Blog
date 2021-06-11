async function showPosts(event) {
  event.preventDefault();

  const title = document.querySelector('#blogTitle').value;
  const postContent = document.querySelector('#contents').value;
console.log(title)
console.log(postContent)
  const response = await fetch('/api/posts', {
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

document.querySelector('#form').addEventListener('submit', showPosts);