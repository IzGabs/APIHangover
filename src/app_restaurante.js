const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const mongo = require('.././db/connection')

mongo.connect((err, client) => { if (err) console.log(` ERROOOOO ${err}`); })


require('dotenv/config')

const PORT = process.env.PORT || 3334;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const routesRestaurant = require('./routes/restaurant_routes')

if (process.env.MOD_RUN == "PRODUCTION") {
    console.log('Server Running in ' + process.env.MOD_RUN)
        // app.use('/api/restaurant',authToken.authenticateToken, routesRestaurant)
} else {
    console.log('Server Running in ' + process.env.MOD_RUN)
    app.use('/api/restaurant', routesRestaurant)
}

app.listen(PORT, () => { console.log(`Server running in http://localhost:${PORT}`) })