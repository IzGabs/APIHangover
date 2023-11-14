const restaurantRouter = require('express').Router();
const controllerRestaurant = require('../controllers/restaurant_controller')()

//Create
restaurantRouter.post('/cadastrar', controllerRestaurant.cadastrar)

//Read
restaurantRouter.get('/listar', controllerRestaurant.listar)

//Update
restaurantRouter.put('/alterarNmroFuncionarios/:id', controllerRestaurant.update)

//Delete
restaurantRouter.delete('/deletar/:id', controllerRestaurant.delete)

module.exports = restaurantRouter;