const { validationResult } = require('express-validator')

const db = require('../../models')
const { createUser } = require('../services/userService')

class doctorController {
    async createDoctor(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors })
            }
            const user = await createUser(req.body, 'Doctor')
            const {
                firstname,
                lastname,
                phone,
                position: positionId,
            } = req.body

            const doctor = await db.doctor.create({
                firstname,
                lastname,
                phone,
                positionId,
                userId: user.id
            })
            return res.json(doctor)
        } catch (error) {
            console.log('!!!!!!!!!error', error)
            res.status(400).json({ message: 'Registration error', error })
        }
    }

    async getDoctors(req, res) {
        try {
            const allDoctors = await db.doctor.findAll({
                include: [
                    {
                        model: db.position,
                        attributes: { exclude: ['userId'] },
                    },
                    {
                        model: db.user,
                        attributes: { exclude: ['password'] },
                        include: [{
                            model: db.role,
                            attributes: ['value'],
                        }],
                    }],
                attributes: { exclude: ['positionId', 'userId'] },
            })
            res.send(allDoctors)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new doctorController()
