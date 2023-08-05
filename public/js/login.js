// function to update the login/logout button
const updateLoginLogoutButton = (isLoggedIn) => {
    const loginLogoutContainer = document.getElementById('loginlogout');
    const logoutLink = loginLogoutContainer.querySelector('a[href="/logout"]');
    
    if (isLoggedIn) {
      loginLogoutContainer.innerHTML = `
        <a href="#" id="logout-button" class="text-pink-600 text-xl font-bold hover:underline">Logout</a>
      `;
    } else {
      loginLogoutContainer.innerHTML = `
        <a href="/login" class="mr-4 text-pink-600 text-xl font-bold hover:underline">Login</a>
        <a href="/signup" class="mr-4 text-pink-600 text-xl font-bold hover:underline">Sign Up</a>
      `;
    }
    
    // handling logging out
    if (isLoggedIn) {
      logoutLink.addEventListener('click', async (event) => {
        event.preventDefault();
    
        try {
          const response = await fetch('/logout', {
            method: 'GET',
          });
      
          if (response.ok) {
            // If logout is successful, redirect the user to the homepage or any other desired page
            window.location.href = '/';
          } else {
            // Handle error if logout is not successful
            alert('Logout failed. Please try again.');
          }
        } catch (err) {
          console.error('Error:', err);
          alert('An error occurred. Please try again later.');
        }
      });
    }
  };
  