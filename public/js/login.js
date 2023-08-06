document.addEventListener("DOMContentLoaded", () => {
    // setting elements to a const
    const loginForm = document.querySelector("#lgoinForm");
    const usernameInput = document.querySelector("input#username");
    const passwordInput = document.querySelector("input#password");
  
    // event listener for submit
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
  
      if (!username || !password) {
        return;
      }
  
      try {
        // getting the input
        await loginUser(username, password);
        usernameInput.value = "";
        passwordInput.value = "";
        // If there's an error, log the error
      } catch (err) {
        console.log(err);
      }
    });
  
    async function loginUser(username, password) {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        window.location.replace("/");
      } else {
        throw new Error("Login failed");
      }
    }
  });
  