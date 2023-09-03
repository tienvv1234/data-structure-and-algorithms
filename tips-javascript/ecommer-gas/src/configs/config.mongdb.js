const dev = {
    app: {
        port: process.env.PORT || 3000
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || 'ecommer-gas',
    }
}

const prod = {
    app: {
        port: process.env.PORT_PROD || 3000
    },
    db: {
        host: process.env.DB_HOST_PROD || 'localhost',
        port: process.env.DB_PORT_PROD || 27017,
        name: process.env.DB_NAME_PROD || 'ecommer-gas',
    }
}

const config = { dev, prod }
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env]