const express = require('express')
const app = express()
const PORT = process.env.PORT || 3333;

const routesDrinks = require('./routes/drinks_routes')
const routesConfig = require('./routes/config_routes')

app.listen(PORT, () => { console.log(`Server running in http://localhost:${PORT}`) })

app.use(express.json())

app.use('/', routesConfig)
app.use('/api', routesDrinks)
