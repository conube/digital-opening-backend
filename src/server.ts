import { app } from './app'
import { Application } from 'express'
import { HTTP_HOST, HTTP_PORT } from '@/settings/global.settings'

interface IServerSettings {
    host: string,
    port: string
}

class Server {
    private _port: string
    private _host: string
    private _app: Application

    constructor(app: Application, settings: IServerSettings) {
        this._app = app
        this._port = settings.port
        this._host = settings.host
        this._app.listen(this._port)
        console.warn(`Running on ${this._host}:${this._port}`)
    }
}

export const server = new Server(app, { host: HTTP_HOST, port: HTTP_PORT })