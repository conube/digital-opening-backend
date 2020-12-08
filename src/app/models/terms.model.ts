// import { Document, Schema, model } from 'mongoose'
// import { encryptingService } from '@/services/encrypting.service'

// export interface IUser {
//   type: String
//   version: String
// }

// export interface IUserSchema extends IUser, Document { }

// const UserSchema: Schema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   }
// }, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })


// UserSchema.virtual('password_confirmation')

// UserSchema.pre<IUserSchema>('save', async function (next) {
//   if (!this.isModified('password')) {
//     return next()
//   }

//   this.password = await encryptingService.encrypt(this.password as string)
// })

// export const UserModel = model<IUserSchema>('User', UserSchema)



