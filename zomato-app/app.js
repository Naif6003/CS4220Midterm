const
    zomatoApi = require('zomatoApi'),
    inquirer = require('inquirer')

const findcitiestosearch = (cityname) => {
    zomatoApi.getcityidbyname(cityname)
        .then(result => {
                return inquirer.prompt([{
                    type: 'list',
                    message: 'select the city you want',
                    name: 'citysuggestions',
                    choices: () => {
                        let obj = []
                         result.data.location_suggestions.forEach(citynamesuggestions => {
                                  obj.push(citynamesuggestions.name)
                            checked: false
                        })
                        return obj
                    },
                    validate: () => {
                        return true
                    }
                }])

        })
        .then(answers => { // after finding the list of all correct cities we find the rest in them.
                    let obj = zomatoApi.getcityidbyname(answers.citysuggestions)
                    return [obj , answers] // the way to pass two arguments
        })
                .then(restaurants => {
                    restaurants[0].then(result => {
                        result.data.location_suggestions.forEach(city => {
                                if(city.name === restaurants[1].citysuggestions){
                                    zomatoApi.searchrestaurants(city.id)
                                    .then(result => {
                                        console.log("-----ALL RESTAURANTS IN ONE CITY----")
                                        result.data.restaurants.forEach(city => {
                                            console.log(city.restaurant.name)
                                        })
                                        console.log('------------------------------------')
                                    })
                                }
                        })
                    })
        })
        .catch(err => console.log(err))
}

const getrestaurantbytype = () => {
          return inquirer.prompt([{
                  type: 'input',
                  message: "Enter the city you want to search in: ",
                  name: "cityName",
         },{
             type: 'input',
             message: "Enter the type of the restaurant: (Café, Bakery or Fast Food):",
             name: "restaurantType",
        }])
        .then(results => {
            restauranttypebycity(results)
        })
        .catch(err => console.log(err))
    }


// get all restaurants in a city by city_id
const searchrestaurantsincity = (cityname) => {
    zomatoApi.getcityidbyname(cityname)
        .then(result => {
            /* location_suggestions will bring all names around the world
                which has the same (cityname) in it
            */
            result.data.location_suggestions.forEach(cityId => {
                if(cityname.replace(/([a-z])([A-Z])/, '$1 $2') === cityId.name.split(',')[0]){
                    /*  after we matched the city name with its Id
                        we call searchrestaurants function to get all restaurants
                        is this city.
                    */
                    zomatoApi.searchrestaurants(cityId.id)
                        .then(allRestInCity => {
                            console.log('------------ Restaurants Names:')
                            allRestInCity.data.restaurants.forEach(restaurant => {
                                console.log(restaurant.restaurant.name)
                            })
                            console.log('------------------------------')
                        })

                }
            })
        })
        .catch(err => console.log(err))
}


// get all restaurants in a city by restaurant type.
const restauranttypebycity = (answersObj) => {
    zomatoApi.getcityidbyname(answersObj.cityName)
        .then(result => {
            /* location_suggestions will bring all names around the world
                which has the same (cityname) in it
            */
            result.data.location_suggestions.forEach(cityId => {
                if(answersObj.cityName === cityId.name.split(',')[0]){
                    /*  after we matched the city name with its Id
                        we call getestablishmenttypebyid function to get all restaurants
                        is this city with the matching type .
                    */
                    zomatoApi.getestablishmenttypebyid(cityId.id)
                        .then(allRestInCity => {
                            allRestInCity.data.establishments.forEach(establishments => {
                                    if(establishments.establishment.name === answersObj.restaurantType){
                                        zomatoApi.searchrestauranttype(cityId.id,establishments.establishment.id)
                                            .then(finalresults => {
                                                finalresults.data.restaurants.forEach(restaurantName => {
                                                        console.log(restaurantName.restaurant.name)
                                                })
                                            })
                                    }
                            })
                        })

                }
            })
        })
        .catch(err => console.log(err))
}

module.exports = {
    findcitiestosearch,
    searchrestaurantsincity,
    restauranttypebycity,
    getrestaurantbytype
}
