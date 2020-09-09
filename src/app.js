const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3333;





const routesDrinks = require('./routes/drinks_routes')
const routesConfig = require('./routes/config_routes')

app.listen(PORT, () => { console.log(`Server running in http://localhost:${PORT}`) })

app.use(express.json())
app.use('/', routesConfig)
app.use('/api', routesDrinks)


app.use((req, res, next) => {
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