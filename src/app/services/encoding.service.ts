import { hash, compare } from 'bcrypt'
import { IPayload } from './authentication.service'

export interface IStrategyService<IStrategies> {
  useStrategy: (strategy: keyof IStrategies) => Promise<void>
}

export interface IEncodingStrategy {
  encode: (payload: IPayload) => Promise<string>
  decode: (encoded: string) => Promise<IPayload>
}

export interface IEncodingStrategies {
  JWT: IEncodingStrategy
  DEFAULT: IEncodingStrategy
}

export class JWTStrategy implements IEncodingStrategy {
  public async encode(payload: IPayload): Promise<string> { return 'encoded' }
  public async decode(encoded: string): Promise<IPayload> { return { content: { name: 'hellow' } } }
}

export class EncodingService implements IStrategyService<IEncodingStrategies> {
  public static _strategies: IEncodingStrategies = {
    JWT: new JWTStrategy,
    DEFAULT: new JWTStrategy
  }

  constructor(
    private _strategies: IEncodingStrategies,
    private _strategy: IEncodingStrategy = (_strategies.DEFAULT)
  ) { }

  public async encode(payload: IPayload): Promise<string> {
    const encoded = await this._strategy.encode(payload)
    return encoded
  }

  public async decoded(encoded: string): Promise<IPayload> {
    const decoded = await this._strategy.decode(encoded)
    return decoded
  }

  public async useStrategy(strategy: keyof IEncodingStrategies): Promise<void> {
    if (!this._strategies[strategy]) {
      // @Todo create an error to throw when a strategy does not exists 
      throw new Error('StrategyNotFoundError')
    }

    try {
      this._strategy = this._strategies[strategy]
    } catch {
      // @Todo create an error to throw when a problem ocurres on strategy changing
      throw new Error(`StrategyNotInitializedError`)
    }
  }
}

export const encodingService = new EncodingService(EncodingService._strategies)

