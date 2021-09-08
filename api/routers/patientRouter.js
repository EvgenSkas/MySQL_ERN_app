const Router = require('express')
const controller = require('../controls/patient')
const router = new Router()

const { userValidation, patientValidation } = require('../validations')

router.post('/create', [
    ...userValidation,
    ...patientValidation
], controller.createPatient)

router.get('/', controller.getPatients)

module.exports = router