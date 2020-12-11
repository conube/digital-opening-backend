import { LeadModel, ILead, ILeadSchema } from "../models/lead.model";

export class LeadService {
	constructor(
		private leadModel: typeof LeadModel
	) { }

	public async list(): Promise<ILeadSchema[]> {
		const leads = await this.leadModel.find()
		return leads
	}

	public async create(leadDTO: ILead): Promise<ILeadSchema> {
		const lead = await this.leadModel.create(leadDTO)
			.then(newLead => {
				if (newLead.document['media_front'].original_name){
					newLead.document['media_front'].path = newLead.document['media_front'].original_name + newLead.document['media_front']._id
				}

				if (newLead.document['media_back'].original_name){
					newLead.document['media_back'].path = newLead.document['media_back'].original_name + newLead.document['media_back']._id
				}

				return this.updateById(newLead._id, newLead)
			})
			
		return lead
	}

	public async findById(_id: string): Promise<ILeadSchema> {
		const lead = await this.leadModel.findById({ _id })

		if (!lead) {
			throw new Error('Lead not found')
		}

		return lead
	}

	public async updateById(_id: string, updatedLead: ILead): Promise<ILeadSchema> {
		if (updatedLead.document['media_front'].original_name) {
			updatedLead.document['media_front'].path = updatedLead.document['media_front'].original_name + updatedLead.document['media_front']._id
		}

		if (updatedLead.document['media_back'].original_name) {
			updatedLead.document['media_back'].path = updatedLead.document['media_back'].original_name + updatedLead.document['media_back']._id
		}

		await this.leadModel.updateOne({ _id },updatedLead)

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

export const leadService = new LeadService(LeadModel)