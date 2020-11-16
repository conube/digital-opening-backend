import { app } from './app'
import { Application } from 'express'
import { HTTP_HOST, HTTP_PORT } from '@/settings/global.settings'

class Server {
    private _port: string
    private _host: string
    private _app: Application

    // @Todo create an IServerSettings
    constructor(app: Application, settings: { host: string, port: string }) {
        console.log(settings)
        this._app = app
        this._port = settings.port
        this._host = settings.host
        this._app.listen(this._port)
        console.warn(`Running on ${this._host}:${this._port}`)
    }
}

export const server = new Server(app, { host: HTTP_HOST, port: HTTP_PORT })