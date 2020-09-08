const drinskRouter = require('express').Router();
const controllerDrinks = require('../controllers/Drink_Controlller')();

drinskRouter.get('/Listar', controllerDrinks.listarDrinks);

module.exports = drinskRouter;