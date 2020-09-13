const drinskRouter = require('express').Router();
const controllerDrinks = require('../controllers/Drink_Controlller')()


drinskRouter.get('/Listar', controllerDrinks.listarDrinks)

drinskRouter.get('/searchDrink/:id', controllerDrinks.searchbyId);

drinskRouter.post('/adicionar', controllerDrinks.add);

drinskRouter.put('/update/:id', controllerDrinks.update);

drinskRouter.delete('/delete/:id', controllerDrinks.delete);

module.exports = drinskRouter;

/*

*/