module.exports = {
    port: 8080,
    host: '127.0.0.1',
    secret: '<SECRET KEY TO SIGN JWT>',
    app: {
        name: 'ERP'
    },
    facebookAuth: {
        clientID: '<your-secret-clientID>',
        clientSecret: '<your-client-secret>',
        callbackURL: '<app-url + /auth/facebook/callback>'
    },
    mysql: {
        adapter: 'mysql',
        module: 'sails-mysql',
        host: 'localhost',
        port: 3306,
        user: '<database_user_here>',
        password: '<database_password_here>',
        database: '<database_name_here>',
        timezone: 'utc',
        connectionLimit: 100,
        connectTimeout: 10000,
        acquireTimeout: 10000,
        multipleStatements: false
    }
};