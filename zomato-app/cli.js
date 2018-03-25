const
    app = require('./app'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'categories',
        desc: 'get all the categories in the API',
        handler: (argv) => { app.categories() }
    })
    .command({
        command: 'restaurants',
        desc: 'get restaurants by type in a specific city.',
        handler: (argv) => { app.getrestaurantbytype() }
    })
    /*.command({
        command: 'details',
        desc: 'List restaurant details. Example: cli.js details --city Los Angeles',
        builder: (yargs) => {
            return yargs.option('city', {
                alias: 'city',
                describe: 'The name of the city the restaurant is located in'
            })
        },
        handler: (argv) => { app.getRestaurantsByCity(argv.city) }
    })
    .command({
      command: 'city',
      desc: 'search restaurants in a specific  city.',
      builder: (yargs) => {
            return yargs.option('city', {
                    alias: 'city',
                    describe: 'city name for a specific restaurants (city --city "London")'
            })
      },
      handler: (argv) => { app.searchrestaurantsincity(argv.city) }
    })
*/
    .command({
        command: 'cuisines',
        desc: 'get all the cuisines for the city',
        builder: (yargs) => {
            return yargs.option('city', {
                    alias: 'city',
                    describe: 'city name for a specific restaurants (city --city "London")'
            })
        },
        handler: (argv) => { app.cuisines(argv.city) }
     })

    .help('help')
    .argv