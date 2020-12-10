import { IController, IHttpRequest, IHttpResponse } from '@/interfaces/http.interface'
import { ILead } from '../models/lead.model'
import { CNPJService, CNPJ_Service } from '@/services/CNPJ.service'

export class CNPJ_Controller implements IController {
	constructor(
		private CNPJService: CNPJ_Service
	) { }

	public async list(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const CNPJs = await CNPJService.list()
		return {
			message: 'CNPJs found successfully',
			statusCode: 200,
			content: CNPJs
		}
	}

	public async create(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const CNPJDTO: ILead = httpRequest.body
		try{
			const CNPJ = await this.CNPJService.create(CNPJDTO)
			return {
				message: 'CNPJ created successfully',
				statusCode: 200,
				content: CNPJ
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
		const CNPJNumber = httpRequest.params.cnpj
		try {
			const CNPJ = await CNPJService.findByNumber(CNPJNumber)
			return {
				message: 'CNPJ found successfully',
				statusCode: 200,
				content: CNPJ
			}
		} catch (error) {
			return {
				message: 'CNPJ not found',
				statusCode: 400,
				content: {}
			}
		}
	}

	public async update(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const CNPJId = httpRequest.params.CNPJ_id
		const CNPJInfo = httpRequest.body

		try {
			const CNPJ = await CNPJService.updateByNumber(CNPJId, CNPJInfo)
			return {
				message: 'CNPJ updated successfully',
				statusCode: 200,
				content: CNPJ
			}
		} catch (error) {
			return {
				message: 'CNPJ not found',
				statusCode: 400,
				content: {}
			}
		}
	}

	public async delete(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const CNPJId = httpRequest.params.CNPJ_id
		try {
			await CNPJService.deleteByNumber(CNPJId)

			return {
				message: 'CNPJ deleted successfully',
				statusCode: 200,
				content: {}
			}
		} catch (error) {
			return {
				message: 'CNPJ not found',
				statusCode: 400,
				content: {}
			}
		}
	}
}

export const CNPJController = new CNPJ_Controller(CNPJService)