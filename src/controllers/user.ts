import { HTTPErrorHandler } from "../services/errorHandler";
import { UserService } from "../services/userSignup";

import { JsonController, Get, Post, Body, HttpCode } from "routing-controllers";
import { CreateUserDTO, GetUserDTO } from "../dto/user";

@JsonController("/user")
export class SignUpController {
  userServiceObj: any;
  httpError: any;
  constructor() {
    this.userServiceObj = new UserService();
    this.httpError = new HTTPErrorHandler();
  }

  @HttpCode(201)
  @Post("/")
  async signup(@Body({ required: true }) userRequest: CreateUserDTO): Promise<any> {
    const userRegisterObject: any = await this.userServiceObj.signup(userRequest);
    return userRegisterObject;
  }

  @HttpCode(200)
  @Get("/")
  async signin(@Body({ required: true }) userRequest: GetUserDTO): Promise<any> {
    const userRegisterObject: any = await this.userServiceObj.signin(userRequest);
    return userRegisterObject;
  }

  @Get("/ping")
  public ping(): string {
    return "pong";
  }
}
