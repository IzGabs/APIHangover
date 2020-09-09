const drinskRouter = require('express').Router();
const controllerDrinks = require('../controllers/Drink_Controlller')()
const authToken = require('../controllers/app_controller')()

drinskRouter.get('/Listar',
 //authToken.authenticateToken,
  controllerDrinks.listarDrinks)

drinskRouter.get('/Listar/:id', controllerDrinks.listarDrinksById);

drinskRouter.post('/adicionar', controllerDrinks.add);

drinskRouter.put('/update/:id', controllerDrinks.update);

drinskRouter.delete('/delete/:id', controllerDrinks.delete);

module.exports = drinskRouter;

/*

*/