const db = require('../../models')

const updateTreatment = async (body) => {
    try {
        const treatment = await db.treatment.findOne({ where: { id: body.id } })

        treatment.name = body.name
        treatment.complaints = body.complaints
        treatment.illnessDate = body.illnessDate
        treatment.skin = body.skin
        treatment.pharyngealWall = body.pharyngealWall
        treatment.tonsils = body.tonsils
        treatment.temperature = body.temperature
        treatment.cough = body.cough
        treatment.headache = body.headache
        treatment.weakness = body.weakness
        treatment.heartRate = body.heartRate
        treatment.heartRate = body.soreThroat

        const updatedTreatment = await treatment.save()
        return updatedTreatment

    } catch (e) {
        console.log('e', e)
        return e;
    }
}

module.exports = {
    updateTreatment,
}