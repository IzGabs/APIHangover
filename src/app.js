const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const authToken = require('./controllers/app_controller')()

const PORT = process.env.PORT || 3333;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const routesDrinks = require('./routes/drinks_routes')
const routesConfig = require('./routes/config_routes')
const access = require('./routes/app_routes')

app.listen(PORT, () => { console.log(`Server running in http://localhost:${PORT}`) })

app.use(express.json())
app.use('/', routesConfig)
app.use('/api', 
//authToken.authenticateToken,
 routesDrinks)
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
