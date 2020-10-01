const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const fs = require('fs');
const authToken = require('./controllers/app_controller')()
require('dotenv/config')

const PORT = process.env.PORT || 3333;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const routesDrinks = require('./routes/drinks_routes')
const routesUser = require('./routes/user_routes')
const routesConfig = require('./routes/config_routes')
const access = require('./routes/app_routes')

app.listen(PORT, () => { console.log(`Server running in http://localhost:${PORT}`) })

app.use(express.json())
app.use('/', routesConfig)

if (process.env.MOD_RUN == "PRODUCTION") {
    console.log('Server Running in ' + process.env.MOD_RUN)
    app.use('/api', authToken.authenticateToken, routesDrinks, routesUser)
} else {
    console.log('Server Running in ' + process.env.MOD_RUN)
    app.use('/api', routesDrinks)
    app.use('/api', routesUser)
}

app.use('/access', access)


// app.use((req, res, next) => {

//         const blocked = ["192.168.56.1"]
//         var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

//         if(ip.substr(0,7) == "::ffff:"){
//             ip = ip.substr(7,12)
//         }
//         console.log(ip)
//         if(blocked.includes(ip)) {
//             return res.send('ip bloqueado')
//         }


//         return next();
// });
app.use((req, res, next) => {
    const erro = new Error('Não encontrado Nada');
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
