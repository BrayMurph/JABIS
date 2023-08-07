const searchFormHandler = async (event) => {
    event.preventDefault();

    const city = document.querySelector('#location').value.trim();

    if (city) {
            document.location.replace(`/search?city=${city}`);
        } else {
            alert('Need to fill in the city, checkIn, and checkOut');
        }
    }


document
  .querySelector('#searchForm')
  .addEventListener('submit', searchFormHandler);