import { LinkerAccountsModel, ILinkerAccounts, ILinkerAccountsSchema } from "../models/linkerAccounts.model";

export class LinkerAccountsService {
	constructor(
		private linkerAccountsModel: typeof LinkerAccountsModel
	) { }

	public async list(): Promise<ILinkerAccountsSchema[]> {
		const linkerAccountss = this.linkerAccountsModel.find();
		//const linkerAccountss = await this.linkerAccountsModel.find();
		return linkerAccountss
	}

	public async create(linkerAccountsDTO: ILinkerAccounts): Promise<ILinkerAccountsSchema> {
		const linkerAccounts = await this.linkerAccountsModel.create(linkerAccountsDTO)
		return linkerAccounts
	}

	public async findById(_id: string): Promise<ILinkerAccountsSchema> {
		const linkerAccounts = this.linkerAccountsModel.findById({ _id })
		//const linkerAccounts = await this.linkerAccountsModel.findById({ _id })

		if (!linkerAccounts) {
			throw new Error('LinkerAccounts not found')
		}

		return linkerAccounts
	}

	public async updateById(_id: string, linkerAccountsDTO: ILinkerAccounts): Promise<ILinkerAccountsSchema> {
		// await this.linkerAccountsModel
		// 	.updateOne(
		// 		{ _id },
		// 		linkerAccountsDTO
		// 	)

			this.linkerAccountsModel
			.updateOne(
				{ _id },
				linkerAccountsDTO
			)

		const linkerAccounts = this.findById(_id)

		if (!linkerAccounts) {
			throw new Error('LinkerAccounts not found')
		}

		return linkerAccounts
	}

	public async deleteById(_id: string): Promise<ILinkerAccountsSchema> {

		//const linkerAccounts = await this.linkerAccountsModel.findOneAndDelete({ _id })
		const linkerAccounts =  this.linkerAccountsModel.findOneAndDelete({ _id })

		if (!linkerAccounts) {
			throw new Error('LinkerAccounts not found')
		}

		return linkerAccounts
	}
}

export const linkerAccountsService = new LinkerAccountsService(LinkerAccountsModel)