const 
    http = require('http'),
    axios = require('axios')

const key = '96b7802e7ab814942f3f0a68fb3bab73'

  axios.get('https://developers.zomato.com/api/v2.1/categories', {
    headers: {
      Accept: 'application/json',
      'user-key': key
    }
  })
  .then(function(response){
    response.data.forEach(elem => {
      console.log(elem.name)
    })
  })
  .catch(function(err){
    alert(err)
  })
