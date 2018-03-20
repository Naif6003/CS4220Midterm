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



module.exports = {
    categories
}
