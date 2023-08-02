(function () {
  // Function to handle form submission
  function scheduleAppointment() {
    const checkinDate = new Date(document.getElementById("checkin").value);
    const checkoutDate = new Date(document.getElementById("checkout").value);

    if (isNaN(checkinDate) || isNaN(checkoutDate)) {
      alert("Please select valid check-in and check-out dates.");
    } else if (checkoutDate < checkinDate) {
      alert("Check-out date cannot be before check-in date.");
    } else {
      // You can do something with the selected dates here
      // For example, you can send them to a server or perform some action
      alert(
        "Check-in: " +
          checkinDate.toDateString() +
          "\nCheck-out: " +
          checkoutDate.toDateString()
      );
    }
  }
  //test gitpush
  // Optional: If you want to prevent users from selecting past dates, you can add the min attribute to the date inputs.
  // For example, to prevent selecting dates before today:
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("checkin").setAttribute("min", today);
  document.getElementById("checkout").setAttribute("min", today);

  // Get the form element and add a submit event listener
  const form = document.getElementById("search-form");
  form.addEventListener("submit", function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Call the scheduleAppointment function to handle the form submission
    scheduleAppointment();
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  // Find the link to hotel1.handlebars
  const hotel1Link = document.getElementById("hotel1Link");

  // Add a click event listener to the link
  hotel1Link.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default link behavior

    // Use fetch or any other AJAX method to load the hotel1.handlebars content
    fetch("/views/hotel1.handlebars")
      .then((response) => response.text())
      .then((html) => {
        // Insert the loaded content into the page
        document.getElementById("hotelContent").innerHTML = html;
      })
      .catch((error) => {
        console.error("Error fetching hotel1.handlebars:", error);
      });
  });
});
