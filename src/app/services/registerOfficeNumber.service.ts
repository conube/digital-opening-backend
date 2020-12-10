import { LeadModel, ILead, ILeadSchema } from "../models/lead.model";

export class RegisterOfficeNumberService {
	constructor(
		private leadModel: typeof LeadModel
	) { }

	public async list(): Promise<ILeadSchema[]> {
		const documents = await this.leadModel.find().select('document')
		return documents
	}

	public async findByRegisterOfficeNumber(register: string): Promise<ILeadSchema> {
		const document = await this.leadModel.findOne({
			'document.register': register
		}).select('document')

		if (!document) {
			throw new Error('Document not found')
		}

		return document
	}

	public async updateByRegisterOfficeNumber(oldRegister: string, newRegister: string): Promise<ILeadSchema> {
		await this.leadModel
			.updateOne(
				{ 'document.register': oldRegister },
				{ 'document.register': newRegister }
			)
		const document = this.findByRegisterOfficeNumber(newRegister)

		if (!document) {
			throw new Error('Document not found')
		}

		return document
	}

	public async deleteByRegisterOfficeNumber(register: string): Promise<ILeadSchema> {

		const document = await this.leadModel.findOneAndDelete({ 'document.register': register })

		if (!document) {
			throw new Error('Lead not found')
		}

		return document
	}
}

export const registerOfficeNumberService = new RegisterOfficeNumberService(LeadModel)