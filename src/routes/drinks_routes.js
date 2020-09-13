const drinskRouter = require('express').Router();
const controllerDrinks = require('../controllers/Drink_Controlller')()
const authToken = require('../controllers/app_controller')()

drinskRouter.get('/Listar', 
//authToken.authenticateToken, 
controllerDrinks.listarDrinks)

drinskRouter.get('/Listar/:id', 
//authToken.authenticateToken, 
controllerDrinks.listarDrinksById);

drinskRouter.post('/adicionar', 
//authToken.authenticateToken, 
controllerDrinks.add);

drinskRouter.put('/update/:id',  
//authToken.authenticateToken, 
controllerDrinks.update);

drinskRouter.delete('/delete/:id', 
//authToken.authenticateToken,
controllerDrinks.delete);

module.exports = drinskRouter;
