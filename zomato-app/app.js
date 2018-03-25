const
    zomatoApi = require('zomatoApi'),
    inquirer = require('inquirer')

// /**
//  * Search for Restaurants
//  *
//  * Asks for City name, and then defers to getter(s)
//  */
// const searchRestaurants = () => {
//     console.log("IN HERE");
// }

/**
  * Get Restaurants By City
  *
  * Ex: cli.js search --city "Los Angeles"
*/

const getRestaurantsByCity = (cityName) => {
    if(cityName){
        zomatoApi.getRestaurantListByCity(cityName)
            .then(response =>{
                let restuarantList = response.data.restaurants;

                if (restuarantList === undefined || restuarantList.length == 0){
                    console.log("No Restaurants were found in this city! :(, please make sure you entered the name correctly, or wrapped it in quotes (\" \")");
                }else{
                    // We have restuarants
                    // Next, create a better list to show the user
                    var restuarantChoices = [];

                    restuarantList.forEach(restuarantObj =>{
                        var restaurantChoice = {
                            name: restuarantObj.restaurant.name,
                            value: restuarantObj.restaurant
                        }

                        restuarantChoices.push(restaurantChoice);
                    })

                    return inquirer.prompt([{
                        type: 'list',
                        message: 'Select a Restaurant to learn more information:',
                        name: 'restaurant',
                        choices: restuarantChoices,
                        validate: () => {
                            return true
                        }
                    }])
                    .then(choice =>{
                        let restaurant = choice.restaurant;

                        displayRestaurantInformation(restaurant);

                        getRatingsAndReviews(restaurant);
                    });
                }
            })
    }else{
        console.log("ERROR! Please provide the name of a City");
    }
}

const displayRestaurantInformation = (restaurant) => {
    console.log(restaurant.name + "\n Address:" + restaurant.location.address + "\n Cuisine: " + restaurant.cuisines + "\n View the menu here: " + restaurant.menu_url);
}

const getRatingsAndReviews = (restaurant) => {
    return inquirer.prompt([{
        type: 'confirm',
        message: "Do you want rating/reviews for: " + restaurant.name,
        name: "wantsRatingsAndReviews",
    }])
    .then(answer => {
        let wantsRatingsAndReviews = answer.wantsRatingsAndReviews;

        if(wantsRatingsAndReviews){
            zomatoApi.getRestaurantReviewsAndRatings(restaurant.id)
            .then(response =>{
                let ratingsAndReviews = "";

                ratingsAndReviews += "\n\n" + restaurant.name + " - Ratings And Reviews \n"
                ratingsAndReviews += "Average User Rating: " + restaurant.user_rating.aggregate_rating + " - " + restaurant.user_rating.rating_text + "\n";
                ratingsAndReviews += "Based On " + restaurant.user_rating.votes + " Reviews";
                ratingsAndReviews += "\n-----------------------------------\n";

                let reviewResponse = response.data.user_reviews;

                let reviewList = reviewResponse.forEach(review =>{
                    review = review.review;
                    // console.log(review);
                    ratingsAndReviews += review.user.name + " Said: \n" + review.review_text + "\nRating: " + review.rating + " - " + review.rating_text;
                    ratingsAndReviews += "\n-----------------------------------\n";
                });

                console.log(ratingsAndReviews);
            })
        }else{
            console.log("Goodbye");
        }
    })
}

const findcitiestosearch = (cityname) => {
    if(cityname){
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
    }else{
        console.log("Please provide a city name!");
    }
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
                which has the same restaurant name
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

const getrestaurantrevs = () => {
    return inquirer.prompt([{
        type: 'input',
        message: "Enter the City that the Restaurant is Located in: ",
        name: "cityName",
    },{
      type: 'input',
      message: 'Enter Restaurant Name for Ratings and Reviews: ',
      name: "restaurantName",
  }])
  .then(params => {
      searchrestaurantreviews(params)
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
    getRestaurantsByCity,
    findcitiestosearch,
    searchrestaurantsincity,
    restauranttypebycity,
    getrestaurantbytype

}
