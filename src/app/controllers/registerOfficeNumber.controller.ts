import { IController, IHttpRequest, IHttpResponse } from '@/interfaces/http.interface'
import { registerOfficeNumberService, RegisterOfficeNumberService } from '../services/registerOfficeNumber.service'

export class RegisterOfficeNumberController implements IController {
	constructor(
		private registerOfficeNumberService: RegisterOfficeNumberService
	) { }

	public async list(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const documents = await registerOfficeNumberService.list()
		return {
			message: 'RegisterOfficeNumbers found successfully',
			statusCode: 200,
			content: documents
		}
	}

	public async create(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		return
	}

	public async read(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const register = httpRequest.body.register
		try {
			const document = await registerOfficeNumberService.findByRegisterOfficeNumber(register)
			return {
				message: 'RegisterOfficeNumber found successfully',
				statusCode: 200,
				content: document
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
		const oldRegister = httpRequest.body.oldRegister
		const newRegister = httpRequest.body.newRegister

		try {
			const document = await registerOfficeNumberService.updateByRegisterOfficeNumber(oldRegister, newRegister)
			return {
				message: 'RegisterOfficeNumber updated successfully',
				statusCode: 200,
				content: document
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
		const register = httpRequest.body.register
		try {
			await registerOfficeNumberService.deleteByRegisterOfficeNumber(register)

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