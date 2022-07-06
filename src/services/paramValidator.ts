export class ParameterValidator {
    constructor() {
        // console.log("validating class")
    }
    validateParams(inputParams: string[] | number[]) {
        // console.log("params", inputParams)
        inputParams.forEach(function (input: any) {
            console.log(input);
        });

        return inputParams[0];
        
    }
    
    matchFieldCount(error: string) {
        if (!error) {
            return 0;
        } else {
            return error;
        }
    }
}
 
export default {
    ParameterValidator
}
// const data = new ParameterValidator();
// data.validateParams(['firstName', 'lastName', 'email', 'mobileNumber', 'password', 'confirmPassword', 'image']);
