import './loaders'
import * as express from 'express'

class App {
    public _app: express.Application

    constructor() {
        this._app.use(express.json())
        this._app.use()
    }
}