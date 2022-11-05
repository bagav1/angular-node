const api = require('express').Router()
const user = require('../controllers/user.controller')

api.get('/user', user.getAll)
api.get('/user/:id', user.getById)
api.post('/user', user.create)
api.put('/user/:id', user.update)
api.delete('/user/:id', user.deleteById)

module.exports = api