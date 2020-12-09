
import { IDigitalCertificateSchema } from '../../src/app/models/digitalCertificate.model'
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

export class DigitalCertificateRepository extends MongoRepositoryAbstract<IDigitalCertificateSchema> { }

// export class DigitalCertificateRepository extends MongoRepository<typeof DigitalCertificateModel>{

// }