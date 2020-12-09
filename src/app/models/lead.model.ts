import { Document, Schema, model, Types } from 'mongoose'

export interface ILead {
	user_id: String
	stage: []
	type: []
	personal: {}
	document: {},
	company: {}
}

export interface ILeadSchema extends ILead, Document { }

const Media: Schema = new Schema({
	original_name: String,
	filetype: String,
	path: String
})

const LeadSchema: Schema = new Schema({
	user_id: {
		type: Types.ObjectId,
		required: true
	},
	stage: {
		type: [String],
		required: false
	},
	type: {
		type: String,
		enum: ['LAWYER', 'ACCOUNTANT'],
		required: true,
		
	},
	personal: {
		cpf: String
	},
	document: {
		register: String,
		cpf: String,
		media_front: Media,
		media_back: Media
	},
	company: {
		cnpj: String,
		name: String,
		company_name: String,
		activity: String,
		nature: String,
		address: {
			street: String,
			neighbourhood: String,
			number: String,
			city: String,
			cep: String
		}
	}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

export const LeadModel = model<ILeadSchema>('Lead', LeadSchema)