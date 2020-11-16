import { EncryptingService, encryptingService } from './encrypting.service'
import { EncodingService, encodingService } from './encoding.service'
import { UserService, userService } from './user.service'

export interface IUserAuthDTO {
  email: string,
  password: string
}

export interface IAutheticationService {
  auth: (userAuthDTO: IUserAuthDTO) => Promise<string>
  // authFirebase: (token: string) => Promise<string>  
}

export interface IPayload {
  content: object
}

export class AuthenticationService implements IAutheticationService {
  constructor(
    private userService: UserService,
    private encryptingService: EncryptingService,
    private encodingService: EncodingService
  ) { }

  public async auth(userAuthDTO: IUserAuthDTO): Promise<string> {
    const { email, password } = userAuthDTO
    const user = await this.userService.findByEmail(email)
    const compared = await this.encryptingService.compare(password, user.password as string)

    if (!compared) {
      throw new Error('UnauthorizedError')
    }

    const payload: IPayload = {
      content: {
        user_id: user.id
      }
    }

    const jwt = await this.encodingService.encode(payload)
    return jwt
  }
}

export const authenticationService = new AuthenticationService(userService, encryptingService, encodingService)