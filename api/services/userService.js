const bcrypt = require('bcryptjs')

const db = require('../../models')

function UserException(message) {
    this.message = message;
    this.name = "Исключение, определённое пользователем";
}

const createUser = async (body, roleValue) => {
    try {
        const {
            username,
            password,
            email,
        } = body

        const candidate = await db.user.findOne({ where: { username } })
        if (candidate) {
            throw new UserException("Пользователь с таким именем уже существует");
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const userRole = await db.role.findOne({ value: roleValue })
        const user = await db.user.create({
            username,
            password: hashPassword,
            email,
        })

        user.addRole(userRole)
        return user

    } catch (e) {
        console.log('!!!!!!!!!!!e', e)
        return e;
    }
}

module.exports = {
    createUser,
}