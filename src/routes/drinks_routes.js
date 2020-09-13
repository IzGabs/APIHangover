const drinskRouter = require('express').Router();
const controllerDrinks = require('../controllers/Drink_Controlller')()


drinskRouter.get('/Listar', controllerDrinks.listarDrinks)

drinskRouter.get('/searchDrink/:id', controllerDrinks.searchbyId);

drinskRouter.post('/adicionar', 
//authToken.authenticateToken, 
controllerDrinks.add);

drinskRouter.put('/update/:id',  
//authToken.authenticateToken, 
controllerDrinks.update);

drinskRouter.delete('/delete/:id', 
//authToken.authenticateToken,
controllerDrinks.delete);

drinskRouter.get('/calculoSoma', 
//authToken.authenticateToken,
controllerDrinks.calculoSoma);

drinskRouter.get('/calculoMap', 
//authToken.authenticateToken,
controllerDrinks.calculoMap);



module.exports = drinskRouter;
