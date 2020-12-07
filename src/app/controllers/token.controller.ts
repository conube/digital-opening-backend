import { IController, IHttpRequest, IHttpResponse } from '@/interfaces/http.interface'
import { IToken } from '../models/token.model'
import { tokenService, TokenService } from '@/services/token.service'

export class TokenController implements IController {
	constructor(
		private tokenService: TokenService
	) { }

	public async list(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const tokens = await tokenService.list()
		return {
			message: 'Tokens found successfully',
			statusCode: 200,
			content: tokens
		}
	}

	public async create(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const tokenDTO: IToken = httpRequest.body
		try{
			const token = await this.tokenService.create(tokenDTO)
			return {
				message: 'Token created successfully',
				statusCode: 200,
				content: token
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
		const tokenId = httpRequest.params.token_id
		try {
			const token = await tokenService.findById(tokenId)
			return {
				message: 'Token found successfully',
				statusCode: 200,
				content: token
			}
		} catch (error) {
			return {
				message: 'Token not found',
				statusCode: 400,
				content: {}
			}
		}
	}

	public async update(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const tokenId = httpRequest.params.token_id
		const tokenInfo = httpRequest.body

		try {
			const token = await tokenService.updateById(tokenId, tokenInfo)
			return {
				message: 'Token updated successfully',
				statusCode: 200,
				content: token
			}
		} catch (error) {
			return {
				message: 'Token not found',
				statusCode: 400,
				content: {}
			}
		}
	}

	public async delete(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const tokenId = httpRequest.params.token_id
		try {
			await tokenService.deleteById(tokenId)

			return {
				message: 'Token deleted successfully',
				statusCode: 200,
				content: {}
			}
		} catch (error) {
			return {
				message: 'Token not found',
				statusCode: 400,
				content: {}
			}
		}
	}
}

export const tokenController = new TokenController(tokenService)