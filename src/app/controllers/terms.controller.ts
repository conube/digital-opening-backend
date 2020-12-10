import { IController, IHttpRequest, IHttpResponse } from '@/interfaces/http.interface'
import { ITerms } from '../models/terms.models'
import { termsService, TermsService } from '../services/terms.service'

export class TermsController implements IController {
	constructor(
		private termService: TermsService
	) { }


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
}

export const termsController = new TermsController(termsService)