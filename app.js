// Main logic for rendering pages and handling UI interactions

const app = document.getElementById('app');

// Function to render the home page with posts
async function renderHomePage() {
  app.innerHTML = '<h1 class="post">Posts</h1>';
  
  // Ensure data is fetched before rendering
  await initData();

  const postsHtml = store.posts.map(post => {
    const user = store.users.find(user => user.id === post.userId);
    return `
      <div class="post">
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <p>By: ${user ? user.name : 'Unknown'}</p>
        <button onclick="showPostDetails(${post.id})">View Details</button>
      </div>
    `;
  }).join('');

  app.innerHTML += postsHtml;
}

// Function to render post details
async function renderPostDetails(postId) {
  const post = store.posts.find(post => post.id === postId);
  const user = store.users.find(user => user.id === post.userId);
  await fetchComments(postId);
  
  const commentsHtml = store.currentComments.map(comment => `
    <li>
      <p>${comment.name}</p>
      <p>${comment.body}</p>
    </li>
  `).join('');

  app.innerHTML = `
    <div class="post">
      <h1>${post.title}</h1>
      <p>${post.body}</p>
      <h3>Author: ${user ? user.name : 'Unknown'}</h3>
      <h2>Comments</h2>
      <ul>${commentsHtml}</ul>
      <button onclick="renderHomePage()">Back to Posts</button>
    </div>
  `;
}

// Function to show post details
async function showPostDetails(postId) {
  await fetchPostDetails(postId);
  renderPostDetails(postId);
}

// Function to initialize data from APIs
async function initData() {
  if (!store.posts.length) await fetchPosts();
  if (!store.users.length) await fetchUsers();
}

// Initial rendering of the home page
renderHomePage();
