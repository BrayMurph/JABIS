// Hotel API fetch
function hotelApi () {
	const settings = {
		async: true,
		crossDomain: true,
		url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/search?domain=AE&sort_order=REVIEW&locale=en_GB&checkout_date=2023-09-27&region_id=2872&adults_number=1&checkin_date=2023-09-26&available_filter=SHOW_AVAILABLE_ONLY&meal_plan=FREE_BREAKFAST&guest_rating_min=8&price_min=10&page_number=1&children_ages=4%2C0%2C15&amenities=WIFI%2CPARKING&price_max=500&lodging_type=HOTEL%2CHOSTEL%2CAPART_HOTEL&payment_type=PAY_LATER%2CFREE_CANCELLATION&star_rating_ids=3%2C4%2C5',
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '77ebdb9e7bmshe4b4afb4ed852e5p13b0efjsndafdb1127ce6',
			'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
		}
	};
	
	$.ajax(settings).done(function (response) {
		console.log("Hotel API");
		console.log(response);
		console.log(response.properties[0]);
	});
}

hotelApi();

