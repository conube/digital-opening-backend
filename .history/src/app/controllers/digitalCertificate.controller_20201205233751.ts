import { IController, IHttpRequest, IHttpResponse } from '@/interfaces/http.interface'
import { IDigitalCertificate } from '../models/lead.model'
import { leadService, DigitalCertificateService } from '@/services/lead.service'

export class DigitalCertificateController implements IController {
	constructor(
		private leadService: DigitalCertificateService
	) { }

	public async list(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const leads = await leadService.list()
		return {
			message: 'DigitalCertificates found successfully',
			statusCode: 200,
			content: leads
		}
	}

	public async create(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const leadDTO: IDigitalCertificate = httpRequest.body
		try{
			const lead = await this.leadService.create(leadDTO)
			return {
				message: 'DigitalCertificate created successfully',
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
				message: 'DigitalCertificate found successfully',
				statusCode: 200,
				content: lead
			}
		} catch (error) {
			return {
				message: 'DigitalCertificate not found',
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
				message: 'DigitalCertificate updated successfully',
				statusCode: 200,
				content: lead
			}
		} catch (error) {
			return {
				message: 'DigitalCertificate not found',
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
				message: 'DigitalCertificate deleted successfully',
				statusCode: 200,
				content: {}
			}
		} catch (error) {
			return {
				message: 'DigitalCertificate not found',
				statusCode: 400,
				content: {}
			}
		}
	}
}

export const leadController = new DigitalCertificateController(leadService)