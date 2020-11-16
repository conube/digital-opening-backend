import { UserModel, IUser } from "../models/user.model";

export class UserService {
    constructor(
        private userModel: typeof UserModel // Thats not good.. Maybe a Repository pattern
    ) { }

    public async list(): Promise<IUser[]> {
        const users = await this.userModel.find()
        return users
    }

    public async create(userDTO: IUser): Promise<IUser> {
        const user = await this.userModel.create(userDTO)
        return user
    }
}

export const userService = new UserService(UserModel)