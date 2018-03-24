const
    app = require('./app'),
    yargs = require('yargs')

const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'Find a restaurant based on a city.',
        builder: (yargs) => {
            return yargs.option('city', {
                alias: 'city',
                describe: 'The name of the city you want to search.'
            })
        },
        handler: (argv) => { app.getRestaurantsByCity(argv.city) }
    })
    .command({
        command: 'restaurants',
        desc: 'get restaurants by type in a specific city.',
        handler: (argv) => { app.getrestaurantbytype() }
    })
    .command({
      command: 'city',
      desc: 'search restaurants in a specific city.',
      builder: (yargs) => {
            return yargs.option('city', {
                    alias: 'city',
                    describe: 'city name for a specific restaurants (city --city London)'
            })
      },
      handler: (argv) => { app.searchrestaurantsincity(argv.city) }
    })
    .command({
        command: 'reviews',
        desc: 'get restaurants reviews',
        handler: (argv) => { app.getrestaurantrevs() }
    })


    .help('help')
    .argv
