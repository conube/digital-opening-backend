import { Router } from 'express'
import { registerOfficeNumberController } from '../controllers/registerOfficeNumber.controller'
import { adapt } from '@/src/app/adapters/express-handler.adapter'

export class RegisterOfficeNumberRouter {
	public readonly _router: Router = Router()

	constructor() {
		this._router.get('/registerOfficeNumbers', adapt(registerOfficeNumberController.list.bind(registerOfficeNumberController)))
		this._router.get('/registerOfficeNumber', adapt(registerOfficeNumberController.read.bind(registerOfficeNumberController)))
		this._router.put('/registerOfficeNumber', adapt(registerOfficeNumberController.update.bind(registerOfficeNumberController)))
		this._router.delete('/registerOfficeNumber', adapt(registerOfficeNumberController.delete.bind(registerOfficeNumberController)))
	}
}

export const registerOfficeNumberRouter = new RegisterOfficeNumberRouter()._router