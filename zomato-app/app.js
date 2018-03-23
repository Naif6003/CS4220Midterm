const
    zomatoApi = require('zomatoApi'),
    inquirer = require('inquirer')

// const categories = () => {
//     zomatoApi.categories()
//         .then(result => {
//           return inquirer.prompt([{
//                 type: 'checkbox',
//                 message: 'select a Category: ',
//                 name: 'Categories',
//                 choices: () => {
//                 let obj = []
//                     result.data.categories.forEach(category => {
//                         obj.push({
//                             name: category.categories.name,
//                             checked: false
//                         })
//                      })
//                      return obj
//                             },
//                 validate: function(result) {
//                     return true;
//                   }
//                 }])
//         })
//         .catch(err => console.log(err))
// }

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
                if(cityname === cityId.name.split(',')[0]){
                    /*  after we matched the city name with its Id
                        we call searchrestaurants function to get all restaurants
                        is this city.
                    */
                    zomatoApi.searchrestaurants(cityId.id)
                        .then(allRestInCity => {
                            allRestInCity.data.restaurants.forEach(restaurant => {
                                console.log(restaurant.restaurant.name)
                            })
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
    //categories,
    searchrestaurantsincity,
    restauranttypebycity,
    getrestaurantbytype
}
