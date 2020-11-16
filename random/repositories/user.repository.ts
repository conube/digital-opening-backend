
import { IUserSchema } from '../../src/app/models/user.model'
import { Document, Model } from 'mongoose'

export abstract class MongoRepositoryAbstract<T extends Document> {
    constructor(
        protected readonly _model: Model<T>
    ) { }

    protected async findAll(): Promise<T[]> {
        throw new Error('Not implemented method')
    }

    protected async findOne(): Promise<T> {
        throw new Error('Not implemented method')
    }
}

export class UserRepository extends MongoRepositoryAbstract<IUserSchema> { }

// export class UserRepository extends MongoRepository<typeof UserModel>{

// }