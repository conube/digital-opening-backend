import { IController, IHttpRequest, IHttpResponse } from '@/interfaces/http.interface'
import { IRegisterOfficeNumber } from '../models/registerOfficeNumber.model'
import { registerOfficeNumberService, RegisterOfficeNumberService } from '@/services/registerOfficeNumber.service'

export class RegisterOfficeNumberController implements IController {
	constructor(
		private registerOfficeNumberService: RegisterOfficeNumberService
	) { }

	public async list(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const registerOfficeNumbers = await registerOfficeNumberService.list()
		return {
			message: 'RegisterOfficeNumbers found successfully',
			statusCode: 200,
			content: registerOfficeNumbers
		}
	}

	public async create(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const registerOfficeNumberDTO: IRegisterOfficeNumber = httpRequest.body
		try{
			const registerOfficeNumber = await this.registerOfficeNumberService.create(registerOfficeNumberDTO)
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
			const registerOfficeNumber = await registerOfficeNumberService.findById(registerOfficeNumberId)
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
			const registerOfficeNumber = await registerOfficeNumberService.updateById(registerOfficeNumberId, registerOfficeNumberInfo)
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
			await registerOfficeNumberService.deleteById(registerOfficeNumberId)

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

export const registerOfficeNumberController = new RegisterOfficeNumberController(registerOfficeNumberService)