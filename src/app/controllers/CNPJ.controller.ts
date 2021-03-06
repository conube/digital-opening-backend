import { IController, IHttpRequest, IHttpResponse } from '@/interfaces/http.interface'
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
		return 
	}

	public async read(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const CNPJNumber = httpRequest.body.cnpj
		try {
			const company = await CNPJService.findByCNPJ(CNPJNumber)
			return {
				message: 'CNPJ found successfully',
				statusCode: 200,
				content: company
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
		const oldCNPJ = httpRequest.body.oldCnpj
		const newCNPJ = httpRequest.body.newCnpj

		try {
			const company = await CNPJService.updateByCNPJ(oldCNPJ, newCNPJ)
			return {
				message: 'CNPJ updated successfully',
				statusCode: 200,
				content: company
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
		const CNPJNumber = httpRequest.body.cnpj
		try {
			await CNPJService.deleteByCPNJ(CNPJNumber)

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