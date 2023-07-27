// Hotel API fetch
async function hotelApi () {
    const url = 'https://hotels-com-provider.p.rapidapi.com/v2/regions?locale=en_GB&query=Prag&domain=AE';
    const options = {
	    method: 'GET',
	    headers: {
		'X-RapidAPI-Key': '77ebdb9e7bmshe4b4afb4ed852e5p13b0efjsndafdb1127ce6',
		'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
	    }
    };

    try {
	    const response = await fetch(url, options);
	    const result = await response.text();
	    console.log(result);
    } catch (error) {
	    console.error(error);
    }
}

hotelApi();