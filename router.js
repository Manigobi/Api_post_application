// Router implementation (basic example)

// Example of basic routing based on hash changes
window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1);
  if (hash.startsWith('post/')) {
    const postId = hash.split('/')[1];
    showPostDetails(postId);
  } else {
    renderHomePage();
  }
});
