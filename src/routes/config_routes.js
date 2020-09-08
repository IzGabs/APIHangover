const configRoutes = require('express').Router();
const routesJson = require('../data/routesUrl.json')

configRoutes.get('/', (req, res) => {
    res.status(200).send(`
        <html>
            <head>
                <meta charset="utf-8">
            </head>
            <body>

            <h2> Aqui estão todos as urls para teste da aplicação </h2>
            
            <ul>
             <li><a href="http://localhost:3333/api/listar" title="listar"> Listar Drinks </a></li>
            </ul>
            <h5><i>Futuramente isso será trocado para Swegger</i></h5>
            </body>
        </html>
    `
    )
})

module.exports = configRoutes;