const { Router } = require('express')
const Team = require('../team/model')
const Player = require('./model')

const router = new Router()

router.get('/player', (req, res, next) => {
  Player.findAll()
    .then(players => res.json(players))
    .catch(err => next(err))
})

router.post('/player', (req, res, next) => {
  Player.create(req.body)
    .then(player => res.json(player))
    .catch(err => next(err))
})

router.get('/player/:id', (req, res, next) => {
  Player.findByPk(req.params.id, { include: [Team] })
    .then(player => {
      if (player) {
        res.json(player)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

router.put('/player/:id', (req, res, next) => {
  Player.findByPk(req.params.id)
    .then(player => {
      if (player) {
        return player.update(req.body)
          .then(player => res.json(player))
      } else {
        res.status(404).end()
      }
    })
})

module.exports = router