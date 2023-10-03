const { test, expect, request } = require("@playwright/test")
import postsList from "../data/posts.json"
import ApiHandler from "../modules/ApiHandler"

const baseURL = "https://jsonplaceholder.typicode.com"
const id = 1
const newPost = {
  userId: 99,
  title: "foofoo",
  body: "barbar",
}

test("should run a collection", async () => {
  const ApiRunner = new ApiHandler()

  await ApiRunner.get(`${baseURL}/posts/${id}`).then(({ response, body }) => {
    console.log(body)
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    expect(body.userId).toBe(postsList[id - 1].userId)
    expect(body.id).toBe(postsList[id - 1].id)
    expect(body.title).toBe(postsList[id - 1].title)
    expect(body.body).toBe(postsList[id - 1].body)
  })

  await ApiRunner.post(`${baseURL}/posts/`, newPost).then(
    ({ response, body }) => {
      console.log(body)
      expect(response.ok()).toBeTruthy()
      expect(response.status()).toBe(201)
      expect(body.id).toBe(postsList.length + 1)
      expect(body.userId).toBe(newPost.userId)
      expect(body.title).toBe(newPost.title)
      expect(body.body).toBe(newPost.body)
    }
  )

  await ApiRunner.put(`${baseURL}/posts/${id}`, newPost).then(
    ({ response, body }) => {
      console.log(body)
      expect(response.ok()).toBeTruthy()
      expect(response.status()).toBe(200)
      expect(body.id).toBe(id)
      expect(body.userId).toBe(newPost.userId)
      expect(body.title).toBe(newPost.title)
      expect(body.body).toBe(newPost.body)
    }
  )

  await ApiRunner.patch(`${baseURL}/posts/${id}`, {
    ["title"]: newPost.title,
  }).then(({ response, body }) => {
    console.log(body)
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    expect(body.id).toBe(id)
    expect(body.userId).toBe(postsList.find((post) => post.id === id)?.userId)
    expect(body.title).toBe(newPost.title)
    expect(body.body).toBe(postsList.find((post) => post.id === id)?.body)
  })

  await ApiRunner.delete(`${baseURL}/posts/${id}`).then(
    ({ response, body }) => {
      console.log(body)
      expect(response.ok()).toBeTruthy()
      expect(response.status()).toBe(200)
      expect(body.id).toBeEmpty
    }
  )
})
