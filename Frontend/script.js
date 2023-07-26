document.addEventListener("DOMContentLoaded", function () {
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

  // Optional: If you want to prevent users from selecting past dates, you can add the min attribute to the date inputs.
  // For example, to prevent selecting dates before today:
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("checkin").setAttribute("min", today);
  document.getElementById("checkout").setAttribute("min", today);
});
