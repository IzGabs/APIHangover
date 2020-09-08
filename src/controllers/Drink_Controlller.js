module.exports = () => {

    const controller = {}

    const drinksData = require('../data/drinks.json')
    const drinks = drinksData;

    controller.listarDrinks = (req, res) => { res.status(200).json(drinks) }

    return controller;
}