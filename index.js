const express = require('express')
const teamRouter = require('./team/router')

const app = express()

const port = process.env.PORT || 4000

app.use(teamRouter)

app.listen(port, () => console.log('Listening on port:', port))