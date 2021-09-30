const db = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { secret } = require('../config')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, { expiresIn: '24h' })
}

class authController {
    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await db.user.findOne({ include: [db.role], where: { username } })
            if (!user) {
                return res.status(400).json({ message: `Пользователь ${username} не найден` })
            }
            const isValidPassword = bcrypt.compareSync(password, user.password)
            if (!isValidPassword) {
                return res.status(400).json({ message: `Введен неверный пароль` })
            }
            const token = generateAccessToken(user.id, user.roles)
            return res.json({ token })
        } catch (error) {
            res.status(400).json({ message: 'Login error' })
        }
    }

    async getUsers(req, res) {
        try {
            const allUsers = await db.user.findAll({ include: [{ model: db.role }], })
            // include: [{ model: db.Role, where: { value: "USER" } }],
            res.send(allUsers)
        } catch (error) {
            console.log(error)
        }
    }

    async getUser(req, res) {
        try {
            console.log('!!!req', req.user)
            const user = await db.user.findOne({
                where: { id: req.user.id },
                include: [{
                    model: db.role,
                    through: {
                        attributes: []
                    }
                }],
                attributes: { exclude: ['password'] }
            })
            // include: [{ model: db.Role, where: { value: "USER" } }],
            res.send(user)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new authController()
