const searchFormHandler = async (event) => {
    event.preventDefault();

    const city = document.querySelector('#location').value.trim();
    const checkIn = document.querySelector('#checkin').value.trim();
    const checkOut = document.querySelector('#checkout').value.trim();

    if (city && checkIn && checkOut) {
        const response = await fetch('/', {
            method: 'POST',
            body: JSON.stringify({city, checkIn, checkOut}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/api');
        } else {
            alert('Need to fill in the city, checkIn, and checkOut');
        }
    }
};

document
  .querySelector('.search-form')
  .addEventListener('submit', searchFormHandler);