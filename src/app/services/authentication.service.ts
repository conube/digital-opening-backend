import { EncryptingService, encryptingService } from "./encrypting.service"
import { EncodingService, encodingService } from "./encoding.service"
import { UserService, userService } from "./user.service"
import {
  FirebaseAdminService,
  firebaseAdmin,
} from "./external/firabase.service"

export interface IUserAuthDTO {
  email: string
  password: string
}

export interface IFirebaseAuthDTO {
  token: string
}

export interface IAutheticationService {
  auth: (userAuthDTO: IUserAuthDTO) => Promise<IAuthResponse>
  firebaseAuth: (firebaseAuthDTO: IFirebaseAuthDTO) => Promise<IAuthResponse>
}

export interface IPayload {
  content: object
}

export interface IAuthResponse {
  isAuthenticated: boolean
  jwt?: string
}

export class AuthenticationService implements IAutheticationService {
  constructor(
    private userService: UserService,
    private encryptingService: EncryptingService,
    private encodingService: EncodingService,
    private firebaseAdminService: FirebaseAdminService
  ) { }

  public async auth(userAuthDTO: IUserAuthDTO): Promise<IAuthResponse> {
    const { email, password } = userAuthDTO
    const user = await this.userService.findByEmail(email)
    const compared = await this.encryptingService.compare(
      password,
      user.password as string
    )

    if (!compared) {
      throw new Error("UnauthorizedError")
    }

    const payload: IPayload = {
      content: {
        user_id: user.id,
      },
    }

    const jwt = await this.encodingService.encode(payload)
    const authResponse: IAuthResponse = {
      isAuthenticated: true,
      jwt: jwt
    }

    return authResponse
  }

  public async firebaseAuth(
    firebaseAuthDTO: IFirebaseAuthDTO
  ): Promise<IAuthResponse> {
    const { token } = firebaseAuthDTO
    const { email } = await this.firebaseAdminService.verifyToken(token)
    const user = await this.userService.findByEmail(email)

    if (!user) {
      const response: IAuthResponse = {
        isAuthenticated: true,
      }

      return response
    }

    const payload: IPayload = {
      content: {
        user_id: user.id,
      },
    }

    const jwt = await this.encodingService.encode(payload)

    const authResponse: IAuthResponse = {
      isAuthenticated: true,
      jwt: jwt,
    }

    return authResponse
  }
}

export const authenticationService = new AuthenticationService(
  userService,
  encryptingService,
  encodingService,
  firebaseAdmin
)
