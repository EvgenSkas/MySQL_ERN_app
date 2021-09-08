const Router = require('express')
const controller = require('../controls/doctor')
const router = new Router()

const { userValidation, doctorValidation } = require('../validations')

router.post('/create', [
    ...userValidation,
    ...doctorValidation
], controller.createDoctor)

router.get('/', controller.getDoctors)

module.exports = router