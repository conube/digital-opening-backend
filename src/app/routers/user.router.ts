import { Router } from 'express'
import { userController } from '@/controllers/user.controller'
import { expressHandlerAdapter } from '@/adapters/express-controller.adapter'


export class UserRouter {
    public readonly _router: Router

    constructor() {
        this._router = Router()
        this._router.get('/users', expressHandlerAdapter.adapt(userController.list))
        this._router.post('/users', expressHandlerAdapter.adapt(userController.create))
        // @Todo implement other routes
        this._router.get('/users/:user_id', () => { })
        this._router.put('/users/:user_id', () => { })
        this._router.delete('/users/:user_id', () => { })
    }
}

export const userRouter = new UserRouter()._router