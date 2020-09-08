const express = require('express')
const app = express()
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`)
})

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})
