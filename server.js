const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const bodyParser = require('body-parser')
const express = require('express')
const { resolve } = require('path')
const csrfProtection = csrf({ cookie: true })
const parseForm = bodyParser.urlencoded({ extended: false })

const app = express()
app.use(cookieParser())
app.use(parseForm)

app.use('/dist', express.static('dist'))

app.get('*', csrfProtection, (req, res) => {
  res.sendFile(resolve(__dirname, 'index.html'))
})

app.post('/process', parseForm, csrfProtection, function (req, res) {
  res.send('data is being processed')
})

app.listen(4000, () => {
  console.log('http://localhost:4000')
})
