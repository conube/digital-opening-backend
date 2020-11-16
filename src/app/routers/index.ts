import { Router } from 'express'

import { userRouter } from './user.router'

export class AppRouter {
    public readonly _router: Router

    constructor() {
        this._router = Router()
        this._router.use(userRouter)
    }
}

export const appRouter = new AppRouter()._router