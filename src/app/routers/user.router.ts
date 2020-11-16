import { Router } from 'express'
import { userController } from '@/controllers/user.controller'
import { adapt } from '@/src/app/adapters/express-handler.adapter'

export class UserRouter {
    public readonly _router: Router = Router()

    constructor() {
        this._router.get('/users', adapt(userController.list.bind(userController)))
        this._router.post('/users', adapt(userController.create.bind(userController)))
        this._router.get('/users/:user_id', () => { })
        this._router.put('/users/:user_id', () => { })
        this._router.delete('/users/:user_id', () => { })
    }
}

export const userRouter = new UserRouter()._router