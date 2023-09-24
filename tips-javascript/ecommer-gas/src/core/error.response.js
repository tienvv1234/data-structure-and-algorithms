const StatusCode = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
}

const ReasonStatusCode = {
    FORBIDDEN: 'Forbidden',
    CONFLICT: 'Conflict',
}

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class ConflictError extends ErrorResponse {
    constructor(message, statusCode) {
        super(message, statusCode);
    }
}

class BadRequestError extends ErrorResponse {
    constructor(message, statusCode) {
        super(message, statusCode);
    }
}

module.exports = {
    ConflictError,
    BadRequestError
}