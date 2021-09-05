const Router = require('express')
const controller = require('./authController')
const router = new Router()
const { check } = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/registration', [
    check('username', 'Имя пользователя должно содержать минимум 3 символа').isLength({ min: 3 }),
    check('password', 'Имя пользователя должно содержать от 3 до 10 символов').isLength({ min: 3, max: 10 })
], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['ADMIN', 'USER']), controller.getUsers)

module.exports = router