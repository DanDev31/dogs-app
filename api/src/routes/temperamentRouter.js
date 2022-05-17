const { Router } = require('express');
const router = Router();

const { Temperament } = require('../db')


router.get('/', async (req, res) => {

   try {
       const allTemps = await Temperament.findAll()

        if(allTemps.length > 0 && allTemps !== null){
            res.status(200).json(allTemps)
        }else{
            res.status(404).json({message: "Data no encontrada"})
        }
   } catch (error) {
        res.status(400).json({message: "Hubo un error al cargar la data"})
   }
    
})


module.exports = router