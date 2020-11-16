import { IController, IHttpRequest, IHttpResponse } from '@/interfaces/http.interface'
import { userService } from '@/services/user.service'
import { IUser } from '../models/user.model'

export class UserController implements IController {
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
        const user = await userService.create(userDTO)
        return {
            message: 'User created successfully',
            statusCode: 200,
            content: user
        }
    }
}

export const userController = new UserController()