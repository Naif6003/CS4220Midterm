// const
//     http = require('http'),
//     axios = require('axios')
//
// const key = '96b7802e7ab814942f3f0a68fb3bab73'
//
//   axios.get('https://developers.zomato.com/api/v2.1/categories', {
//     headers: {
//       Accept: 'application/json',
//       'user-key': key
//     }
//   })
//   .then(function(response){
//     response.data.categories.forEach(elem => {
//         console.log(elem.categories.name)
//     })
//   })
//   .catch(function(err){
//     alert(err)
//   })


const
    zomatoApi = require('zomatoApi'),
    inquirer = require('inquirer')

    
const categories = () => {
    zomatoApi.categories()
        .then(result => {
            console.log('-- Zomato App --')
                result.data.categories.forEach(elem => {
                        console.log(elem.categories.name)
                     })
        })
        .catch(err => console.log(err))
}
const displayCuisines = (result) => {
    return inquirer.prompt([{
        type: 'checkbox',
        message: 'select Cuisines to Display the restaurants',
        name: 'restaurants',
        choices: result,        
        validate: (input) => {
             if (input.length == 0) {
                return 'all';
              }
              return true;
        }  
    }])
}

const displayTypes = (result) => {
    return inquirer.prompt([{
        type: 'list',
        message: 'select Types of Restaurant to Display the restaurants',
        name: 'Typerestaurants',
        choices: result,        
        validate: (input) => {
            
              if (input.length == 0) {
                return 'all';
              }
              return true;
        }  
    }])
}


const findcitiestosearch = (cityList) => {
         return inquirer.prompt([{
                    type: 'list',
                    message: 'select the city you want',
                    name: 'citysuggestions',
                    choices: cityList,
                    validate: () => {
                        return true
                    }
                }])

        }

const searchForCuisine = (cityId,result) => {
    zomatoApi.searchForCuisine(cityId,result)
        .then(result => {
            console.log("List of restaurants")
         result.data.restaurants.forEach(ele=>{
             console.log(ele.restaurant.name);
         })
             
        })
        .catch(err => console.log(err))
}

const searchForTypes = (cityId,id) => {
    zomatoApi.searchForTypes(cityId,id)
        .then(result => {
         result.data.restaurants.forEach(ele=>{
             console.log(ele.restaurant.name);
         })
             
        })
        .catch(err => console.log(err))
}

const cuisines=(cityName)=>{
    //Get list of cities matching and select one
    zomatoApi.getcityidbyname(cityName)
             .then(result => {
                let cityList=[]; 
                result.data.location_suggestions.forEach(cityId => {
                     if(cityName === cityId.name.split(',')[0])
                     {
                        cityList.push(cityId.name);
                     }   
                    })
                    
                    //Display list of clities
                     findcitiestosearch(cityList)     
                          .then(resultvalue=>{
                              let id;     
                                result.data.location_suggestions.forEach(cityId =>   {
                                if(cityName === cityId.name)
                                      id=cityId.id;
                                 })
                    
                                 //get list of cuisines for the city selected
                                zomatoApi.cuisines(id)
                                    .then(result => {
                                        let ListOfCuisines=[];
                                        result.data.cuisines.forEach(elem => {
                                            ListOfCuisines.push(elem.cuisine.cuisine_name);
                                             })
                    
                                       //display cuisines     
                                        displayCuisines(ListOfCuisines)
                                            .then(input => {
                                                let ListOfCuisineId=[];
                                                
                                                result.data.cuisines.forEach(elem => {
                                                    input.restaurants.forEach(v=>{ 
                                                    if(elem.cuisine.cuisine_name===v)
                                                        ListOfCuisineId.push(elem.cuisine.cuisine_id)
                                                    })          
                                                })
                                                
                                                let commaseperatedValue=ListOfCuisineId.join(", ")
                                                //display list of cuisines
                                                searchForCuisine(id,commaseperatedValue);
                        
                            })
                        .catch(err => console.log(err))
                    
            })   
            .catch(err => console.log(err))
         }) 
         .catch(err => console.log(err))

})
        .catch(err => console.log(err))
}


const establishments=(cityId)=>{
    zomatoApi.establishments(cityId)
        .then (result => {
            
            let ListOfTypes=[];
                result.data.establishments.forEach(elem => {
                    
                    ListOfTypes.push(elem.establishment.name);
                     })
                     
                     displayTypes(ListOfTypes)
                      .then(inputt => {
                             let typeid;
                             
                            result.data.establishments.forEach(elem => {
                            
                                if(elem.establishment.name===inputt.Typerestaurants)
                                    typeid=elem.establishment.id;
                                })          
                            
                            
                            searchForTypes(cityId,typeid);
                        
                        })
                        .catch(err => console.log(err))
                    
})    
        .catch(err => console.log(err))
}




module.exports = {
    
    categories, cuisines, establishments

}  
