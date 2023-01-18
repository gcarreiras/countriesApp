const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const country = require('../routes/countryRoutes');
const activity = require('../routes/activityRoutes');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use ('/' , country)
router.use('/activity' , activity)

module.exports = router;
