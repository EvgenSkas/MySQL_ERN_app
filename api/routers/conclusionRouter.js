const Router = require('express')
const controller = require('../controls/conclusion')
const router = new Router()

const { conclusionValidation } = require('../validations')
const authMiddleware = require('../../middleware/authMiddleware')

router.post('/create',
    [
        ...conclusionValidation,
    ],
    authMiddleware,
    controller.createConclusion
)

// router.delete('/:id', [
// ], controller.deleteTreatment)

// router.get('/', authMiddleware, controller.getTreatments)

module.exports = router