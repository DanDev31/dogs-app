const { Router } = require('express');
const { Breed } = require('../db')
const { Temperament } = require('../db')
const router = Router();



router.get('/', async (req, res) => {

    const { name } = req.query

    try { 
        if(name){
            const getBreedByQuery = await Breed.findOne({
                where:{
                    name
                }
            })
            if(getBreedByQuery){
                res.json(getBreedByQuery)
            }else{
                res.status(404).json({message: `No se encontraron resultados para ${name}`})
            }
        } else {
            const allBreeds = await Breed.findAll()
            res.status(200).json(allBreeds)
        }  
    } catch (error) {
            res.status(404).json({message: 'Informacion no encontrada'})
    }

})


router.get('/:id', async (req, res) => {

    const { id } = req.params
    console.log(id)
    try { 
        await Breed.destroy({
            where:{
                id
            }
        })

        const getBreedById = await Breed.findByPk(id)
        res.json(getBreedById)
    } catch (error) {
        res.json({message: error.message})
    }

})



router.post('/', async (req, res) => {
    
    const { name, height, weight, life_span, image, temperament }  = req.body
    
    try {
        const newBreed = await Breed.create({
            name, 
            height, 
            weight,
            life_span,
            image,
            temperament
        })

        if(temperament){
            const tempsToArray = temperament.split(',')
            tempsToArray.forEach( async(temp) => {
                const index = await Temperament.findOne({
                    where:{
                        name: temp.trim()
                    }
                   })
                await newBreed.addTemperaments(index)
            })
        }
        res.status(200).json(newBreed)
    } catch (error) {
        res.status(404).json({message: 'Something went wrong'})
    }
})


module.exports = router