import { IController, IHttpRequest, IHttpResponse } from '@/interfaces/http.interface'
import { IUser } from '../models/user.model'
import { userService, UserService } from '@/services/user.service'

export class UserController implements IController {
  constructor(
    private userService: UserService
  ) { }

  public async list(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const users = await userService.list()
    return {
      message: 'Users found successfully',
      statusCode: 200,
      content: users
    }
  }

  public async create(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const userDTO: IUser = httpRequest.body
    const user = await this.userService.create(userDTO)
    return {
      message: 'User created successfully',
      statusCode: 200,
      content: user
    }
  }
  
  public async read(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const userId = httpRequest.params.user_id
    try {
      const user = await userService.findById(userId)
      return {
        message: 'User found successfully',
        statusCode: 200,
        content: user
      }
    } catch (error) {
        return {
          message: 'User not found',
          statusCode: 400,
          content: {}
        }
    }
  }
}

export const userController = new UserController(userService)