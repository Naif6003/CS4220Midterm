const
     config = require('./config'),
     axios = require('axios')


const _fetch = (command) => {
    return axios.get(`${config.url}/${command}`, {
        headers: {
            Accept: 'application/json',
            'user-key': '96b7802e7ab814942f3f0a68fb3bab73'
        }
    })
        .then(response => response)
        .catch(error => error.response.body)
}

exports.categories = () => {
        return _fetch('categories')
}


exports.getcityidbyname = (cityname) => {
    return _fetch(`cities?q=${cityname}`)
}
/*
// get the restaurants in a specific city by city id.
exports.searchrestaurants = (cityId) => {
    return _fetch(`search?entity_id=${cityId}&entity_type=city`)
}

// search for a restaurant type in a city
exports.searchrestauranttype = (entity_id, establishment_type) => {
    return _fetch(`search?entity_id=${entity_id}&entity_type=city&establishment_type=${establishment_type}`)
}

// get establishment_type by city_id
exports.getestablishmenttypebyid = (city_id) => {
    return _fetch(`establishments?city_id=${city_id}`)
}
// get restaurant reviews
exports.getrestaurantreviews = (res_id) => {
    return _fetch(`reviews?res_id=${res_id}`)
}

exports.getRestaurantListByCity = (cityName) => {
    return _fetch(`search?entity_type=city&q=${cityName}`)
}

exports.getRestaurantReviewsAndRatings = (restaurantID) =>{
    return _fetch(`reviews?res_id=${restaurantID}`)
}*/

exports.cuisines = (cityId) => {
    //return _fetch('/cuisines?city_id=1');
    return _fetch(`/cuisines?city_id=${cityId}`)
}

exports.establishments = (cityId) => {
    
    return _fetch(`/establishments?city_id=${cityId}`)
}

exports.searchForCuisine = (cityId,ids) => {
   
    return _fetch(`/search?entity_id=${cityId}&entity_type=city&cuisines=${ids}`)
}

exports.searchForTypes = (cityId,id) => {

    return _fetch(`/search?entity_id=${cityId}&entity_type=city&establishment_type=${id}`)
}
