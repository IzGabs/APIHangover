const configRoutes = require('express').Router();
const loginController = require('../controllers/access_controller')()

configRoutes.post('/login', loginController.auth)

module.exports = configRoutes;