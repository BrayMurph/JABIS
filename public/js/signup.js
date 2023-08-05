document.addEventListener("DOMContentLoaded", () => {
    // Getting references to our form and inputs
    const signupForm = document.querySelector("form.signup");
    const firstNameInput = document.querySelector("input#first_name");
    const lastNameInput = document.querySelector("input#last_name");
    const emailInput = document.querySelector("input#email");
    const usernameInput = document.querySelector("input#username");
    const passwordInput = document.querySelector("input#password");
  
    // When the form is submitted, we validate the inputs and call the signupUser function
    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const firstName = firstNameInput.value.trim();
      const lastName = lastNameInput.value.trim();
      const email = emailInput.value.trim();
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
  
      if (!firstName || !lastName || !email || !username || !password) {
        return;
      }
  
      try {
        // If all fields are filled, we call the signupUser function and clear the form
        await signupUser(firstName, lastName, email, username, password);
        signupForm.reset();
      } catch (err) {
        console.log(err);
      }
    });
  
    // signupUser does a post to our "/signup" route and if successful, redirects us to the login page
    async function signupUser(firstName, lastName, email, username, password) {
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, username, password }),
      });
  
      if (response.ok) {
        window.location.replace("/login");
      } else {
        throw new Error("Signup failed");
      }
    }
  });
  