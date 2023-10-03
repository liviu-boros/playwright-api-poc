const { test, expect } = require("@playwright/test")
import postsList from "../data/posts.json"

test.beforeEach(() => {})

const baseURL = "https://jsonplaceholder.typicode.com"
const id = 1
const newPost = {
  userId: 99,
  title: "foofoo",
  body: "barbar",
}

test("should GET a resource", async ({ request }) => {
  const response = await request.get(`${baseURL}/posts/${id}`)

  console.log(await response.json())
  const body = await response.json()

  expect(response.ok()).toBeTruthy()
  expect(response.status()).toBe(200)

  expect(body.userId).toBe(postsList[id - 1].userId)
  expect(body.id).toBe(postsList[id - 1].id)
  expect(body.title).toBe(postsList[id - 1].title)
  expect(body.body).toBe(postsList[id - 1].body)
})

test("should POST a resource", async ({ request }) => {
  const response = await request.post(`${baseURL}baseURL/posts/`, {
    data: newPost,
  })

  console.log(await response.json())
  const body = await response.json()

  expect(response.ok()).toBeTruthy()
  expect(response.status()).toBe(201)

  expect(body.id).toBe(postsList.length + 1)
  expect(body.userId).toBe(newPost.userId)
  expect(body.title).toBe(newPost.title)
  expect(body.body).toBe(newPost.body)
})

test("should PUT a resource", async ({ request }) => {
  const response = await request.put(`${baseURL}/posts/${id}`, {
    data: newPost,
  })

  console.log(await response.json())
  const body = await response.json()

  expect(response.ok()).toBeTruthy()
  expect(response.status()).toBe(200)

  expect(body.id).toBe(id)
  expect(body.userId).toBe(newPost.userId)
  expect(body.title).toBe(newPost.title)
  expect(body.body).toBe(newPost.body)
})

test("should PATCH a resource", async ({ request }) => {
  const response = await request.patch(`${baseURL}/posts/${id}`, {
    data: { ["title"]: newPost.title },
  })

  console.log(await response.json())
  const body = await response.json()

  expect(response.ok()).toBeTruthy()
  expect(response.status()).toBe(200)

  expect(body.id).toBe(id)
  expect(body.userId).toBe(postsList.find((post) => post.id === id)?.userId)
  expect(body.title).toBe(newPost.title)
  expect(body.body).toBe(postsList.find((post) => post.id === id)?.body)
})

test("should DELETE a resource", async ({ request }) => {
  const response = await request.delete(`${baseURL}/posts/${id}`)

  console.log(await response.json())
  const body = await response.json()

  expect(response.ok()).toBeTruthy()
  expect(response.status()).toBe(200)

  expect(body.id).toBeEmpty
})

test("should run a collection - POST + GET", async ({ request }) => {
  const postResponse = await request.post(`${baseURL}/posts/`, {
    data: newPost,
  })

  console.log(await postResponse.json())
  const postBody = await postResponse.json()

  expect(postResponse.ok()).toBeTruthy()
  expect(postResponse.status()).toBe(201)

  expect(postBody.id).toBe(postsList.length + 1)
  expect(postBody.userId).toBe(newPost.userId)
  expect(postBody.title).toBe(newPost.title)
  expect(postBody.body).toBe(newPost.body)

  const getResponse = await request.get(`${baseURL}/posts/${id}`)

  console.log(await getResponse.json())
  const getBody = await getResponse.json()

  expect(getResponse.ok()).toBeTruthy()
  expect(getResponse.status()).toBe(200)

  expect(getBody.userId).toBe(postsList[id - 1].userId)
  expect(getBody.id).toBe(postsList[id - 1].id)
  expect(getBody.title).toBe(postsList[id - 1].title)
  expect(getBody.body).toBe(postsList[id - 1].body)
})
