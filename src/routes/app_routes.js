const configRoutes = require('express').Router();
const loginController = require('../controllers/login_controller')()

configRoutes.post('/login', loginController.auth)

module.exports = configRoutes;