import { Router } from 'express'
import { CNPJController } from '../controllers/CNPJ.controller'
import { adapt } from '@/src/app/adapters/express-handler.adapter'

export class DigitalCertificateRouter {
	public readonly _router: Router = Router()

	constructor() {
		this._router.get('/CNPJ', adapt(CNPJController.list.bind(CNPJController)))
		this._router.post('/CNPJ', adapt(CNPJController.create.bind(CNPJController)))
		this._router.get('/CNPJ/:digitalCertificate_id', adapt(CNPJController.read.bind(CNPJController)))
		this._router.put('/CNPJ/:digitalCertificate_id', adapt(CNPJController.update.bind(CNPJController)))
		this._router.delete('/CNPJ/:digitalCertificate_id', adapt(CNPJController.delete.bind(CNPJController)))
	}
}

export const digitalCertificateRouter = new DigitalCertificateRouter()._router