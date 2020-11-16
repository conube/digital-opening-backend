import { hash } from 'bcrypt'

/*
 @Todo 
 - Implement an adapter for bcrypt 
 - Inject that as a dependency
 - Unit tests for this class
*/

export interface ICryptographyStrategy {
    encrypt: (str: string) => Promise<string>
    compare?: (str: string) => Promise<string>
    decrypt?: (str: string) => Promise<string>
}

export interface ICryptographyStrategies {
    BCRYPT: ICryptographyStrategy,
    DEFAULT?: ICryptographyStrategy
}

export class BcryptStrategy implements ICryptographyStrategy {
    public async encrypt(str: string): Promise<string> {
        const encrypted = hash(str, 10)
        return encrypted
    }
}

// @Todo make a `StrategyService` to get even more decoupled
export class CryptographyService {
    constructor(
        protected _strategies: ICryptographyStrategies,
        protected _strategy: ICryptographyStrategy = (_strategies.DEFAULT)
    ) { }

    public async encrypt(str: string): Promise<string> {
        const encrypted = await this._strategy.encrypt(str)
        return encrypted
    }

    public async useStrategy(strategy: keyof ICryptographyStrategies): Promise<void> {
        if (!this._strategies[strategy]) {
            // @Todo create an error to throw when a strategy does not exists 
            throw new Error('Requested strategy does not exist')
        }

        try {
            this._strategy = this._strategies[strategy]
        } catch {
            // @Todo create an error to throw when a problem ocurres on strategy changing
            throw new Error(`Error trying to change the current strategy to ${strategy}`)
        }

    }
}

export const cryptographyService = new CryptographyService(
    {
        BCRYPT: new BcryptStrategy,
        DEFAULT: new BcryptStrategy
    }
)