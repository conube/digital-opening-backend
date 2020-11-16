import { Router } from 'express'

export class UserRouter {
    public readonly _router: Router

    constructor() {
        this._router = Router()
        this._router.get('/users', (req, res) => {
            return res.json({ ok: true })
        })
        this._router.post('/users', () => { })
        this._router.get('/users/:user_id', () => { })
        this._router.put('/users/:user_id', () => { })
        this._router.delete('/users/:user_id', () => { })
    }
}

export const userRouter = new UserRouter()._router