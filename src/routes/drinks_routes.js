const drinskRouter = require('express').Router();
const controllerDrinks = require('../controllers/Drink_Controlller')()
const authToken = require('../controllers/app_controller')()

drinskRouter.get('/Listar', authToken.authenticateToken, controllerDrinks.listarDrinks)

module.exports = drinskRouter;