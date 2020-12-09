import { TokenModel, IToken, ITokenSchema } from "../models/token.model";

export class TokenService {
  constructor(
    private tokenModel: typeof TokenModel // Thats not good.. Maybe a Repository pattern
  ) { }

  public async list(): Promise<ITokenSchema[]> {
    const tokens = await this.tokenModel.find()
    return tokens
  }

  public async create(tokenDTO: IToken): Promise<ITokenSchema> {
    const token = await this.tokenModel.create(tokenDTO)
    return token
  }
  // @Todo -> Pass responsability to tokenRepository 
  public async findByEmail(email: string): Promise<ITokenSchema> {
    const token = await this.tokenModel.findOne({ email })

    if (!token) {
      throw new Error('Token not found')
    }

    return token
  }

  public async findById(_id: string): Promise<ITokenSchema> {
    const token = await this.tokenModel.findById({ _id })

    if (!token) {
      throw new Error('Token not found')
    }

    return token
  }
  
  public async updateById(_id: string, tokenDTO: IToken): Promise<ITokenSchema> {
    await this.tokenModel
    .updateOne(
      { _id }, 
      tokenDTO
      )
      
      const token = this.findById(_id)
      
      if (!token) {
        throw new Error('Token not found')
      }
      
      return token
    }

  public async deleteById(_id: string): Promise<ITokenSchema> {

    const token = await this.tokenModel.findOneAndDelete({ _id })

    if (!token) {
      throw new Error('Token not found')
    }

    return token
  }
}

export const tokenService = new TokenService(TokenModel)