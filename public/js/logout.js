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
  
    const logoutButton = document.getElementById('loginlogout');
    if (logoutButton) {
      logoutButton.addEventListener('click', logout);
    }
  });

  document.addEventListener('DOMContentLoaded', async () => {
    const checkAuthentication = async () => {
      const response = await fetch('/checkLoggedIn', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        const data = await response.json();
        const isLoggedIn = data.isLoggedIn;
  
        const bookButton = document.getElementById('bookButton');
        const bookButtonText = bookButton.querySelector('.transition-colors');
  
        if (isLoggedIn) {
          bookButtonText.textContent = 'Book now';
          bookButton.href = '{{venue.url}}';
        } else {
          bookButtonText.textContent = 'Please login to continue';
          bookButton.removeAttribute('href');
        }
      }
    };
  
    const bookButton = document.getElementById('bookButton');
    if (bookButton) {
      checkAuthentication();
  
      bookButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const response = await fetch('/checkLoggedIn', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          const data = await response.json();
          const isLoggedIn = data.isLoggedIn;
          if (!isLoggedIn) {
            // Redirect to the login page if not logged in
            window.location.href = '/login';
          } else {
            // Redirect to the venue URL
            window.location.href = bookButton.getAttribute('href');
          }
        }
      });
    }
  });
  
  
  
  
  
  
  