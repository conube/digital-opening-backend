import { Mongoose, connect, connection } from 'mongoose'
import { MONGO_DB_URI } from '@/settings/database.settings'
import { ILoader } from '../interfaces/loader.interface'

export class MongooseLoader implements ILoader {
    private _connection: Mongoose

    public async load(): Promise<void> {
        if (!this._connection) {
            try {
                this._connection = await connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
                console.warn('Mongodb connected successfully')
            } catch (error) {
                console.log(error)
                throw new Error('Error trying to connect with mongodb')
            }
        }

        connection.on('disconnect', this.load)
    }
}

export const mongooseLoader = new MongooseLoader()