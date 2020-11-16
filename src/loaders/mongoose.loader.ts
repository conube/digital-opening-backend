import { Mongoose, connect, connection } from 'mongoose'
import { DatabaseSettings } from '@/settings/database.settings'
import { ILoader } from '../interfaces/loader.interface'

export class MongooseLoader implements ILoader {
    private _connection: Mongoose

    public async load(): Promise<void> {
        if (!this._connection) {
            try {
                this._connection = await connect(DatabaseSettings.DATABASE_URL, { useNewUrlParser: true })
            } catch {
                throw new Error('Error trying to connect with mongodb')
            }
        }

        connection.on('disconnect', this.load)
    }
}

export const mongooseLoader = new MongooseLoader()