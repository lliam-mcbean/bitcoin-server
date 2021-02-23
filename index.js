const app = require('express')()
const PORT = 8080
const importdata = require('./bitcoin.json')

app.listen(
    PORT,
    () => console.log('hello')
)

app.get('/public', (req, res) => {
    res.status(200).send(importdata)
})

