'use strict'

const fs = require('fs')
const ClientsService = require('../database/services/clients')
const DocumentsService = require('../database/services/documents')
const ProvidersService = require('../database/services/providers')
const Logger = require('../../config/winston')
const PDFGenerator = require('../pdf/pdfGenerator')

const clientsService = new ClientsService()
const documentsService = new DocumentsService()
const providersService = new ProvidersService()

class DocumentsController {
    constructor() { }

    static async getAll(req, res, next) {
        try {
            const documents = await documentsService.getAll()
            res.json(documents)
        } catch (error) {
            Logger.error(`Could not get documents: ${error}`)
            next(error)
        }
    }

    static async getOne(req, res, next) {
        const documentId = req.params.documentId
        if (!documentId) {
            return next('Document id required')
        }
        try {
            const document = await documentsService.getOne(documentId)
            res.json(document)
        } catch (error) {
            Logger.error(`Could not get document: ${error}`)
            next(error)
        }
    }

    static async insert(req, res, next) {
        const document = req.body
        try {
            const inserteddocument = await documentsService.insert(document)
            res.json(document)
        } catch (error) {
            Logger.error(`Could not insert document: ${error}`)
            next(error)
        }
    }

    static async update(req, res, next) {
        const documentId = req.params.documentId
        if (!documentId) {
            return next('Document id required')
        }
        const document = req.body
        try {
            const updateddocument = await documentsService.update(document, documentId)
            res.json(updateddocument)
        } catch (error) {
            Logger.error(`Could not update document: ${error}`)
            next(error)
        }
    }

    static async remove(req, res, next) {
        const documentId = req.params.documentId
        if (!documentId) {
            return next('Document id required')
        }
        try {
            const removeddocument = await documentsService.remove(documentId)
            res.json(removeddocument)
        } catch (error) {
            Logger.error(`Could not remove document: ${error}`)
            next(error)
        }
    }

    static async generatePdf(req, res, next) {
        const clientId = req.params.clientId
        if(!clientId) {
            return next('Client id required')
        }
        try {   
            const clientResp = await clientsService.getOne(clientId)
            const client = clientResp.clients[0]

            const documentResp = await documentsService.getDefault()
            const document = documentResp.documents[0]

            const providersResp = await providersService.getDefault()
            const provider = providersResp.providers[0]

            const pdfGenerator = new PDFGenerator(client, document, provider)
            const pdfPath = await pdfGenerator.generatePdf();

            var readStream = fs.createReadStream(pdfPath)
            // res.writeHead(200, { 'Content-Type': 'text/plain' }); 
            readStream.pipe(res)
            // res.sendFile(pdfPath)
        } catch(error) {
            Logger.error(`Could not generate pdf: ${error}`)
            next(error)
        }
    }
}

module.exports = DocumentsController
