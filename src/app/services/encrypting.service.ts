import { hash, compare } from 'bcrypt'

export interface IEncryptStrategy {
  encrypt: (str: string) => Promise<string>
  compare: (str: string, hash: string) => Promise<boolean>
  decrypt?: (str: string) => Promise<string>
}

export interface IEncryptStrategies {
  BCRYPT: IEncryptStrategy
  DEFAULT: IEncryptStrategy
}

export interface IStrategyService<IStrategies> {
  useStrategy: (strategy: keyof IStrategies) => Promise<void>
}

export class BcryptStrategy implements IEncryptStrategy {
  public async encrypt(str: string): Promise<string> {
    const encrypted = await hash(str, 10)
    return encrypted
  }

  public async compare(str: string, hash: string): Promise<boolean> {
    const compared = await compare(str, hash)
    return compared
  }
}

export class EncryptingService implements IStrategyService<IEncryptStrategies> {
  public static _strategies: IEncryptStrategies = {
    BCRYPT: new BcryptStrategy,
    DEFAULT: new BcryptStrategy
  }

  constructor(
    private _strategies: IEncryptStrategies,
    private _strategy: IEncryptStrategy = (_strategies.DEFAULT)
  ) { }

  public async encrypt(str: string): Promise<string> {
    const encrypted = await this._strategy.encrypt(str)
    return encrypted
  }

  public async compare(str: string, hash: string): Promise<boolean> {
    const compared = await this._strategy.compare(str, hash)
    return compared
  }

  public async useStrategy(strategy: keyof IEncryptStrategies): Promise<void> {
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

export const encryptingService = new EncryptingService(EncryptingService._strategies)

