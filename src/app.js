const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const authToken = require('./controllers/app_controller')()
require('dotenv/config')

const PORT = process.env.PORT || 3333;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const routesDrinks = require('./routes/drinks_routes')
const routesConfig = require('./routes/config_routes')
const access = require('./routes/app_routes')

app.listen(PORT, () => { console.log(`Server running in http://localhost:${PORT}`) })

app.use(express.json())
app.use('/', routesConfig)

if (process.env.MOD_RUN == "PRODUCTION") {
    console.log('Server Running in ' + process.env.MOD_RUN)
    app.use('/api', authToken.authenticateToken, routesDrinks)
} else {
    console.log('Server Running in ' + process.env.MOD_RUN)
    app.use('/api', routesDrinks)
}

app.use('/access', access)



app.use((req, res, next) => {
    console.log("ab")
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});
