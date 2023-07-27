// Venue API fetch
function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=QGUJP6AjeVwhV37xW4kEQI8HMT9AWhi4';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
      });
    }

getApi();