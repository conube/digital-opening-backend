import { IController, IHttpRequest, IHttpResponse } from '@/interfaces/http.interface'
import { ILead } from '../models/lead.model'
import { leadService, LeadService } from '@/services/lead.service'

export class DigitalCertificateController implements IController {
	constructor(
		private leadService: LeadService
	) { }

	public async list(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const digitalCertificates = await leadService.list()
		return {
			message: 'DigitalCertificates found successfully',
			statusCode: 200,
			content: digitalCertificates
		}
	}

	public async create(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const digitalCertificateDTO: ILead = httpRequest.body
		try{
			const digitalCertificate = await this.leadService.create(digitalCertificateDTO)
			return {
				message: 'DigitalCertificate created successfully',
				statusCode: 200,
				content: digitalCertificate
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
		const digitalCertificateId = httpRequest.params.digitalCertificate_id
		try {
			const digitalCertificate = await leadService.findById(digitalCertificateId)
			return {
				message: 'DigitalCertificate found successfully',
				statusCode: 200,
				content: digitalCertificate
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
		const digitalCertificateId = httpRequest.params.digitalCertificate_id
		const digitalCertificateInfo = httpRequest.body

		try {
			const digitalCertificate = await leadService.updateById(digitalCertificateId, digitalCertificateInfo)
			return {
				message: 'DigitalCertificate updated successfully',
				statusCode: 200,
				content: digitalCertificate
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
		const digitalCertificateId = httpRequest.params.digitalCertificate_id
		try {
			await leadService.deleteById(digitalCertificateId)

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

export const digitalCertificateController = new DigitalCertificateController(leadService)