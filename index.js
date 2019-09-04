const express = require('express')
const teamRouter = require('./team/router')
const bodyParser = require('body-parser')
const port = process.env.PORT || 4000
const app = express()
const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(teamRouter)

app.listen(port, () => console.log('Listening on port:', port)) 