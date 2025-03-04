import { cookies } from 'next/headers'

class ApiClient {
  private baseURL: string | undefined

  constructor() {
    this.baseURL = `${process.env.NEXT_PUBLIC_API_URL}/admin`
  }

  private async request(method: string, endpoint: string, body?: any): Promise<any> {
    const cookieStore = await cookies()
    const token = cookieStore.get('HOST_OWNER_TOKEN')?.value

    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      // next: { revalidate: revalidate },
      method, headers, body: body ? JSON.stringify(body) : undefined
    })

    return response
  }


  public get(endpoint: string): Promise<Response> {
    return this.request('GET', endpoint)
  }


  public async hasToken(): Promise<boolean> {
    const cookieStore = await cookies()
    const token = cookieStore.get('HOST_OWNER_TOKEN')?.value

    return !!token
  }
}

export const API = new ApiClient()
