import ApiHandler from "./ApiHandler"

export interface IPost {
  id: number
  userId: number
  title: string
  body: string
}

export default class PostService extends ApiHandler {
  baseURL = "https://jsonplaceholder.typicode.com"

  async getPost(postId: number) {
    return this.get(`${this.baseURL}/posts/${postId}`)
  }

  async createPost(postData: IPost) {
    return this.post(`${this.baseURL}/posts`, postData)
  }

  async updatePost(postId: number, postData: IPost) {
    return this.put(`${this.baseURL}/posts/${postId}`, postData)
  }

  async updatePostKey(postId: number, postData: Partial<IPost>) {
    return this.patch(`${this.baseURL}/posts/${postId}`, postData)
  }

  async deletePost(postId: number) {
    return this.delete(`${this.baseURL}/posts/${postId}`)
  }
}
