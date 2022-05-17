const axios = require('axios')


const getTemperaments = async () => {

    let temperaments = []

        const request = await axios.get('https://api.thedogapi.com/v1/breeds')
        const dataFetched = await request.data

        dataFetched.map(el => {
            if(el.temperament !== undefined){
            return el.temperament.split(' ')
            }
        }
    ).flat().forEach( e => {
      
        if(e !== undefined){
            if(e.includes(',')){
            var newE = e.replace(',', '')
              if(!temperaments.includes(newE)){
                  temperaments.push(newE) 
              }
            }
        }
      })

    return temperaments
}


module.exports = getTemperaments




    