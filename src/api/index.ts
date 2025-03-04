class ApiClient {
  private baseURL: string | undefined

  constructor() {
    this.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/admin`
  }

  private async request(method: string, endpoint: string, body?: any): Promise<any> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method, body: body ? JSON.stringify(body) : undefined
    })
    
    console.log(response)
    return response
  }

  public get(endpoint: string): Promise<Response> {
    return this.request('GET', endpoint)
  }
}

export const API = new ApiClient()
