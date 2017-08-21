'use strict'

const bodyParser = require('body-parser')
const methodOverride = require('method-override')

function init(app) {
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(methodOverride())
    app.disable('x-powered-by')

    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,PUT,POST,DELETE')
        res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
        next()
    })
}

module.exports.init = init