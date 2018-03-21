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
      command: 'city',
      desc: 'search restaurants in a specific city.',
      builder: (yargs) => {
            return yargs.option('city', {
                    alias: 'city',
                    describe: 'city name for a specific restaurants (city --city London)'
            })
      },
      handler: (argv) => { app.searchrestaurants(argv.city) }
    })
    .help('help')
    .argv
