import { RegisterOfficeNumberRouter } from './registerOfficeNumber.router';
import { Router } from 'express'

import { leadRouter } from './lead.router';
import { userRouter } from './user.router'
import { CNPJRouter } from './CNPJ.router'
import { registerOfficeNumberRouter } from './registerOfficeNumber.router'

export class AppRouter {
    public readonly _router: Router

    constructor() {
        this._router = Router()
        this._router.use(userRouter),
        this._router.use(leadRouter),
        this._router.use(CNPJRouter),
        this._router.use(registerOfficeNumberRouter)
    }
}

export const appRouter = new AppRouter()._router