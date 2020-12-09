import { Router } from 'express'
import { digitalCertificateController } from '@/controllers/digitalCertificate.controller'
import { adapt } from '@/src/app/adapters/express-handler.adapter'

export class DigitalCertificateRouter {
	public readonly _router: Router = Router()

	constructor() {
		this._router.get('/digitalCertificates', adapt(digitalCertificateController.list.bind(digitalCertificateController)))
		this._router.post('/digitalCertificates', adapt(digitalCertificateController.create.bind(digitalCertificateController)))
		this._router.get('/digitalCertificates/:digitalCertificate_id', adapt(digitalCertificateController.read.bind(digitalCertificateController)))
		this._router.put('/digitalCertificates/:digitalCertificate_id', adapt(digitalCertificateController.update.bind(digitalCertificateController)))
		this._router.delete('/digitalCertificates/:digitalCertificate_id', adapt(digitalCertificateController.delete.bind(digitalCertificateController)))
	}
}

export const digitalCertificateRouter = new DigitalCertificateRouter()._router