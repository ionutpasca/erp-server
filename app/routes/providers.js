'use strict'

const express = require('express')
const router = express.Router()

const ProviderController = require('../controllers/providersController')

router.get('/providers', ProviderController.getAll)
router.get('/providers/:providerId', ProviderController.getOne)

router.post('/providers', ProviderController.insert)

router.put('/providers/:providerId', ProviderController.update)

router.delete('/providers/:providerId', ProviderController.remove)

module.exports = router;