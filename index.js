const app = require('express')()
const csv = require('csv-parser')
const PORT = process.env.PORT || 3000

const fs = require('fs')
const results = [];

fs.createReadStream('bitcoin_csv.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))

app.listen(
    PORT,
    () => console.log('hello')
)

app.get('/', (req, res) => {
    res.send(results)
})