require('dotenv').config()
const express = require('express')
const path = require('path')
const db = require('./models')
const authRouter = require('./api/authRouter')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use("/auth", authRouter)



// const Bricks = db.bricks

// app.get('/api/bricks', async (req, res) => {
//     const bricks = await Bricks.findAll()
//     res.json(bricks)
// })

// app.post('/api/bricks', (req, res) => {
//     const { body: { message } } = req
//     Bricks.create({
//         message: message
//     }).then(result => {
//         res.json(result)
//     }).catch(err => {
//         res.end('error')
//     })

// })

app.use(express.static(path.join(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`)
    })
})