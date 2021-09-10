const { validationResult } = require('express-validator')

const db = require('../../models')
// const { createUser } = require('../services/userService')

class treatmentController {
    async createTreatment(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при создании обращения", errors })
            }
            const { statusId, patientId, ...values } = req.body

            const status = await db.status.findOne({
                where: { value: 'Открыто' },
            })

            const patient = await db.patient.findOne({ where: { userId: req.user.id } })

            const treatment = await db.treatment.create({
                ...values,
                statusId: status.id,
                patientId: patient.id
            })

            return res.json(treatment)
        } catch (error) {
            res.status(400).json({ message: 'Create treatment error', error })
        }
    }
    async deleteTreatment(req, res) {
        try {
            const deletedTreatment = await db.treatment.findOne({ where: { id: req.params.id } })
            if (!deletedTreatment) {
                return res.status(400).json({ message: "Такой обращение не найдено", errors })
            }
            const response = await deletedTreatment.destroy()
            return res.json(response.id)
        } catch (error) {
            res.status(400).json({ message: 'Delete treatment error', error })
        }
    }

    async getTreatments(req, res) {
        try {
            const isPatient = req.user.roles.map(({ value }) => value).includes('Patient')
            let allTreatments;
            const config = {
                include: [
                    {
                        model: db.status,
                    },
                    {
                        model: db.patient,
                    },
                    {
                        model: db.conclusion,
                    }
                ],
                attributes: { exclude: ['statusId', 'patientId'] },
            }
            if (isPatient) {
                const currentPatient = await db.patient.findOne({ where: { userId: req.user.id } })
                allTreatments = await db.treatment.findAll({
                    where: { patientId: currentPatient.id },
                    ...config,
                })
            } else {
                allTreatments = await db.treatment.findAll({ ...config })
            }
            res.send(allTreatments)
        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'GetTreatments error', error })
        }
    }
}

module.exports = new treatmentController()
