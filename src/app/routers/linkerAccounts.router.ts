import { Router } from 'express'
import { linkerAccountsController } from '@/controllers/linkerAccounts.controller'
import { adapt } from '@/src/app/adapters/express-handler.adapter'

export class LinkerAccountsRouter {
	public readonly _router: Router = Router()

	constructor() {
		this._router.get('/linkerAccounts', adapt(linkerAccountsController.list.bind(linkerAccountsController)))
		this._router.post('/linkerAccounts', adapt(linkerAccountsController.create.bind(linkerAccountsController)))
		this._router.get('/linkerAccounts/:linkerAccounts_id', adapt(linkerAccountsController.read.bind(linkerAccountsController)))
		this._router.put('/linkerAccounts/:linkerAccounts_id', adapt(linkerAccountsController.update.bind(linkerAccountsController)))
		this._router.delete('/linkerAccounts/:linkerAccounts_id', adapt(linkerAccountsController.delete.bind(linkerAccountsController)))
	}
}

export const linkerAccountsRouter = new LinkerAccountsRouter()._router