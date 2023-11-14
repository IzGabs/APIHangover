const foodRouter = require('express').Router();
const controllerFoods = require('../controllers/foods_controller')()

//Create
foodRouter.post('/cadastrar', controllerFoods.cadastrar)

//Read
foodRouter.get('/listar', controllerFoods.listar)

//Update
foodRouter.put('/alterarValor/:id', controllerFoods.update)

//Delete
foodRouter.delete('/deletar/:id', controllerFoods.delete)

module.exports = foodRouter;