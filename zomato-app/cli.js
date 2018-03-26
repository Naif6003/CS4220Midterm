const
    app = require('./app'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
.command({
    command: 'searchsuggestions',
    desc: 'find the city you want to search for.',
    builder: (yargs) => {
          return yargs.option('city', {
                alias: 'c',
                describe: 'Choose the city to find all the restaurants in it.'
          })
    },
    handler: (argv) => { app.findcitiestosearch(argv.city) }
})
    .command({
        command: 'restaurants',
        desc: 'get restaurants by type in a specific city.',
        handler: (argv) => { app.getrestaurantbytype() }
    })
    .command({
        command: 'details',
        desc: 'List restaurant details. Example: cli.js details --city Los Angeles',
        builder: (yargs) => {
            return yargs.option('city', {
                alias: 'c',
                describe: 'The name of the city the restaurant is located in'
            })
        },
        handler: (argv) => { app.getRestaurantsByCity(argv.city) }
    })
    .command({
      command: 'city',
      desc: 'search restaurants in a specific city.',
      builder: (yargs) => {
            return yargs.option('city', {
                    alias: 'c',
                    describe: 'city name for a specific restaurants (city --city "London")'
            })
      },
      handler: (argv) => { app.searchrestaurantsincity(argv.city) }
    })
	.command({
        command: 'all',
        desc: 'find the city you want to search for.',
        builder: (yargs) => {
              return yargs.option('city', {
                    alias: 'c',
                    describe: 'Choose the city to find all the restaurants in it.'
              })
        },
        handler: (argv) => { app.findcitiestosearchExt(argv.city) }
    })
    .command({
        command: 'gettopcuisines',
        desc: 'find the city you want to search for.',
        builder: (yargs) => {
              return yargs.option('city', {
                    alias: 'c',
                    describe: 'Get the list of Top Cuisines in the city.'
              })
        },
        handler: (argv) => { app.getTopCuisines(argv.city) }
    })
    .command({
        command: 'search',
        desc: 'Search City and Restaurants with City Id',
        builder: (yargs) => {
             return yargs.option('id', {
                    alias: 'id',
                    describe: 'Gives back the whole City Object'
            })
        },
        handler: (argv) => { app.search(argv.id) }
    })
    .help('help')
    .argv
