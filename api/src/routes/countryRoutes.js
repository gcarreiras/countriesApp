const Router = require('express');
const {getCountry, getCountryById , getCountryByName} = require ('../controllers/countryControllers')

const router = Router()

router.get('/country' , getCountry)
router.get('/country/:id' , getCountryById)
router.get ('/countryName' , getCountryByName)

module.exports = router;