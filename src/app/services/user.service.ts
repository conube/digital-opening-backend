import { UserModel, IUser, IUserSchema } from "../models/user.model";

export class UserService {
  constructor(
    private userModel: typeof UserModel // Thats not good.. Maybe a Repository pattern
  ) { }

  public async list(): Promise<IUserSchema[]> {
    const users = await this.userModel.find()
    return users
  }

  public async create(userDTO: IUser): Promise<IUserSchema> {
    const user = await this.userModel.create(userDTO)
    return user
  }
  // @Todo -> Pass responsability to userRepository 
  public async findByEmail(email: string): Promise<IUserSchema> {
    const user = await this.userModel.findOne({ email })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }
}

export const userService = new UserService(UserModel)