import { IUser } from "../models/user.model";

export class UserService {
    private _users: IUser[] = []

    constructor() { }

    public async create(userDTO: IUser): Promise<IUser> {
        this._users.push(userDTO)
        const user = await Promise.resolve(userDTO)
        return user
    }

    public async list(): Promise<IUser[]> {
        const users = Promise.resolve(this._users)
        return users
    }
}

export const userService = new UserService()