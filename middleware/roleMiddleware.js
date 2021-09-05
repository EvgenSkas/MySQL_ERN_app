const jwt = require('jsonwebtoken')

const { secret } = require('../api/config')

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({ message: 'Недостаточно прав' })
            }
            const data = jwt.verify(token, secret)
            const { roles: userRoles } = data
            if (!userRoles.length) {
                return res.status(403).json({ message: 'Недостаточно прав' })
            }
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role.value)) {
                    console.log('includes', roles)
                    hasRole = true
                }
            });
            if (!hasRole) {
                return res.status(403).json({ message: 'Недостаточно прав' })
            }

            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({ message: 'Недостаточно прав' })

        }
    }
}