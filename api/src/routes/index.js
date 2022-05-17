const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const breedRouter = require('./breedRouter')
const temperamentRouter = require('./temperamentRouter')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', breedRouter)
router.use('/temperament', temperamentRouter)

module.exports = router;
