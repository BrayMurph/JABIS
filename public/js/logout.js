// logout.js
document.addEventListener('DOMContentLoaded', () => {
    const logout = async () => {
      const response = await fetch('/logout', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to logout. Please try again.');
      }
    };
  
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
      logoutButton.addEventListener('click', logout);
    }
  });
  