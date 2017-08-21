'use strict'

const ProvidersService = require('../database/services/providers')
const Logger = require('../../config/winston')
const providersService = new ProvidersService()

class ProvidersController {
    constructor() { }

    static async getAll(req, res, next) {
        try {
            const providers = await providersService.getAll()
            res.json(providers)
        } catch (error) {
            Logger.error(`Could not get providers: ${error}`)
            next(error)
        }
    }

    static async getOne(req, res, next) {
        const providerId = req.params.providerId
        if (!providerId) {
            return next('Provider id required')
        }
        try {
            const provider = await providersService.getOne(providerId)
            res.json(provider)
        } catch (error) {
            Logger.error(`Could not get providers: ${error}`)
            next(error)
        }
    }

    static async insert(req, res, next) {
        const provider = req.body
        try {
            const insertedProvider = await providersService.insert(provider)
            res.json(provider)
        } catch (error) {
            Logger.error(`Could not insert provider: ${error}`)
            next(error)
        }
    }

    static async update(req, res, next) {
        const providerId = req.params.providerId
        if (!providerId) {
            return next('Provider id required')
        }
        const provider = req.body
        try {
            const updatedProvider = await providersService.update(provider, providerId)
            res.json(updatedProvider)
        } catch (error) {
            Logger.error(`Could not update provider: ${error}`)
            next(error)
        }
    }

    static async remove(req, res, next) {
        const providerId = req.params.providerId
        if (!providerId) {
            return next('Provider id required')
        }
        try {
            const removedProvider = await providersService.remove(providerId)
            res.json(removedProvider)
        } catch (error) {
            Logger.error(`Could not remove provider: ${error}`)
            next(error)
        }
    }
}

module.exports = ProvidersController