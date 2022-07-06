import * as bcrypt from "bcrypt";
import { HTTPErrorHandler } from '../services/errorHandler';

export class SecurePassword {
    errorObj: any
    constructor() {
        this.errorObj = new HTTPErrorHandler()
    }
    hashPassword = async (password) => {
        try {
            const salt = await bcrypt.genSalt(10);
            return await bcrypt.hash(password, salt);
        } catch {
            throw this.errorObj.fetchHTTPError(400, "Bad Request");
        }
    };
    comparePasswords = async (inputPassword, hashedPassword) => {
        try {
            return await bcrypt.compare(inputPassword, hashedPassword);
        } catch {
            throw this.errorObj.fetchHTTPError(400, "Bad Request");
        }
    }
}
export default {
    SecurePassword
}