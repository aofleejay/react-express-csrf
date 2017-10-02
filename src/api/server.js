const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use((req, res, next) => {
  console.log('request', new Date)
  next()
})

app.post('/process', (req, res) => {
  res.send('processed')
})

app.listen(4001, () => {
  console.log('http://localhost:4001')
})
