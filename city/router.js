const { Router } = require('express')
const Team = require('../team/model')
const City = require('./model')

const router = new Router()

router.get('/city', (req, res, next) => {
  City.findAll()
    .then(cities => res.json(cities))
    .catch(err => next(err))
})

router.post('/city', (req, res, next) => {
  City.create(req.body)
    .then(city => res.json(city))
    .catch(err => next(err))
})

router.get('/city/:id', (req, res, next) => {
  City.findByPk(req.params.id)
    .then(city => {
      if (city) {
        res.json(city)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

router.put('/city/:id', (req, res, next) => {
  City.findByPk(req.params.id)
    .then(city => {
      if (city) {
        return city.update(req.body)
          .then(city => res.json(city))
      } else {
        res.status(404).end()
      }
    })
})

module.exports = router