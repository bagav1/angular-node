const db = require('../db.js');

/**
 * Obtener todos los usuarios
 * @param {Void} _
 * @param {import('express').Response} res
 * @returns {Promise<import('express').Response>}
 */
const getAll = async (_, res) => {
  db.User.findAll().then(data => {
    return res.json({ status: true, data })
  }).catch(err => {
    return res.json({ status: false, data: err })
  })
}

/**
 * Obtener un usuario por su id
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<import('express').Response>}
 */
const getById = async (req, res) => {
  db.User.findOne({ where: { id: req.params.id } }).then(data => {
    if (data === null) {
      return res.json({ status: false, data: 'Register not found' })
    }
    return res.json({
      status: true,
      data
    })
  }).catch(() => {
    return res.json({ status: false, data: 'Register not found' })
  })
}

/**
 * Creación de un usuario nuevo
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<import('express').Response>}
 */
const create = async (req, res) => {
  db.User.create(req.body).then(newPerson => {
    return res.json({ status: true, data: newPerson })
  }).catch(() => {
    return res.json({ status: false, data: 'Wrong data' })
  })
}

/**
 * Actualizar un usuario
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<import('express').Response>}
 */
const update = async (req, res) => {
  db.User.update(req.body, { where: { id: req.params.id } }).then(data => {
    if (data === null) {
      return res.json({ status: false, data: 'Register not found' })
    }
    return res.json({ status: true, data: req.body })
  }).catch(() => {
    return res.json({ status: false, data: 'Register not found' })
  })
}

/**
 * Eliminacion de un usuario
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {Promise<import('express').Response>}
 */
const deleteById = async (req, res) => {
  db.User.destroy({ where: { id: req.params.id } }).then(data => {
    if (data === null) {
      return res.json({ status: false, data: 'Register not found' })
    }
    return res.json({ status: true, data: `Register deleted Id: ${req.params.id}` })
  }).catch(() => {
    return res.json({ status: false, data: 'Register not found' })
  })
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById
}