import { Document, Schema, model, Types } from 'mongoose'

export interface ILead {
	user_id: String
	company_id: String
	stage: []
	type: []
	personal: {}
	document: {},
	company: {}
}

export interface ILeadSchema extends ILead, Document { }
const PersonalSchema: Schema = new Schema({
	cpf: String
})

const DocumentSchema: Schema = new Schema({
	register: String,
	cpf: String,
	media_front: Buffer,
	media_back: Buffer
})

const AddressSchema: Schema = new Schema({
	id: Types.ObjectId,
	street: String,
	neighbourhood: String,
	number: String,
	city: String,
	cep: String,
})

const CompanySchema: Schema = new Schema({
	id: String,
	cnpj: String,
	name: String ,
	company_name: String,
	activity: String,
	nature: String,
	address: AddressSchema
})

const LeadSchema: Schema = new Schema({
	user_id: {
		type: Types.ObjectId,
		required: true
	},
	company_id: {
		type: Types.ObjectId,
		required: true
	},
	stage: {
		type: [String],
		required: false
	},
	type: {
		type: [String],
		enum: ['LAWYER', 'ACCOUNTANT'],
		required: true,
		max: 2
	},
	personal: {
		type: PersonalSchema
	},
	document: {
		type: DocumentSchema
	},
	company: {
		type: CompanySchema
	}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

export const LeadModel = model<ILeadSchema>('Lead', LeadSchema)