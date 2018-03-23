const
    app = require('./app'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    // .command({
    //     command: 'categories',
    //     desc: 'Get all the categories in Zomato API ',
    //     handler: (argv) => { app.categories() }
    // })
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
    .help('help')
    .argv
