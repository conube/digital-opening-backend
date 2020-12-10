import { IController, IHttpRequest, IHttpResponse } from '@/interfaces/http.interface'
import { ITerms } from '../models/terms.models'
import { termsService, TermsService } from '@/services/termsService.service'

export class TermsController implements IController {
	constructor(
		private termService: TermsService
	) { }

	public async list(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const terms = await termsService.list()
		return {
			message: 'Terms found successfully',
			statusCode: 200,
			content: terms
		}
	}

	public async create(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const termDTO: ITerms = httpRequest.body
		try{
			const term = await termsService.create(termDTO)
			return {
				message: 'Terms created successfully',
				statusCode: 200,
				content: term
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
		const termId = httpRequest.params.term_id
		try {
			const term = await termsService.findById(termId)
			return {
				message: 'Terms found successfully',
				statusCode: 200,
				content: term
			}
		} catch (error) {
			return {
				message: 'Terms not found',
				statusCode: 400,
				content: {}
			}
		}
	}

	public async update(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const termId = httpRequest.params.term_id
		const termInfo = httpRequest.body

		try {
			const term = await termsService.updateById(termId, termInfo)
			return {
				message: 'Terms updated successfully',
				statusCode: 200,
				content: term
			}
		} catch (error) {
			return {
				message: 'Terms not found',
				statusCode: 400,
				content: {}
			}
		}
	}

	public async delete(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const termId = httpRequest.params.term_id
		try {
			await termsService.deleteById(termId)

			return {
				message: 'Terms deleted successfully',
				statusCode: 200,
				content: {}
			}
		} catch (error) {
			return {
				message: 'Terms not found',
				statusCode: 400,
				content: {}
			}
		}
	}
}

export const termsController = new TermsController(termsService)