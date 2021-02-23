const app = require('express')()
const csv = require('csv-parser')
const PORT = 8080

app.listen(
    PORT,
    () => console.log('hello')
)

app.get('/public', (req, res) => {
    res.status(200).send(results)
})

const fs = require('fs')
const results = [];

fs.createReadStream('bitcoin_csv.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))