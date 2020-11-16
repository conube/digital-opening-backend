import { hash } from 'bcrypt'

/*
 @Todo 
 - Implement an adapter for bcrypt 
 - Inject that as a dependency
 - Unit tests for this class
*/
export class CryptographyService {
    public async encrypt(string: string | String): Promise<string> {
        const hashed = await hash(string, 10)
        return hashed
    }
}

export const cryptographyService = new CryptographyService()