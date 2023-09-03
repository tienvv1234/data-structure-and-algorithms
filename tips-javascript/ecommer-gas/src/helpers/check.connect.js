const mongoose = require ('mongoose')
const os = require('os')
const _SECOND = 5000
// kiểm trả hệ thống có bao nhiêu connect?
const countConnect = () => {
    const number = mongoose.connections.length
    console.log(`Number of connection: ${number}`)
}

// check overload
const checkOverload = () => {
    setInterval(() => {
        const number = mongoose.connections.length
        const numCores = os.cpus().length
        const memoryUsage = process.memoryUsage().rss
        // giả sử 1 cỏe chịu đước 5 connection
        const maxConnections = numCores * 5

        console.log(`Memory usage in : ${memoryUsage}`)

        console.log(`Active connection: ${number}`)
        console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`)

        if(number > maxConnections) {
            console.log('Connection Overload detected!')
            // notification send to team
        }
    }, _SECOND)    
}

module.exports = {
    countConnect,
    checkOverload
}