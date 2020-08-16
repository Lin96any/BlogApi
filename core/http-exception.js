class HTTPException extends Error {
    constructor(msg, ErrorCode, StateCode) {
        super();
        this.msg = msg;
        this.errorCode = ErrorCode;
        this.stateCode = StateCode
    }
}
class ParameterException extends HTTPException {
    constructor(msg, errorCode, stateCode) {
        super()
        this.stateCode = stateCode || 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000
    }
}

class Success extends HTTPException {
    constructor(msg, errorCode) {
        super()
        this.stateCode = 200
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 0
    }
}



module.exports = {
    HTTPException,
    ParameterException,
    Success
}