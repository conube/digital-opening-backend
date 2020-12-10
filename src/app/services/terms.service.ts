import { TermsModel, ITerms, ITermsSchema } from "../models/terms.models";

export class TermsService {
	constructor(
		private termsModel: typeof TermsModel
	) { }

	public async create(termsDTO: ITerms): Promise<ITermsSchema> {
		const terms = await this.termsModel.create(termsDTO)
		return terms
	}

	public async findById(_id: string): Promise<ITermsSchema> {
		const terms = await this.termsModel.findById({ _id })

		if (!terms) {
			throw new Error('Terms not found')
		}
		return terms
	}

}

export const termsService = new TermsService(TermsModel)