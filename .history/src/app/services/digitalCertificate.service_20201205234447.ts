import { DigitalCertificateModel, IDigitalCertificate, IDigitalCertificateSchema } from "../models/digitalCertificate.model";

export class DigitalCertificateService {
	constructor(
		private digitalCertificateModel: typeof DigitalCertificateModel
	) { }

	public async list(): Promise<IDigitalCertificateSchema[]> {
		const digitalCertificates =  this.digitalCertificateModel.find();
		return digitalCertificates
	}

	public async create(digitalCertificateDTO: IDigitalCertificate): Promise<IDigitalCertificateSchema> {
		const digitalCertificate = await this.digitalCertificateModel.create(digitalCertificateDTO)
		return digitalCertificate
	}

	public async findById(_id: string): Promise<IDigitalCertificateSchema> {
		const digitalCertificate = await this.digitalCertificateModel.findById({ _id })

		if (!digitalCertificate) {
			throw new Error('DigitalCertificate not found')
		}

		return digitalCertificate
	}

	public async updateById(_id: string, digitalCertificateDTO: IDigitalCertificate): Promise<IDigitalCertificateSchema> {
		await this.digitalCertificateModel
			.updateOne(
				{ _id },
				digitalCertificateDTO
			)

		const digitalCertificate = this.findById(_id)

		if (!digitalCertificate) {
			throw new Error('DigitalCertificate not found')
		}

		return digitalCertificate
	}

	public async deleteById(_id: string): Promise<IDigitalCertificateSchema> {

		const digitalCertificate = await this.digitalCertificateModel.findOneAndDelete({ _id })

		if (!digitalCertificate) {
			throw new Error('DigitalCertificate not found')
		}

		return digitalCertificate
	}
}

export const digitalCertificateService = new DigitalCertificateService(DigitalCertificateModel)