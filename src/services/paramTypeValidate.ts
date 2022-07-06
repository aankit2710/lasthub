export class ParameterTypeValidation {
    emailType(Value: any) {
        const type = typeof (Value)
        if (type === "string" && Value.length > 3 && Value.length < 12) {
            return true;
        }
        else {
            return false
        }
    }
    numberType(Value: any) {
        const type = typeof (Value)
        if (type === "number") {
            return true;
        }
        else {
            return false
        }
    }
}
 
export default {
    ParameterTypeValidation
}
// const data = new ParameterTypeValidation();
// // console.log(data.emailType("email"));
// console.log(data.numberType(9874561230));
