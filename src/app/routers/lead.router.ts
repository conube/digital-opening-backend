import { Router } from 'express'
import { leadController } from './../controllers/lead.controllers';
import { adapt } from '@/src/app/adapters/express-handler.adapter'

export class LeadRouter {
	public readonly _router: Router = Router()

	constructor() {
		this._router.get('/leads', adapt(leadController.list.bind(leadController)))
		this._router.post('/leads', adapt(leadController.create.bind(leadController)))
		this._router.get('/leads/:lead_id', adapt(leadController.read.bind(leadController)))
		this._router.put('/leads/:lead_id', adapt(leadController.update.bind(leadController)))
		this._router.delete('/leads/:lead_id', adapt(leadController.delete.bind(leadController)))
	}
}

export const leadRouter = new LeadRouter()._router