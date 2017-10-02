const cookieParser = require('cookie-parser')
const csrf = require('csurf')
const bodyParser = require('body-parser')
const express = require('express')
const { resolve } = require('path')
const ReactDom = require('react-dom/server')
const App = require('../client/App').default
const React = require('react')

const app = express()
app.disable('x-powered-by')
app.use(cookieParser())
app.use(csrf({ cookie: true }))
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/dist', express.static('dist'))

app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err)
  res.status(403).send('Invalid csrfToken')
})

app.get('/', (req, res) => {
  res.send(ReactDom.renderToStaticMarkup(<App csrfToken={req.csrfToken()} />))
})

app.listen(4000, () => {
  console.log('http://localhost:4000')
})
