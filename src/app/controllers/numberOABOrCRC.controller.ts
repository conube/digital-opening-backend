import { IController, IHttpRequest, IHttpResponse } from '@/interfaces/http.interface'
import { INumberOABOrCRC } from '../models/numberOABOrCRC.model'
import { numberOABOrCRCService, NumberOABOrCRCService } from '@/services/numberOABOrCRC.service'

export class NumberOABOrCRCController implements IController {
	constructor(
		private numberOABOrCRCService: NumberOABOrCRCService
	) { }

	public async list(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const numberOABOrCRCs = await numberOABOrCRCService.list()
		return {
			message: 'NumberOABOrCRCs found successfully',
			statusCode: 200,
			content: numberOABOrCRCs
		}
	}
	
	// mounts the path using the id and the original_name
	private addPathToNumberOABOrCRCMedia(numberOABOrCRC: INumberOABOrCRC, numberOABOrCRCFromApi: Object): INumberOABOrCRC {
		const doc = numberOABOrCRCFromApi ? numberOABOrCRCFromApi['document'] : numberOABOrCRC['document']
		const mediaFront = doc['media_front']
		const mediaBack = doc['media_back']

		numberOABOrCRC['document']['media_front'].path = mediaFront.original_name + numberOABOrCRC['document']['media_front']._id
		numberOABOrCRC['document']['media_back'].path = mediaBack.original_name + numberOABOrCRC['document']['media_back']._id
		return numberOABOrCRC
	}

	public async create(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const numberOABOrCRCDTO: INumberOABOrCRC = httpRequest.body
		try{
			const createdNumberOABOrCRC = await this.numberOABOrCRCService.create(numberOABOrCRCDTO)
			const updatedNumberOABOrCRC = this.addPathToNumberOABOrCRCMedia(createdNumberOABOrCRC, {}) 

			const numberOABOrCRC = await numberOABOrCRCService.updateById(updatedNumberOABOrCRC['_id'], updatedNumberOABOrCRC)

			return {
				message: 'NumberOABOrCRC created successfully',
				statusCode: 200,
				content: numberOABOrCRC
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
		const numberOABOrCRCId = httpRequest.params.numberOABOrCRC_id
		try {
			const numberOABOrCRC = await numberOABOrCRCService.findById(numberOABOrCRCId)
			return {
				message: 'NumberOABOrCRC found successfully',
				statusCode: 200,
				content: numberOABOrCRC
			}
		} catch (error) {
			return {
				message: 'NumberOABOrCRC not found',
				statusCode: 400,
				content: {}
			}
		}
	}

	public async update(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const numberOABOrCRCId = httpRequest.params.numberOABOrCRC_id
		const numberOABOrCRCInfo = httpRequest.body

		try {
			const foundNumberOABOrCRC = await numberOABOrCRCService.findById(numberOABOrCRCId)
			const updatedNumberOABOrCRC = this.addPathToNumberOABOrCRCMedia(foundNumberOABOrCRC, numberOABOrCRCInfo) 
			
			const numberOABOrCRC = await numberOABOrCRCService.updateById(numberOABOrCRCId, updatedNumberOABOrCRC)
			return {
				message: 'NumberOABOrCRC updated successfully',
				statusCode: 200,
				content: numberOABOrCRC
			}
		} catch (error) {
			return {
				message: 'NumberOABOrCRC not found',
				statusCode: 400,
				content: {}
			}
		}
	}

	public async delete(httpRequest: IHttpRequest): Promise<IHttpResponse> {
		const numberOABOrCRCId = httpRequest.params.numberOABOrCRC_id
		try {
			await numberOABOrCRCService.deleteById(numberOABOrCRCId)

			return {
				message: 'NumberOABOrCRC deleted successfully',
				statusCode: 200,
				content: {}
			}
		} catch (error) {
			return {
				message: 'NumberOABOrCRC not found',
				statusCode: 400,
				content: {}
			}
		}
	}
}

export const numberOABOrCRCController = new NumberOABOrCRCController(numberOABOrCRCService)