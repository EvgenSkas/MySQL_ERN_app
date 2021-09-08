const Router = require('express')
const controller = require('../controls/auth')
const router = new Router()

// const { userValidation, doctorValidation } = require('./validations')
const authMiddleware = require('../../middleware/authMiddleware')
const roleMiddleware = require('../../middleware/roleMiddleware')

router.post('/login', controller.login)
router.get('/users', roleMiddleware(['Admin']), controller.getUsers)
router.get('/user', authMiddleware, controller.getUser)

module.exports = router