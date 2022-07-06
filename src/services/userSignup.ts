import { CreateUser, SignInUser, User } from "../models/user";
import { SecurePassword } from "../services/securePassword";
import { UserMongoDb } from "../database/user.mongo";

export class UserService {
  hashPass: any;
  userDatabase: any;
  constructor() {
    this.hashPass = new SecurePassword();
    this.userDatabase = new UserMongoDb();
  }
  async signup(userRegisterObject: CreateUser) {
    try {
      let isEmailExist = false;
      const user = await this.userDatabase.getByKey({ email: userRegisterObject.email })

      if (user) {
        console.log("email exist", JSON.stringify(user));
        isEmailExist = true;
      }

      // throw error
      if (isEmailExist)
        throw Error("Email already exist!");

      const password = userRegisterObject.password;
      const confirmPassword = userRegisterObject.confirmPassword;
      if (password === confirmPassword) {
        // hash the password
        const hashedPassword = await this.hashPass.hashPassword(
          userRegisterObject.password
        );
        userRegisterObject.password = hashedPassword;
        const newUser = await this.userDatabase.create(userRegisterObject)
        newUser._id = newUser._id.toString();
        newUser.password = null;  // we cann't show password to anyone
        newUser.createdAt= newUser.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Calcutta' });

        return newUser;
      } else {
        throw Error("Password not matched");
      }
    } catch {
      throw Error("Bad Request");
    }
  }

  async signin(userSignInObject: SignInUser) {
    try {
      let isEmailExist = false;
      const user = await this.userDatabase.getByKey({ email: userSignInObject.email })

      if (user) {
        console.log("email exist", JSON.stringify(user));
        isEmailExist = true;
      }

      // throw error
      if (!isEmailExist)
        throw Error("Email Not found!");

        const comparedPassword = await this.hashPass.comparePasswords(
          userSignInObject.password, user.password
        );
        
        if (comparedPassword) {
        
        user._id = user._id.toString();
        user.password = null;  // we cann't show password to anyone
        user.createdAt= user.createdAt.toLocaleString('en-US', { timeZone: 'Asia/Calcutta' });

        return user;
      } else {
        throw Error("Password not matched");
      }
    } catch {
      throw Error("Bad Request");
    }
  }
}

export default {
  UserService,
};
