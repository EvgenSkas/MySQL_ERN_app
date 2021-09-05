const db = require('../models')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

const { secret } = require('./config')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, { expiresIn: '24h' })
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors })
            }
            const { username, password } = req.body
            const candidate = await db.User.findOne({ where: { username } })
            if (candidate) {
                return res.status(400).json({ message: "Пользователь с таким именем уже существует" })
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await db.Role.findOne({ value: 'ADMIN' })
            const user = await db.User.create({ username, password: hashPassword })
            await user.addRole(userRole)
            return res.json({ message: 'Пользователь успешно зарегистрирован' })
        } catch (error) {
            res.status(400).json({ message: 'Registration error' })
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await db.User.findOne({ include: [db.Role], where: { username } })
            if (!user) {
                return res.status(400).json({ message: `Пользователь ${username} не найден` })
            }
            const isValidPassword = bcrypt.compareSync(password, user.password)
            if (!isValidPassword) {
                return res.status(400).json({ message: `Введен неверный пароль` })
            }
            const token = generateAccessToken(user._id, user.Roles)
            return res.json({ token })
        } catch (error) {
            res.status(400).json({ message: 'Login error' })
        }
    }

    async getUsers(req, res) {
        try {
            const allUsers = await db.User.findAll({ include: [{ model: db.Role }], })
            // include: [{ model: db.Role, where: { value: "USER" } }],
            res.send(allUsers)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new authController()
