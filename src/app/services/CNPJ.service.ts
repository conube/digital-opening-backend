import { LeadModel, ILead, ILeadSchema } from "../models/lead.model";

export class CNPJ_Service {
	constructor(
		private leadModel: typeof LeadModel
	) { }

	public async list(): Promise<ILeadSchema[]> {
		const leads = await this.leadModel.find()
		return leads
	}

	public async create(leadDTO: ILead): Promise<ILeadSchema> {
		const lead = await this.leadModel.create(leadDTO)
		return lead
	}

	public async findById(_id: string): Promise<ILeadSchema> {
		const lead = await this.leadModel.findById({ _id })

		if (!lead) {
			throw new Error('Lead not found')
		}

		return lead
	}

	public async updateById(_id: string, leadDTO: ILead): Promise<ILeadSchema> {
		await this.leadModel
			.updateOne(
				{ _id },
				leadDTO
			)

		const lead = this.findById(_id)

		if (!lead) {
			throw new Error('Lead not found')
		}

		return lead
	}

	public async deleteById(_id: string): Promise<ILeadSchema> {

		const lead = await this.leadModel.findOneAndDelete({ _id })

		if (!lead) {
			throw new Error('Lead not found')
		}

		return lead
	}
}

export const CNPJService = new CNPJ_Service(LeadModel)