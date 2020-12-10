import { IController, IHttpRequest, IHttpResponse } from '@/interfaces/http.interface'
import { ITerms } from '../models/terms.models'
<<<<<<< HEAD
import { termsService, TermsService } from '../services/terms.service'
=======
import { termsService, TermsService } from '@/services/termsService.service'
>>>>>>> e7838e0d84597d28214eafb420d2991fa6f9facc

export class TermsController implements IController {
	constructor(
		private termService: TermsService
	) { }

<<<<<<< HEAD
=======
	public async list(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const terms = await termsService.list()
		return {
			message: 'Terms found successfully',
			statusCode: 200,
			content: terms
		}
	}
>>>>>>> e7838e0d84597d28214eafb420d2991fa6f9facc

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