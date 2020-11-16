import { Document, Schema, model } from 'mongoose'
import { cryptographyService } from '@/services/cryptography.service'

export interface IUser {
  name: String
  email: String
  password: String,
  password_confirmation?: String
  findByEmail: (email: string) => Promise<IUser>
  // password_confirmation: String -> Implement validation with schema validators
  // photo: Media -> Implement Media Document
}

export interface IUserSchema extends IUser, Document { }

const UserSchema: Schema = new Schema({
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


UserSchema.virtual('password_confirmation')

UserSchema.pre<IUserSchema>('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = await cryptographyService.encrypt(this.password as string)
})

export const UserModel = model<IUserSchema>('User', UserSchema)



