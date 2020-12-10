import { Document } from 'mongoose';
import { IController, IHttpRequest, IHttpResponse } from '@/interfaces/http.interface'
import { ILead } from '../models/lead.model'
import { leadService, LeadService } from '../services/lead.service'

export class RegisterOfficeNumberController implements IController {
	constructor(
		private leadService: LeadService
	) { }

	public async list(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const registerOfficeNumbers = await leadService.list()
		return {
			message: 'RegisterOfficeNumbers found successfully',
			statusCode: 200,
			content: registerOfficeNumbers
		}
	}

	public async create(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const registerOfficeNumberDTO: ILead = httpRequest.body.document.registerOfficeNumber
		try{
			const registerOfficeNumber = await this.leadService.create(registerOfficeNumberDTO)
			return {
				message: 'RegisterOfficeNumber created successfully',
				statusCode: 200,
				content: registerOfficeNumber
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
		const registerOfficeNumberId = httpRequest.params.registerOfficeNumber_id
		try {
			const registerOfficeNumber = await leadService.findById(registerOfficeNumberId)
			return {
				message: 'RegisterOfficeNumber found successfully',
				statusCode: 200,
				content: registerOfficeNumber
			}
		} catch (error) {
			return {
				message: 'RegisterOfficeNumber not found',
				statusCode: 400,
				content: {}
			}
		}
	}

	public async update(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const registerOfficeNumberId = httpRequest.params.registerOfficeNumber_id
		const registerOfficeNumberInfo = httpRequest.body

		try {
			const registerOfficeNumber = await leadService.updateById(registerOfficeNumberId, registerOfficeNumberInfo)
			return {
				message: 'RegisterOfficeNumber updated successfully',
				statusCode: 200,
				content: registerOfficeNumber
			}
		} catch (error) {
			return {
				message: 'RegisterOfficeNumber not found',
				statusCode: 400,
				content: {}
			}
		}
	}

	public async delete(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const registerOfficeNumberId = httpRequest.params.registerOfficeNumber_id
		try {
			await leadService.deleteById(registerOfficeNumberId)

			return {
				message: 'RegisterOfficeNumber deleted successfully',
				statusCode: 200,
				content: {}
			}
		} catch (error) {
			return {
				message: 'RegisterOfficeNumber not found',
				statusCode: 400,
				content: {}
			}
		}
	}
}

export const registerOfficeNumberController = new RegisterOfficeNumberController(leadService)