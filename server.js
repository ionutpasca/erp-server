'use strict'

const express = require('express')
const http = require('http')
const config = require('./config/main')
const mysql = require('promise-mysql')

const Djin = require('djin')
const Logger = require('./config/winston')

const ENV = process.env.NODE_ENV || 'development'

const pool = mysql.createPool(config.mysql)

const djin = new Djin(config.mysql)
djin.initialize()
    .then(() => {
        Logger.info('Djin initialized')
        global.djinInstance = djin
        initializeControllers()
        initializeRoutes()
    })
    .catch((err) => {
        Logger.error(`Could not initialize Djin: ${err}`)
    })


let db = {}
db.connection = pool

let app = express()
app.set('config', config)
app.set('root', __dirname)
app.set('env', ENV)

require('./config/express').init(app)

app.use((err, req, res, next) => {
    res.status(500).json(err)
})

if (!module.parent) {
    let server = http.createServer(app)
    server.listen(config.port || 3000)
    Logger.info(`${config.app.name} is running, listening on port ${config.port}, environment: ${ENV.toLowerCase()}`)
};

function initializeRoutes() {
    [
        'main',
        'clients',
        'documents',
        'providers'
    ].forEach((route) => {
        app.use('/api', require(`./app/routes/${route}`))
    })
    app.use('/', require('./app/routes/main'))
}

function initializeControllers(djinInstance) {
    ['clientsController']
        .forEach((service) => {
            const c = require(`./app/controllers/${service}`)
        })
}