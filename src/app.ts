import './loaders'
import * as express from 'express'
import { appRouter } from '@/routers/index'

export class App {
    public _app: express.Application

    constructor() {
        this._app = express()
        this._app.use(express.json())
        this._app.use(appRouter)
    }
}

export const app = new App()._app