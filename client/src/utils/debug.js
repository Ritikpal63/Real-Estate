// src/utils/debug.js
export const debugAuth = () => {
  console.log('=== Auth Debug ===');
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  
  console.log('Token exists:', !!token);
  if (token) {
    console.log('Token length:', token.length);
    console.log('Token preview:', token.substring(0, 20) + '...');
  }
  
  console.log('User exists:', !!user);
  if (user) {
    try {
      console.log('User data:', JSON.parse(user));
    } catch (e) {
      console.log('Invalid user JSON');
    }
  }
  console.log('=================');
};