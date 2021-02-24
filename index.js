const express = require('express')
const app = express()
const csv = require('csv-parser')
const PORT = process.env.PORT || 3000

const fs = require('fs')
const results = [];

fs.createReadStream('bitcoin_csv.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))

app.use(express.static('src'))

app.listen(
    PORT,
    () => console.log('hello')
)

app.get('/public', (req, res) => {
    res.send(results)
})