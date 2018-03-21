const
    zomatoApi = require('zomatoApi'),
    inquirer = require('inquirer')

const categories = () => {
    zomatoApi.categories()
        .then(result => {
          return inquirer.prompt([{
                type: 'checkbox',
                message: 'select a Category: ',
                name: 'Categories',
                choices: () => {
                let obj = []
                    result.data.categories.forEach(category => {
                        obj.push({
                            name: category.categories.name,
                            checked: false
                        })
                     })
                     return obj
                            },
                validate: function(result) {
                    return true;
                  }
                }])
              .then(answers => {
                  // call the function for the categories using:
                  // result, JSON.parse(JSON.stringify(answers))
              })
        })
        .catch(err => console.log(err))
}

const searchrestaurants = (cityname) => {
    zomatoApi.getcityidbyname(cityname)
        .then(result => {
            /* location_suggestions will bring all names around the world
                which has the same (cityname) in it
            */
            result.data.location_suggestions.forEach(cityId => {
                if(cityname === cityId.name){
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

module.exports = {
    categories,
    searchrestaurants
}
