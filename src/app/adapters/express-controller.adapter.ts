import { IHttpRequest, IHttpResponse } from '@/src/interfaces/http.interface'
import { Request, Response } from 'express'

export class ExpressHandlerAdapter {
    public adapt(handler: (httpRequest: IHttpRequest) => Promise<IHttpResponse>) {
        return async (expressRequest: Request, expressResponse: Response) => {
            const { body, query, params } = expressRequest
            const response = await handler({ body, query, params })

            const responseBody = {
                message: response.message,
                statusCode: response.statusCode,
                content: response.content
            }

            return expressResponse
                .status(response.statusCode)
                .json(responseBody)
        }
    }
}

export const expressHandlerAdapter = new ExpressHandlerAdapter() 