const Router = require('express');
const { createActivity , getActivitys } = require ('../controllers/activityControllers')

const router = Router()

router.post('/', createActivity)
router.get('/' , getActivitys)

module.exports = router;