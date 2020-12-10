import { Router } from 'express'
import { registerOfficeNumberController } from '@/controllers/registerOfficeNumber.controller'
import { adapt } from '@/src/app/adapters/express-handler.adapter'

export class DigitalCertificateRouter {
	public readonly _router: Router = Router()

	constructor() {
		this._router.get('/registerOfficeNumbers', adapt(registerOfficeNumberController.list.bind(registerOfficeNumberController)))
		this._router.post('/registerOfficeNumbers', adapt(registerOfficeNumberController.create.bind(registerOfficeNumberController)))
		this._router.get('/registerOfficeNumbers/:registerOfficeNumber', adapt(registerOfficeNumberController.read.bind(registerOfficeNumberController)))
		this._router.put('/registerOfficeNumbers/:registerOfficeNumber', adapt(registerOfficeNumberController.update.bind(registerOfficeNumberController)))
		this._router.delete('/registerOfficeNumbers/:registerOfficeNumber', adapt(registerOfficeNumberController.delete.bind(registerOfficeNumberController)))
	}
}

export const registerOfficeNumberRouter = new DigitalCertificateRouter()._router