'use strict'

const express = require('express')
const router = express.Router()

const ClientsController = require('../controllers/clientsController')

router.get('/clients', ClientsController.getAll)
router.get('/clients/:clientId', ClientsController.getOne)

router.post('/clients', ClientsController.insert)

router.put('/clients/:clientId', ClientsController.update)

router.delete('/clients/:clientId', ClientsController.remove)

module.exports = router;