import { RegisterOfficeNumberModel, IRegisterOfficeNumber, IRegisterOfficeNumberSchema } from "../models/registerOfficeNumber.model";

export class RegisterOfficeNumberService {
	constructor(
		private registerOfficeNumberModel: typeof RegisterOfficeNumberModel
	) { }

	public async list(): Promise<IRegisterOfficeNumberSchema[]> {
		const registerOfficeNumbers = this.registerOfficeNumberModel.find();
		//const registerOfficeNumbers = await this.registerOfficeNumberModel.find();
		return registerOfficeNumbers
	}

	public async create(registerOfficeNumberDTO: IRegisterOfficeNumber): Promise<IRegisterOfficeNumberSchema> {
		const registerOfficeNumber = await this.registerOfficeNumberModel.create(registerOfficeNumberDTO)
		return registerOfficeNumber
	}

	public async findById(_id: string): Promise<IRegisterOfficeNumberSchema> {
		const registerOfficeNumber = this.registerOfficeNumberModel.findById({ _id })
		//const registerOfficeNumber = await this.registerOfficeNumberModel.findById({ _id })

		if (!registerOfficeNumber) {
			throw new Error('RegisterOfficeNumber not found')
		}

		return registerOfficeNumber
	}

	public async updateById(_id: string, registerOfficeNumberDTO: IRegisterOfficeNumber): Promise<IRegisterOfficeNumberSchema> {
		// await this.registerOfficeNumberModel
		// 	.updateOne(
		// 		{ _id },
		// 		registerOfficeNumberDTO
		// 	)

			this.registerOfficeNumberModel
			.updateOne(
				{ _id },
				registerOfficeNumberDTO
			)

		const registerOfficeNumber = this.findById(_id)

		if (!registerOfficeNumber) {
			throw new Error('RegisterOfficeNumber not found')
		}

		return registerOfficeNumber
	}

	public async deleteById(_id: string): Promise<IRegisterOfficeNumberSchema> {

		//const registerOfficeNumber = await this.registerOfficeNumberModel.findOneAndDelete({ _id })
		const registerOfficeNumber =  this.registerOfficeNumberModel.findOneAndDelete({ _id })

		if (!registerOfficeNumber) {
			throw new Error('RegisterOfficeNumber not found')
		}

		return registerOfficeNumber
	}
}

export const registerOfficeNumberService = new RegisterOfficeNumberService(RegisterOfficeNumberModel)