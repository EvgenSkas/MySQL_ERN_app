const express = require('express')
const path = require('path')

const PORT = 5000

const app = express()
app.use(express.json())

const bricks = [
    { id: 1, text: 'Thies is the first message' },
    { id: 2, text: 'Thies is the second message' },
]
let id = 2

app.get('/api/bricks', (req, res) => {
    res.json(bricks)
})

app.post('/api/bricks', (req, res) => {
    const body = req.body
    const newBrick = {
        id: ++id,
        text: body.text
    }
    bricks.push(newBrick)
    res.json(newBrick)
})

app.use(express.static(path.join(__dirname, 'client', 'build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})