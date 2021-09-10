const Router = require('express')
const controller = require('../controls/treatment')
const router = new Router()

const { treatmentValidation } = require('../validations')
const authMiddleware = require('../../middleware/authMiddleware')

router.post('/create', [
    ...treatmentValidation,
], authMiddleware, controller.createTreatment)

router.delete('/:id', [
], controller.deleteTreatment)

router.get('/', authMiddleware, controller.getTreatments)

module.exports = router