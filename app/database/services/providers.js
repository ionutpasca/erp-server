'use strict'

class ProvidersService {
    constructor() {
        this.djinInstance = global.djinInstance || null
    }

    async getAll() {
        try {
            const selectQuery = { providers: '*' }
            return await this.djinInstance.select(selectQuery)
        } catch (error) {
            throw error
        }
    }

    async getOne(providerId) {
        try {
            const selectQuery = {
                providers: { select: '*', where: `providers.id = ${providerId}` }
            }
            return await this.djinInstance.select(selectQuery)
        } catch (error) {
            throw error
        }
    }

    async getDefault() {
        try {
            const selectQuery = {
                providers: { select: '*', where: `providers.is_default = 1` }
            }
            return await this.djinInstance.select(selectQuery)
        } catch (error) {
            throw error
        }
    }

    async insert(provider) {
        try {
            const isDefault = provider.is_default ? 1 : 0
            const providerToInsert = {
                providers: {
                    name: provider.name,
                    details: JSON.stringify(provider.details),
                    is_default: isDefault
                }
            }
            if (isDefault) {
                const query = `UPDATE providers SET is_default = 0 WHERE id > 0`
                await this.djinInstance.execRaw(query)
            }
            return await this.djinInstance.insert(providerToInsert);
        } catch (error) {
            throw error
        }
    }

    async update(provider, providerId) {
        try {
            const isDefault = provider.is_default ? 1 : 0
            if (isDefault) {
                const query = `UPDATE providers SET is_default = 0 WHERE id > 0`
                await this.djinInstance.execRaw(query)
            }
            const providerDetails = JSON.stringify(provider.details)
            const query = `UPDATE providers SET name = '${provider.name}', details = '${providerDetails}', is_default = ${is_default} WHERE id = ${providerId}`
            return await this.djinInstance.execRaw(query)
        } catch (error) {
            throw error
        }
    }

    async remove(providerId) {
        try {
            const selectQuery = {
                providers: { select: '*', where: `providers.id = ${providerId}` }
            }
            const providerRes = await this.djinInstance.select(selectQuery)
            const providerIsDefault = providerRes.providers[0].is_default;
            if (providerIsDefault) {
                throw new Error('DEFAULT_PROVIDER')
            }

            const query = `DELETE FROM providers WHERE id = ${providerId}`
            return await this.djinInstance.execRaw(query)
        } catch (error) {
            throw error
        }
    }
}

module.exports = ProvidersService