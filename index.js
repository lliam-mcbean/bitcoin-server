const app = require('express')()
const PORT = process.env.PORT || 3000
const importdata = require('./bitcoin.json')

app.listen(
    PORT,
    () => console.log('hello')
)

app.get('/public', (req, res) => {
    res.send(importdata)
})

