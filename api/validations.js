const { check } = require('express-validator')

const userValidation = [
    check('username', 'Имя пользователя должно содержать минимум 3 символа').isLength({ min: 3 }),
    check('password', 'Имя пользователя должно содержать от 3 до 10 символов').isLength({ min: 3, max: 10 }),
    check('email', 'Введен неверный адрес электронной почты!').isEmail(),
]

const doctorValidation = [
    check('lastname', 'Фамилия не введена!').not().isEmpty(),
    check('firstname', 'Имя не введено!').not().isEmpty(),
    check('phone', 'Tелефон не введен!').not().isEmpty(),
    check('position', 'Должность не указана').not().isEmpty()
]

const patientValidation = [
    check('lastname', 'Фамилия не введена!').not().isEmpty(),
    check('firstname', 'Имя не введено!').not().isEmpty(),
    check('phone', 'Tелефон не введен!').not().isEmpty(),
    check('age', 'Возраст не указан').not().isEmpty()
]

module.exports = {
    doctorValidation,
    userValidation,
    patientValidation
}