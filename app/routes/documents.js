'use strict'

const express = require('express')
const router = express.Router()

const DocumentsController = require('../controllers/documentsController')

router.get('/documents', DocumentsController.getAll)
router.get('/documents/:documentId', DocumentsController.getOne)
router.get('/documents/generate/:clientId', DocumentsController.generatePdf)

router.post('/documents', DocumentsController.insert)

router.put('/documents/:documentId', DocumentsController.update)

router.delete('/documents/:documentId', DocumentsController.remove)

module.exports = router;