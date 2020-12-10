import { LeadModel, ILead, ILeadSchema } from "../models/lead.model";

export class CNPJ_Service {
	constructor(
		private leadModel: typeof LeadModel
	) { }

	public async list(): Promise<ILeadSchema[]> {
		const cnpjs = await this.leadModel.find().select('company.cnpj')
		return cnpjs
	}

	public async create(leadDTO: ILead): Promise<ILeadSchema> {
		const cnpj = await this.leadModel.create(leadDTO)
		return cnpj
	}

	public async findByNumber(number: string): Promise<ILeadSchema> {
		const cnpj = await this.leadModel.findOne({
			'company.cnpj': number
		}).select('company')

		if (!cnpj) {
			throw new Error('CNPJ not found')
		}

		return cnpj
	}

	public async updateByNumber(number: string, leadDTO: ILead): Promise<ILeadSchema> {
		await this.leadModel
			.updateOne(
				{ _id: number },
				leadDTO
			)

		const cnpj = this.findByNumber(number)

		if (!cnpj) {
			throw new Error('Lead not found')
		}

		return cnpj
	}

	public async deleteByNumber(number: string): Promise<ILeadSchema> {

		const cnpj = await this.leadModel.findOneAndDelete({ _id: number })

		if (!cnpj) {
			throw new Error('Lead not found')
		}

		return cnpj
	}
}

export const CNPJService = new CNPJ_Service(LeadModel)