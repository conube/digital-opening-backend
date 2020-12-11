import { IController, IHttpRequest, IHttpResponse } from '@/interfaces/http.interface'
import { ILead } from '../models/lead.model'
import { leadService, LeadService } from '@/services/lead.service'

export class LeadController implements IController {
	constructor(
		private leadService: LeadService
	) { }

	public async list(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const leads = await leadService.list()
		return {
			message: 'Leads found successfully',
			statusCode: 200,
			content: leads
		}
	}
	
	public async create(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const leadDTO: ILead = httpRequest.body
		try{
			const lead = await this.leadService.create(leadDTO)

			return {
				message: 'Lead created successfully',
				statusCode: 200,
				content: lead
			}
		} catch(err) {
			return {
				message: `${err}`,
				statusCode: 500,
				content: {}
			}
		}
	}

	public async read(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const leadId = httpRequest.params.lead_id
		try {
			const lead = await leadService.findById(leadId)
			return {
				message: 'Lead found successfully',
				statusCode: 200,
				content: lead
			}
		} catch (error) {
			return {
				message: 'Lead not found',
				statusCode: 400,
				content: {}
			}
		}
	}

	public async update(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const leadId = httpRequest.params.lead_id
		const leadInfo = httpRequest.body

		try {
			
			const lead = await leadService.updateById(leadId, leadInfo)
			return {
				message: 'Lead updated successfully',
				statusCode: 200,
				content: lead
			}
		} catch (error) {
			return {
				message: 'Lead not found',
				statusCode: 400,
				content: {}
			}
		}
	}

	public async delete(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const leadId = httpRequest.params.lead_id
		try {
			await leadService.deleteById(leadId)

			return {
				message: 'Lead deleted successfully',
				statusCode: 200,
				content: {}
			}
		} catch (error) {
			return {
				message: 'Lead not found',
				statusCode: 400,
				content: {}
			}
		}
	}
}

export const leadController = new LeadController(leadService)