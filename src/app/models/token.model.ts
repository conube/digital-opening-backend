import { Document, Schema, model } from 'mongoose'
import { encryptingService } from '@/services/encrypting.service'

export interface IToken {
  name: String
  email: String
  password: String,
  password_confirmation?: String
  findByEmail: (email: string) => Promise<IToken>
  // password_confirmation: String -> Implement validation with schema validators
  // photo: Media -> Implement Media Document
}

export interface ITokenSchema extends IToken, Document { }

const TokenSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })


TokenSchema.virtual('password_confirmation')

TokenSchema.pre<ITokenSchema>('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await encryptingService.encrypt(this.password as string)
})

export const TokenModel = model<ITokenSchema>('Token', TokenSchema)



