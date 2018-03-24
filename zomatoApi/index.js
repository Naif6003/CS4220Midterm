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

// gets all the categories in the API
exports.categories = () => {
        return _fetch('categories')
}

// get the id of the city by city name.
exports.getcityidbyname = (cityname) => {
    return _fetch(`cities?q=${cityname}`)
}

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
