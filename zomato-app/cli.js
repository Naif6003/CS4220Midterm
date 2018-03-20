const
    app = require('./app'),
    yargs = require('yargs')


const flags = yargs.usage('$0: Usage <cmd> [options]')
    .command({
        command: 'categories',
        desc: 'get all the categories in the API',
        handler: (argv) => { app.categories() }
    })
    .help('help')
    .argv
