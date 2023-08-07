const searchFormHandler = async (event) => {
    event.preventDefault();

    const city = document.querySelector('#location').value.trim();

    if (city) {
        const response = await fetch('/', {
            method: 'POST',
            body: JSON.stringify({city}),
            headers: {'Content-Type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/venues');
        } else {
            alert('Need to fill in the city, checkIn, and checkOut');
        }
    }
};

document
  .querySelector('#searchForm')
  .addEventListener('submit', searchFormHandler);