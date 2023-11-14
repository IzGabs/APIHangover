const jwt = require('jsonwebtoken')

module.exports = () => {

    const controller = {}

    controller.auth = (req, res, next) => {
        try {

            const token = req.headers.authorization.split(' ')[1];
            console.log(token)
            const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decode;
            next();
        } catch (error) {
            return res.status(401).send({ mensagem: 'Falha na verificação' });
        }
    }

    controller.optional = (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decode;
            next();
        } catch (error) {
            next();
        }

    }

    return controller;
} 