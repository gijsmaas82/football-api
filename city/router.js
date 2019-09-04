const { Router } = require('express')
const Team = require('../team/model')
const City = require('./model')
const Player = require('../player/model')

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

router.get('/city-by-player/:name', (req, res, next) => {
  City.findAll({
    include: [{
      model: Player,
      where: { name: req.params.name }
    }]
  })
    .then(city => {
      if (city) {
        res.json(city)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

router.get('/city-by-team/:name', (req, res, next) => {
  City.findAll({
    include: [{
      model: Team,
      where: { name: req.params.name }
    }]
  })
    .then(team => {
      if (team) {
        res.json(team)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

module.exports = router