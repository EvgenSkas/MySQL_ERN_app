const { validationResult } = require('express-validator')

const db = require('../../models')
// const { createUser } = require('../services/userService')

class treatmentController {
    async createConclusion(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при создании заключения", errors })
            }
            const { ...values } = req.body

            const doctor = await db.doctor.findOne({ where: { userId: req.user.id } })
            const conclusion = await db.conclusion.create({
                ...values,
                doctorId: doctor.id
            })
            console.log('###doctor', doctor.id, conclusion)

            return res.json(conclusion)
        } catch (error) {
            console.log('!!!!!!!!', error)
            res.status(400).json({ message: 'Create conclusion error', error })
        }
    }

    // async deleteTreatment(req, res) {
    //     try {
    //         const deletedTreatment = await db.treatment.findOne({ where: { id: req.params.id } })
    //         if (!deletedTreatment) {
    //             return res.status(400).json({ message: "Такой обращение не найдено", errors })
    //         }
    //         const response = await deletedTreatment.destroy()
    //         return res.json(response.id)
    //     } catch (error) {
    //         res.status(400).json({ message: 'Delete treatment error', error })
    //     }
    // }

    // async getTreatments(req, res) {
    //     console.log('###req',)
    //     try {
    //         const isPatient = req.user.roles.map(({ value }) => value).includes('Patient')
    //         let allTreatments;
    //         const config = {
    //             include: [
    //                 {
    //                     model: db.status,
    //                 },
    //                 {
    //                     model: db.patient,
    //                 }
    //             ],
    //             attributes: { exclude: ['statusId', 'patientId'] },
    //         }
    //         if (isPatient) {
    //             const currentPatient = await db.patient.findOne({ where: { userId: req.user.id } })
    //             allTreatments = await db.treatment.findAll({
    //                 where: { patientId: currentPatient.id },
    //                 ...config,
    //             })
    //         } else {
    //             allTreatments = await db.treatment.findAll({ ...config })
    //         }
    //         res.send(allTreatments)
    //     } catch (error) {
    //         console.log(error)
    //         res.status(400).json({ message: 'GetTreatments error', error })
    //     }
    // }
}

module.exports = new treatmentController()
