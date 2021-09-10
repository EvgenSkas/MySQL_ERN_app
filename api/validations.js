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

const treatmentValidation = [
    check('name', 'Treatment Name не введен!').not().isEmpty(),
    check('complaints', 'complaints не введены!').not().isEmpty(),
    check('illnessDate', 'illnessDate не введено!').not().isEmpty(),
    check('skin', 'skin не введен!').not().isEmpty(),
    check('tonsils', 'tonsils не указан').not().isEmpty(),
    check('temperature', 'temperature не указан').not().isEmpty(),
    check('heartRate', 'heartRate не указан').not().isEmpty(),
    check('cough', 'cough не указан').not().isEmpty(),
    check('headache', 'headache не указан').not().isEmpty(),
    check('weakness', 'weakness не указан').not().isEmpty(),
    check('soreThroat', 'soreThroat не указан').not().isEmpty(),
]

const conclusionValidation = [
    check('description', 'description не введен!').not().isEmpty(),
    check('recommendation', 'recommendation не введено!').not().isEmpty(),
    check('treatmentId', 'treatmentId не введено!').not().isEmpty(),
]

module.exports = {
    doctorValidation,
    userValidation,
    patientValidation,
    treatmentValidation,
    conclusionValidation
}