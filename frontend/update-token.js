// Utility to update JWT token in localStorage and Redux state
// Use this when you have a new valid token

const newToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhcmloYXJhbjIyMTA3NjVAc3NuLmVkdS5pbiIsImlkIjoiNjhmN2JiMzg0Mzg0NGJkMWQxOGI5NGI1IiwiYWNjb3VudFR5cGUiOiJJbnN0cnVjdG9yIiwiaWF0IjoxNzYxMDY5Mzk5LCJleHAiOjE3NjExNTU3OTl9.q9O3_xsTrLAtxEZNcc2YRTFM_dME2B1k4joxJktmXn4";

console.log('Updating JWT token in localStorage...');

// Update token in localStorage
localStorage.setItem("token", JSON.stringify(newToken));

console.log('Token updated! Please refresh the page or restart your React app.');
console.log('New token:', newToken);

// Optional: Clear and reload
// localStorage.clear();
// location.reload();
