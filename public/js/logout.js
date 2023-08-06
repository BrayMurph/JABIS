// // logout.js
// document.addEventListener("DOMContentLoaded", () => {
//     const logoutButton = document.getElementById("logout-button");
  
//     // Add event listener to the logout button
//     logoutButton.addEventListener("click", async (event) => {
//       event.preventDefault();
  
//       try {
//         // Send a request to the logout route on the server
//         const response = await fetch("/logout", {
//           method: "GET",
//         });
  
//         // Check if the logout was successful
//         if (response.ok) {
//           // Redirect the user to the homepage or any other appropriate page
//           window.location.replace("/");
//         } else {
//           console.error("Logout failed");
//         }
//       } catch (err) {
//         console.error("Error during logout:", err);
//       }
//     });
//   });
  
const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);