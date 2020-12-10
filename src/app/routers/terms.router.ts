import { Router } from 'express'
import { termsController } from '@/controllers/terms.controller'
import { adapt } from '@/src/app/adapters/express-handler.adapter'

export class TermsRouter {
	public readonly _router: Router = Router()

	constructor() {
		this._router.post('/terms', adapt(termsController.create.bind(termsController)))
		this._router.get('/terms/:term_id', adapt(termsController.read.bind(termsController)))
	}
}

export const termRouter = new TermsRouter()._router