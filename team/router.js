const { Router } = require('express')
const City = require('../city/model')
const Player = require('../player/model')
const Team = require('./model')

const router = new Router()

router.get('/team', (req, res, next) => {
  Team.findAll({include: City})
    .then(teams => res.json(teams))
    .catch(err => next(err))
})

router.post('/team', (req, res, next) => {
  Team.create(req.body)
    .then(team => res.json(team))
    .catch(err => next(err))
})

router.get('/team/:id', (req, res, next) => {
  Team.findByPk(req.params.id, {include: City})
    .then(team => {
      if (team) {
        res.json(team)
      } else {
        res.status(404).end()
      }
    })
    .catch(err => next(err))
})

router.get('/team-by-city/:name', (req, res, next) => {
  Team.findAll({
    include: [{
      model: City,
      where: { name: req.params.name } 
    }]
  })
  .then(teams => {
    if (teams) {
      res.json(teams)
    } else {
      res.status(404).end()
    }
  })
  .catch(err => next(err))
})

router.get('/team-by-player/:name', (req, res, next) => {
  Team.findAll({
    include: [{
      model: Player,
      where: { name: req.params.name } 
    }]
  })
  .then(teams => {
    if (teams) {
      res.json(teams)
    } else {
      res.status(404).end()
    }
  })
  .catch(err => next(err))
})

router.put('/team/:id', (req, res, next) => {
  Team.findByPk(req.params.id)
    .then(team => {
      if (team) {
        return team.update(req.body)
          .then(team => res.json(team))
      } else {
        res.status(404).end()
      }
    })
})

module.exports = router