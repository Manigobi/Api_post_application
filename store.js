const store = {
  posts: [],
  users: [],
  currentPost: null,
  currentComments: [],
};

// Example of storing data fetched from APIs
async function fetchPosts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  store.posts = await response.json();
}

async function fetchUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  store.users = await response.json();
}

async function fetchPostDetails(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  store.currentPost = await response.json();
}

async function fetchComments(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
  store.currentComments = await response.json();
}

// Example of initializing store with data
async function initData() {
  if (!store.posts.length) await fetchPosts();
  if (!store.users.length) await fetchUsers();
}

initData();  // Initialize data when the app starts
