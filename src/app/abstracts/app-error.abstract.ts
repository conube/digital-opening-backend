export abstract class AppError extends Error {
    public statusCode: number

    constructor(message: string, statusCode: number = 500) {
        super(message)
        this.name = this.constructor.name
        this.statusCode = statusCode
    }
}