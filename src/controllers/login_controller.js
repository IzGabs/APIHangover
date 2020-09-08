require('dotenv/config')

module.exports = () => {

    const controller = {}
    const users = require('../data/users.json')
    const jwt = require('jsonwebtoken')
    const authToken = require('./app_controller')()

    controller.auth = (req, res) => {
        if (req.body.user != null && req.body.password != null) {
            const loggingUser = users.find(user => user.user == req.body.user)

            if (loggingUser != undefined && loggingUser.password == req.body.password) {
                const accessToken = jwt.sign({ name: loggingUser.user }, process.env.ACCESS_TOKEN_SECRET)
                res.send({ response: "Login realizado com sucesso", accessToken: accessToken })

            } else res.send('Usuario ou senha incorretos')
        } else res.send('Os campos usuario e senha não podem estar vazios')
    }

    return controller;
} 