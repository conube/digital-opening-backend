import { IController, IHttpRequest, IHttpResponse } from '@/interfaces/http.interface'
import { ILinkerAccounts } from '../models/linkerAccounts.model'
import { linkerAccountsService, LinkerAccountsService } from '@/services/linkerAccounts.service'

export class LinkerAccountsController implements IController {
	constructor(
		private linkerAccountsService: LinkerAccountsService
	) { }

	public async list(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const linkerAccountss = await linkerAccountsService.list()
		return {
			message: 'LinkerAccountss found successfully',
			statusCode: 200,
			content: linkerAccountss
		}
	}

	public async create(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const linkerAccountsDTO: ILinkerAccounts = httpRequest.body
		try{
			const linkerAccounts = await this.linkerAccountsService.create(linkerAccountsDTO)
			return {
				message: 'LinkerAccounts created successfully',
				statusCode: 200,
				content: linkerAccounts
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
		const linkerAccountsId = httpRequest.params.linkerAccounts_id
		try {
			const linkerAccounts = await linkerAccountsService.findById(linkerAccountsId)
			return {
				message: 'LinkerAccounts found successfully',
				statusCode: 200,
				content: linkerAccounts
			}
		} catch (error) {
			return {
				message: 'LinkerAccounts not found',
				statusCode: 400,
				content: {}
			}
		}
	}

	public async update(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const linkerAccountsId = httpRequest.params.linkerAccounts_id
		const linkerAccountsInfo = httpRequest.body

		try {
			const linkerAccounts = await linkerAccountsService.updateById(linkerAccountsId, linkerAccountsInfo)
			return {
				message: 'LinkerAccounts updated successfully',
				statusCode: 200,
				content: linkerAccounts
			}
		} catch (error) {
			return {
				message: 'LinkerAccounts not found',
				statusCode: 400,
				content: {}
			}
		}
	}

	public async delete(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const linkerAccountsId = httpRequest.params.linkerAccounts_id
		try {
			await linkerAccountsService.deleteById(linkerAccountsId)

			return {
				message: 'LinkerAccounts deleted successfully',
				statusCode: 200,
				content: {}
			}
		} catch (error) {
			return {
				message: 'LinkerAccounts not found',
				statusCode: 400,
				content: {}
			}
		}
	}
}

export const linkerAccountsController = new LinkerAccountsController(linkerAccountsService)