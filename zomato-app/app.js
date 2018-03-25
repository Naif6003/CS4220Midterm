const
    zomatoApi = require('zomatoApi'),
    inquirer = require('inquirer')

    
/*const categories = () => {
    zomatoApi.categories()
        .then(result => {
            console.log('-- Zomato App --')
                result.data.categories.forEach(elem => {
                        console.log(elem.categories.name)
                     })
        })
        .catch(err => console.log(err))
}*/
const displayCuisines = (result) => {
    //Launch the prompt interface 
    return inquirer.prompt([{
        type: 'checkbox',
        message: 'Filter restaurants by Cuisines ',
        name: 'restaurants',
        choices: result,        
        validate: (input) => {
             if (input.length == 0) {
                return 'select atlease one cuisine';
              }
              return true;
        }  
    }])
}

/*const displayTypes = (result) => {
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
}*/


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
          console.log("List of restaurants:")  
         result.data.restaurants.forEach(ele=>{
                console.log("    ",ele.restaurant.name);
         })
        })
        .catch(err => console.log(err))
}

/*const searchForTypes = (cityId,id) => {
    zomatoApi.searchForTypes(cityId,id)
        .then(result => {
         result.data.restaurants.forEach(ele=>{
             console.log(ele.restaurant.name);
         })
             
        })
        .catch(err => console.log(err))
}*/

const cuisines=(cityName)=>{
    if(cityName)
    {   //Get list of cities matching and select one
      zomatoApi.getcityidbyname(cityName)
        .then(result => {
                let cityList=[]; 
                result.data.location_suggestions.forEach(cityId => {
                     if(cityName===cityId.name.split(',')[0]) 
                               cityList.push(cityId.name);
                      })
                if (cityList === undefined || cityList.length == 0)
                {
                       console.log("No City found ");
                }
                else
                {
                    //Display list of cities
                     findcitiestosearch(cityList)     
                          .then(resultvalue=>{
                               let id;
                               let selectedcityname;     
                                result.data.location_suggestions.forEach(cityId =>   {
                                if(cityName === cityId.name)
                                      id=cityId.id;
                                      selectedcityname=cityId.name
                                   
                                 })
                                //get list of cuisines for the city selected
                                zomatoApi.cuisines(id)
                                    .then(result => {
                                        let ListOfCuisines=[];
                                              result.data.cuisines.forEach(elem => {
                                              var cuisine={
                                                name: elem.cuisine.cuisine_name,
                                                value: elem.cuisine.cuisine_id
                                            } 
                                            ListOfCuisines.push(cuisine);
                                        
                                        })
                                       //display cuisines     
                                        displayCuisines(ListOfCuisines)
                                            .then(input => {
                                                let commaseperatedValue=input.restaurants.join(", ")
                                                searchForCuisine(id,commaseperatedValue);
                                             })
                        .catch(err => console.log(err))
                    
            })   
            .catch(err => console.log(err))
         }) 
          .catch(err => console.log(err))
        }
})
 .catch(err => console.log(err))
}
else{
    console.log("ERROR! Please provide the name of a City");
}

}
/*const establishments=(cityId)=>{
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
*/



module.exports = {
    
     cuisines

}  
