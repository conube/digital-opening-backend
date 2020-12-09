import { Document, Schema, model, Types } from 'mongoose'

export interface IDigitalCertificate {
	user_id: String
	stage: []
	type: []
	personal: {}
	document: {},
	company: {}
}

export interface IDigitalCertificateSchema extends IDigitalCertificate, Document { }
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
	street: String,
	neighbourhood: String,
	number: String,
	city: String,
	cep: String,
})

const CompanySchema: Schema = new Schema({
	cnpj: String,
	name: String ,
	company_name: String,
	activity: String,
	nature: String,
	address: AddressSchema
})

const DigitalCertificateSchema: Schema = new Schema({
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
		type: PersonalSchema
	},
	document: {
		type: DocumentSchema
	},
	company: {
		type: CompanySchema
	}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

export const DigitalCertificateModel = model<IDigitalCertificateSchema>('DigitalCertificate', DigitalCertificateSchema)