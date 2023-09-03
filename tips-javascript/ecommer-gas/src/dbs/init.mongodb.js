const mongose = require('mongoose');

const connectString = 'mongodb://localhost:27120/ecommer-gas';




class Database {
    constructor() {
        this.connect()
    }

    connect(type = 'mongodb') {
        if (1 === 1) {
            mongose.set('debug', true);
            mongose.set('debug', {
                color: true
            });
        }

        mongose.connect(connectString).then(() => {
            console.log('Connected to MongoDB');
        }).catch((err) => {
            console.log(err);
        });
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }

        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;