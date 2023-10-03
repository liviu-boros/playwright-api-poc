const { request } = require("@playwright/test")

export default class ApiHandler {
  // request = {}
  // constructor(request) {
  //   this.request = request
  // }

  async get(url: string) {
    const contextRequest = await request.newContext()
    const response = await contextRequest.get(url)
    const body = await response.json()
    return { response, body }
  }

  async post(url: string, data: Object) {
    const contextRequest = await request.newContext()
    const response = await contextRequest.post(url, { data: data })
    const body = await response.json()
    return { response, body }
  }

  async put(url: string, data: Object) {
    const contextRequest = await request.newContext()
    const response = await contextRequest.put(url, { data: data })
    const body = await response.json()
    return { response, body }
  }

  async patch(url: string, data: Object) {
    const contextRequest = await request.newContext()
    const response = await contextRequest.patch(url, { data: data })
    const body = await response.json()
    return { response, body }
  }

  async delete(url: string) {
    const contextRequest = await request.newContext()
    const response = await contextRequest.delete(url)
    const body = await response.json()
    return { response, body }
  }
}
