const ReasonStatusCode = {
    CREATED: 'Created',
    OK: 'Success'
}

const StatusCode = {
    OK: 200,
    CREATED: 201,
}

class SuccessResponse {
    constructor({ message, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {} }) {
        console.log('status', statusCode)
        console.log('message', message)
        console.log('reasonStatusCode', reasonStatusCode)
        console.log('metadata', metadata)
        this.message = !message ? reasonStatusCode : message;
        this.status = statusCode;
        this.metadata = metadata;
    }

    send(res, headers = {}) {
        console.log('this.status', this.status)
        console.log('this', this)
        return res.status(this.status).json(this)
        
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata = {} }) {
        super({ message, metadata });
    }
}

class Created extends SuccessResponse {
    constructor({ option, message, statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, metadata = {} }) {
        // console.log('ReasonStatusCode', statusCode)
        // console.log('message', message)
        // console.log('reasonStatusCode', reasonStatusCode)
        // console.log('metadata', metadata)
        super({ message, statusCode, reasonStatusCode, metadata });
        this.option = option
    }
}

module.exports = {
    OK,
    Created,
    SuccessResponse
}