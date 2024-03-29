require('dotenv/config')

module.exports = () => {

    const controller = {}
    const jwt = require('jsonwebtoken')
    
    controller.authenticateToken = (req, res, next) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.status(401).send('Sem autorização')

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })
    }


    return controller;
} 