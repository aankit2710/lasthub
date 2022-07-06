export class HTTPErrorHandler {
    fetchHTTPError(errorCode: any) {
        var errorMsg;

        switch (errorCode) {
            case 400: errorMsg = "Bad Request"
                break;
            case 401: errorMsg = "UnAuthorized"
                break;
            case 403: errorMsg = "specific Error"
                break;
            case 403: errorMsg = "Forbidden"
                break;
            case 404: errorMsg = "Not Found"
                break;
            case 412: errorMsg = "Precondition Failed"
                break;
            case 500: errorMsg = "Internal Server Error"
                break;
            case 503: errorMsg = "Service Unavailable"
                break;
            default:
                throw Error('Invalid');
        }
        return {
            status: false,
            errorMsg,
        }
    }
    fetchSuccessResponse(successCode: any) {
        var successMsg;

        switch (successCode) {
            case 200: successMsg = "Success"
                break;
            case 202: successMsg = "Accepted"
                break;
            case 203: successMsg = "Non-Authoritative Information"
                break;
            case 204: successMsg = "No Content"
                break;
            case 206: successMsg = "Partial Content"
                break;
            case 207: successMsg = "Multi Status"
                break;
            case 208: successMsg = "Already Reported"
                break;
            case 300: successMsg = "Multiple Choices"
                break;
            default:
                throw Error('Invalid');
        }
        return {
            status: true,
            successMsg
        }
    }

    businessValidationError(resCode: any, message: any) {
        var status;
        switch (resCode) {
            case 200: status = true
                break;
            case 202: status = true
                break;
            case 203: status = true
                break;
            case 204: status = true
                break;
            case 206: status = true
                break;
            case 207: status = true
                break;
            case 208: status = true
                break;
            case 300: status = true
                break;
            case 400: status = false
                break;
            case 401: status = false
                break;
            case 403: status = false
                break;
            case 403: status = false
                break;
            case 404: status = false
                break;
            case 412: status = false
                break;
            case 500: status = false
                break;
            case 503: status = false
                break;
            default:
                throw Error('Invalid');
        }
        return {
            status,
            businessErrMsg: message,
            resCode
        }
    }
}
export default {
    HTTPErrorHandler
}
// const httpError = new HTTPErrorHandler()
// console.log(httpError.fetchHTTPError(401));

// const httpSuccess = new HTTPErrorHandler()
// console.log(httpSuccess.fetchSuccessResponse(200));















// businessValidationError(resCode: any, message: any) {
    //     var businessErrMsg;
    //     switch (resCode) {
    //         case 200: businessErrMsg =  message
    //             break;
    //         case 202: businessErrMsg = message
    //             break;
    //         case 203: businessErrMsg = message
    //             break;
    //         case 204: businessErrMsg = message
    //             break;
    //         case 206: businessErrMsg = message
    //             break;
    //         case 207: businessErrMsg = message
    //             break;
    //         case 208: businessErrMsg = message
    //             break;
    //         case 300: businessErrMsg = message
    //             break;
    //         default:
    //             throw Error('Invalid');
    //     }
    //     return {
    //         status: true,
    //         businessErrMsg,
    //         resCode
    //     }
    // }