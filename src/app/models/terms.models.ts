import { Document, Schema, model } from 'mongoose'

export interface ITerms {
	type: [],
	version: String,
	content: String
}

export interface ITermsSchema extends ITerms, Document { }

const TermsSchema: Schema = new Schema({
	type: {
		type: String,
		enum: ['USE', 'PRIVACY'],
		required: true,
	},
	version: {
		type: 'String',
		required: true
	},
	content: {
		type: 'String',
		required: true
	}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })

export const TermsModel = model<ITermsSchema>('Terms', TermsSchema)