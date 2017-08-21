'use strict'

class ClientsService {
    constructor() {
        this.djinInstance = global.djinInstance || null
    }

    async getAll() {
        try {
            const selectQuery = { clients: '*' }
            return await this.djinInstance.select(selectQuery)
        } catch (error) {
            throw error
        }
    }

    async getOne(clientId) {
        try {
            const selectQuery = {
                clients: { select: '*', where: `clients.id = ${clientId}` }
            }
            return await this.djinInstance.select(selectQuery)
        } catch (error) {
            throw error
        }
    }

    async insert(client) {
        try {
            const clientToInsert = {
                clients: {
                    name: client.name,
                    details: JSON.stringify(client.details)
                }
            }
            return await this.djinInstance.insert(clientToInsert);
        } catch (error) {
            throw error
        }
    }

    async update(client, clientId) {
        try {
            const clientDetails = JSON.stringify(client.details)
            const query = `UPDATE clients SET name = '${client.name}', details = '${clientDetails}' WHERE id = ${clientId}`
            return await this.djinInstance.execRaw(query)
        } catch (error) {
            throw error
        }
    }

    async remove(clientId) {
        try {
            const query = `DELETE FROM clients WHERE id = ${clientId}`
            return await this.djinInstance.execRaw(query)
        } catch (error) {
            throw error
        }
    }
}

module.exports = ClientsService