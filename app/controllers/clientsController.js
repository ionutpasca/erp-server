'use strict'

const ClientsService = require('../database/services/clients')
const Logger = require('../../config/winston')
const clientsService = new ClientsService()

class ClientsController {
    constructor() { }

    static async getAll(req, res, next) {
        try {
            const clients = await clientsService.getAll()
            res.json(clients)
        } catch (error) {
            Logger.error(`Could not get clients: ${error}`)
            next(error)
        }
    }

    static async getOne(req, res, next) {
        const clientId = req.params.clientId
        if (!clientId) {
            return next('Client id required')
        }
        try {
            const client = await clientsService.getOne(clientId)
            res.json(client)
        } catch (error) {
            Logger.error(`Could not get clients: ${error}`)
            next(error)
        }
    }

    static async insert(req, res, next) {
        const client = req.body
        try {
            const insertedClient = await clientsService.insert(client)
            res.json(client)
        } catch (error) {
            Logger.error(`Could not insert client: ${error}`)
            next(error)
        }
    }

    static async update(req, res, next) {
        const clientId = req.params.clientId
        if (!clientId) {
            return next('Client id required')
        }
        const client = req.body
        try {
            const updatedClient = await clientsService.update(client, clientId)
            res.json(updatedClient)
        } catch (error) {
            Logger.error(`Could not update client: ${error}`)
            next(error)
        }
    }

    static async remove(req, res, next) {
        const clientId = req.params.clientId
        if (!clientId) {
            return next('Client id required')
        }
        try {
            const removedClient = await clientsService.remove(clientId)
            res.json(removedClient)
        } catch (error) {
            Logger.error(`Could not remove client: ${error}`)
            next(error)
        }
    }
}

module.exports = ClientsController