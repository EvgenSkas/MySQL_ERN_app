const { validationResult } = require('express-validator')

const db = require('../../models')
const { createUser } = require('../services/userService')

class patientController {
    async createPatient(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors })
            }
            const user = await createUser(req.body, 'Patient')
            const {
                firstname,
                lastname,
                phone,
                age,
            } = req.body

            const patient = await db.patient.create({
                firstname,
                lastname,
                phone,
                age,
                userId: user.id
            })
            return res.json(patient)
        } catch (error) {
            console.log('e', error)
            res.status(400).json({ message: 'Registration error', error })
        }
    }

    async getPatients(req, res) {
        try {
            const allPatients = await db.patient.findAll({
                include: [
                    {
                        model: db.user,
                        attributes: { exclude: ['password'] },
                        include: [{
                            model: db.role,
                            attributes: ['value'],
                        }],
                    }],
                attributes: { exclude: ['userId'] },
            })
            res.send(allPatients)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new patientController()
