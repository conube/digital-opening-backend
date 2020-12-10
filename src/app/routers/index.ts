import { Router } from 'express'

import { leadRouter } from './lead.router';
import { userRouter } from './user.router'
import { CNPJRouter } from './CNPJ.router'

export class AppRouter {
    public readonly _router: Router

    constructor() {
        this._router = Router()
        this._router.use(userRouter),
        this._router.use(leadRouter),
        this._router.use(CNPJRouter)
    }
}

export const appRouter = new AppRouter()._router