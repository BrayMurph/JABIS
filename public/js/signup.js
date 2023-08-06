document.addEventListener("DOMContentLoaded", () => {
  // Setting elements to constants
  const signupForm = document.querySelector("#signupForm");
  const firstNameInput = document.querySelector("input#first_name");
  const lastNameInput = document.querySelector("input#last_name");
  const emailInput = document.querySelector("input#email");
  const usernameInput = document.querySelector("input#username");
  const passwordInput = document.querySelector("input#password");

  // Event listener for form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get values from input fields
    const first_name = firstNameInput.value.trim();
    const last_name = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // Check if any of the fields are empty
    if (!first_name || !last_name || !email || !username || !password) {
      return;
    }

    try {
      // Send signup data to the API endpoint
      await signupUser({ first_name, last_name, email, username, password });

      // Clear the input fields after successful signup
      firstNameInput.value = "";
      lastNameInput.value = "";
      emailInput.value = "";
      usernameInput.value = "";
      passwordInput.value = "";

      // Redirect to the login page after successful signup
      window.location.replace("/login");
    } catch (err) {
      console.log(err);
      // Handle the error appropriately (e.g., show an error message)
    }
  });

  async function signupUser(userData) {
    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }
  }
});
