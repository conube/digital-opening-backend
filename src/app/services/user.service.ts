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

  public async findById(_id: string): Promise<IUserSchema> {
    const user = await this.userModel.findById({ _id })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }
  public async updateById(_id: string, userDTO: IUser): Promise<IUserSchema> {
    await this.userModel
    .updateOne(
      { _id }, 
      userDTO
    )

    const user = this.findById(_id)

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }
}

export const userService = new UserService(UserModel)