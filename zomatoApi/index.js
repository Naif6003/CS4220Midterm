const
     config = require('./config'),
     axios = require('axios')


const _fetch = (command) => {
    return axios.get(`${config.url}/${command}`, {
        headers: {
            Accept: 'application/json',
            'user-key': '96b7802e7ab814942f3f0a68fb3bab73'
        }
    })
        .then(response => response)
        .catch(error => error.response.body)
}

exports.categories = () => {
        return _fetch('categories')
}
