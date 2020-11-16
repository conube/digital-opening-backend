import { IController, IHttpResponse, IHttpRequest } from '@/interfaces/http.interface'

interface ICreateUserDTO {
    name: string
    email: string
    password: string
}

interface IUser {
    name: string
    email: string
    password: string
}

interface IRepository<T> {
    save: (resource: T) => Promise<T>
    list: () => Promise<T[]>
}

class UserRepository implements IRepository<IUser> {
    private _users: IUser[]

    public save(user: IUser): Promise<IUser> {
        this._users.push(user)
        return Promise.resolve(user)
    }

    public list(): Promise<IUser[]> {
        return Promise.resolve(this._users)
    }

    public findByName(name: string): Promise<IUser> {
        const user = this._users.find((user) => name === user.name)
        return Promise.resolve(user)
    }
}

class UserService {
    public static _instance: UserService

    constructor(
        private userRepository: UserRepository
    ) { }

    public async create(createUserDTO: ICreateUserDTO): Promise<IUser> {
        const userMap: IUser = {
            email: createUserDTO.email,
            name: createUserDTO.name,
            password: createUserDTO.password
        }

        const user = await this.userRepository.save(userMap)
        return user
    }

    public async findAll(): Promise<IUser[]> {
        const users = await this.userRepository.list()
        return users
    }

    public static getInstance(): UserService {
        if (this._instance !== null) {
            const userRepository = new UserRepository()
            this._instance = new UserService(userRepository)
        }
        return this._instance
    }

}


const userService = UserService.getInstance()

class UserController implements IController {
    public async create(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        const createUserDTO: ICreateUserDTO = httpRequest.body
        const user = userService.create(createUserDTO)

        return {
            message: 'User created successfully',
            statusCode: 200,
            content: user
        }
    }

    public async list(httpRequest: IHttpRequest): Promise<IHttpResponse> {
        const users = await userService.findAll()
        return {
            message: 'User created successfully',
            statusCode: 200,
            content: users
        }
    }
}

export const main = async () => {
    const userController = new UserController()

    const mockHttpRequest = (): IHttpRequest => ({
        body: {},
        query: {},
        params: {}
    })


    const user_1: ICreateUserDTO = {
        email: 'fabricio@gmail.com',
        name: 'Fabricio Parola',
        password: 'parola123'
    }

    const user_2: ICreateUserDTO = {
        email: 'fabricio.parola@gmail.com',
        name: 'Fabricio Cardozo',
        password: 'parola123'
    }

    const request_1 = mockHttpRequest()
    request_1.body = user_1

    const request_2 = mockHttpRequest()
    request_2.body = user_2

    const request_3 = mockHttpRequest()

    await userController.create(request_1)
    await userController.create(request_2)

    const users = await userController.list(request_3)
    console.log(users)
}
