export interface IHttpRequest {
  body: any
  query: any
  params: any
}

export interface IHttpResponse {
  message: string
  statusCode: number
  content?: object
}

export interface IController {
  list?: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
  create?: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
  read?: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
  update?: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
  delete?: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}


