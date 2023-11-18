import ApiHandler from "./ApiHandler"

export interface IProduct {
  id: number
  name: string
  description: string
  price: number
}

export default class PostService extends ApiHandler {
  baseURL = "https://api-v4.practicesoftwaretesting.com"

  async getAllProducts() {
    return this.get(`${this.baseURL}/products/`)
  }

  async getProductById<T extends IProduct>(Id: T["id"]) {
    return this.get(`${this.baseURL}/products/${Id}`)
  }

  // should look like this
  // {
  //   "name": "string",
  //   "description": "string",
  //   "price": 1.99,
  //   "category_id": 1,
  //   "brand_id": 1,
  //   "product_image_id": 1,
  //   "is_location_offer": 1,
  //   "is_rental": 0
  // }

  async postProduct(postData: IProduct) {
    return this.post(`${this.baseURL}/posts`, postData)
  }

  async putProductById(id: number, data: IProduct) {
    return this.put(`${this.baseURL}/posts/${id}`, data)
  }

  // async patchProductById(id: number, data: Partial<IProduct>) {
  //   return this.patch(`${this.baseURL}/posts/${id}`, data)
  // }

  async deleteProductById(id: number) {
    return this.delete(`${this.baseURL}/posts/${id}`)
  }
}
