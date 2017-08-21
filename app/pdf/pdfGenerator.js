'use strict'

const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const pdf = require('html-pdf')
const swig = require('swig')

function getPdfPath(html, pageOptions, pathToTemplate) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(pathToTemplate + '/doc.pdf')
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath)
        }
        
        pdf.create(html, pageOptions)
            .toStream((err, stream) => {
                let file = fs.createWriteStream(filePath)
                stream.pipe(file)
                file.on('finish', () => {
                    resolve(filePath)
                })
            })
    })
}

class PdfGenerator {
    constructor(client, document, provider) {
        const providerDetails = JSON.parse(provider.details)
        this.provider = [provider.name].concat(providerDetails)

        const clientDetails = JSON.parse(client.details)
        this.client = [client.name].concat(clientDetails)

        this.pageOptions = JSON.parse(document.options)
    }

    async generatePdf() {
        const pathToTemplate = path.join(__dirname, '../templates')
        const templateOptions = {
            client: this.client,
            path: pathToTemplate,
            provider: this.provider
        }
        const html = swig.renderFile(path.join(pathToTemplate, 'main.html'), templateOptions);
        return await getPdfPath(html, this.pageOptions, pathToTemplate)
    }
}

module.exports = PdfGenerator
