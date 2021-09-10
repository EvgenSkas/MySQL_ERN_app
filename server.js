require('dotenv').config()
const express = require('express')
const path = require('path')
const db = require('./models')
const authRouter = require('./api/routers/authRouter')
const doctorRouter = require('./api/routers/doctorRouter')
const patientRouter = require('./api/routers/patientRouter')
const treatmentRouter = require('./api/routers/treatmentRouter')
const conclusionRouter = require('./api/routers/conclusionRouter')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())

app.use("/auth", authRouter)
app.use("/doctors", doctorRouter)
app.use("/patients", patientRouter)
app.use("/treatments", treatmentRouter)
app.use("/conclusions", conclusionRouter)

app.use(express.static(path.join(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

db.sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`)
    })
})