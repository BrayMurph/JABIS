// target the form and the event listener is submit
const loginForm = document.querySelector('form');

// create event listener that listens to a submit
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // capture inputs
    const formData = new FormData(loginForm);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
        // handler function should send post route
        // miniproject const response method post
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            // if response is ok send to homepage
            window.location.href = '/';
    } else {
        alert(response.statusText);
    }  
    } catch (err) {
        console.error('Error:', err);
        alert('An error occurred. Please try again later.');
    }
});

// function to update the login/logout button
const updateLoginLogoutButton = (isLoggedIn) => {
    const loginLogoutContainer = document.getElementById('loginlogout');
    if (isLoggedIn) {
      loginLogoutContainer.innerHTML = `
        <a href="/logout" class="text-pink-600 text-xl font-bold hover:underline">Logout</a>
      `;
    } else {
      loginLogoutContainer.innerHTML = `
        <a href="/login" class="mr-4 text-pink-600 text-xl font-bold hover:underline">Login</a>
        <a href="/signup" class="mr-4 text-pink-600 text-xl font-bold hover:underline">Sign Up</a>
      `;
    }
  };