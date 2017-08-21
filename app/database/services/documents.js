'use strict'

class DocumentsService {
    constructor() {
        this.djinInstance = global.djinInstance || null
    }

    async getAll() {
        try {
            const selectQuery = { documents: '*' }
            return await this.djinInstance.select(selectQuery)
        } catch (error) {
            throw error
        }
    }

    async getOne(documentId) {
        try {
            const selectQuery = {
                documents: { select: '*', where: `documents.id = ${documentId}` }
            }
            return await this.djinInstance.select(selectQuery)
        } catch (error) {
            throw error
        }
    }

    async getDefault() {
        try {
            const selectQuery = {
                documents: { select: '*', where: `documents.is_default = 1` }
            }
            return await this.djinInstance.select(selectQuery)
        } catch (error) {
            throw error
        }
    }

    async insert(document) {
        try {
            const isDefault = document.is_default ? 1 : 0
            const documentToInsert = {
                documents: {
                    options: JSON.stringify(document.options),
                    is_default: isDefault
                }
            }
            if (isDefault) {
                const query = `UPDATE documents SET is_default = 0 WHERE id > 0`
                await this.djinInstance.execRaw(query)
            }
            return await this.djinInstance.insert(documentToInsert);
        } catch (error) {
            throw error
        }
    }

    async update(document, documentId) {
        try {
            const isDefault = document.is_default ? 1 : 0
            if (isDefault) {
                const query = `UPDATE documents SET is_default = 0 WHERE id > 0`
                await this.djinInstance.execRaw(query)
            }
            const documentOptions = JSON.stringify(document.options)
            const is_default = document.is_default ? 1 : 0
            const query = `UPDATE documents SET options = '${documentOptions}', is_default = ${is_default} WHERE id = ${documentId}`
            return await this.djinInstance.execRaw(query)
        } catch (error) {
            throw error
        }
    }

    async remove(documentId) {
        try {
            const selectQuery = {
                documents: { select: '*', where: `documents.id = ${documentId}` }
            }
            const documentRes = await this.djinInstance.select(selectQuery)
            const docIsDefault = documentRes.documents[0].is_default;
            if (docIsDefault) {
                throw new Error('DEFAULT_DOC')
            }

            const query = `DELETE FROM documents WHERE id = ${documentId}`
            return await this.djinInstance.execRaw(query)
        } catch (error) {
            throw error
        }
    }
}

module.exports = DocumentsService