import { Router } from 'express'
import { CNPJController } from '../controllers/CNPJ.controller'
import { adapt } from '@/src/app/adapters/express-handler.adapter'

export class CNPJ_Router {
	public readonly _router: Router = Router()

	constructor() {
		this._router.get('/cnpj', adapt(CNPJController.list.bind(CNPJController)))
		this._router.get('/cnpj/:cnpj', adapt(CNPJController.read.bind(CNPJController)))
		this._router.put('/cnpj/:cnpj', adapt(CNPJController.update.bind(CNPJController)))
		this._router.delete('/cnpj/:cnpj', adapt(CNPJController.delete.bind(CNPJController)))
	}
}

export const CNPJRouter = new CNPJ_Router()._router