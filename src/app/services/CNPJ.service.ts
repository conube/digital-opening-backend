import { LeadModel, ILead, ILeadSchema } from "../models/lead.model";

export class CNPJ_Service {
	constructor(
		private leadModel: typeof LeadModel
	) { }

	public async list(): Promise<ILeadSchema[]> {
		const companies = await this.leadModel.find().select('company')
		return companies
	}

	public async findByCNPJ(cnpj: string): Promise<ILeadSchema> {
		const company = await this.leadModel.findOne({
			'company.cnpj': cnpj
		}).select('company')

		if (!company) {
			throw new Error('CNPJ not found')
		}

		return company
	}

	public async updateByCNPJ(oldCNPJ: string, newCNPJ: string): Promise<ILeadSchema> {
		await this.leadModel
			.updateOne(
				{ 'company.cnpj': oldCNPJ },
				{'company.cnpj': newCNPJ}
			)

		const company = this.findByCNPJ(newCNPJ)

		if (!company) {
			throw new Error('Lead not found')
		}

		return company
	}

	public async deleteByCPNJ(cnpj: string): Promise<ILeadSchema> {

		const company = await this.leadModel.findOneAndDelete({ 'company.cnpj': cnpj })

		if (!company) {
			throw new Error('Lead not found')
		}

		return company
	}
}

export const CNPJService = new CNPJ_Service(LeadModel)