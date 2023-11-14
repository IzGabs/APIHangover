const drinskRouter = require('express').Router();
const userDrinks = require('../controllers/user_controller')()

drinskRouter.post('/createUser', userDrinks.createUser);
drinskRouter.post('/login', userDrinks.Login)
drinskRouter.post('/listaruser', userDrinks.listarUsuario)

module.exports = drinskRouter;