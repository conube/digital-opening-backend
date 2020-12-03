import { Router } from 'express'

import { leadRouter } from './lead.router';
import { userRouter } from './user.router'

export class AppRouter {
    public readonly _router: Router

    constructor() {
        this._router = Router()
        this._router.use(userRouter),
        this._router.use(leadRouter)
    }
}

export const appRouter = new AppRouter()._router