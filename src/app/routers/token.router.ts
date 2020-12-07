import { Router } from 'express'
import { tokenController } from '@/controllers/token.controller'
import { adapt } from '@/src/app/adapters/express-handler.adapter'

export class TokenRouter {
    public readonly _router: Router = Router()

    constructor() {
        this._router.get('/tokens', adapt(tokenController.list.bind(tokenController)))
        this._router.post('/tokens', adapt(tokenController.create.bind(tokenController)))
        this._router.get('/tokens/:token_id', adapt(tokenController.read.bind(tokenController)))
        this._router.put('/tokens/:token_id', adapt(tokenController.update.bind(tokenController)))
        this._router.delete('/tokens/:token_id', adapt(tokenController.delete.bind(tokenController)))
    }
}

export const tokenRouter = new TokenRouter()._router