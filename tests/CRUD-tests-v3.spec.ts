const { test, expect } = require("@playwright/test")
import postsList from "../data/posts.json"
import PostService, { IPost } from "../modules/PostsApiService"

const newPost: IPost = {
  id: 1,
  userId: 99,
  title: "foofoo",
  body: "barbar",
}

test("should run a collection", async () => {
  const PostRunner = new PostService()

  await PostRunner.getPost(newPost.id).then(({ response, body }) => {
    console.log(body)
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    expect(body.userId).toBe(postsList[newPost.id - 1].userId)
    expect(body.id).toBe(postsList[newPost.id - 1].id)
    expect(body.title).toBe(postsList[newPost.id - 1].title)
    expect(body.body).toBe(postsList[newPost.id - 1].body)
  })

  await PostRunner.createPost(newPost).then(({ response, body }) => {
    console.log(body)
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(201)
    expect(body.id).toBe(postsList.length + 1)
    expect(body.userId).toBe(newPost.userId)
    expect(body.title).toBe(newPost.title)
    expect(body.body).toBe(newPost.body)
  })

  await PostRunner.updatePost(newPost.id, newPost).then(
    ({ response, body }) => {
      console.log(body)
      expect(response.ok()).toBeTruthy()
      expect(response.status()).toBe(200)
      expect(body.id).toBe(newPost.id)
      expect(body.userId).toBe(newPost.userId)
      expect(body.title).toBe(newPost.title)
      expect(body.body).toBe(newPost.body)
    }
  )

  await PostRunner.updatePostKey(newPost.id, { title: newPost.title }).then(
    ({ response, body }) => {
      console.log(body)
      expect(response.ok()).toBeTruthy()
      expect(response.status()).toBe(200)
      expect(body.id).toBe(newPost.id)
      expect(body.userId).toBe(
        postsList.find((post) => post.id === newPost.id)?.userId
      )
      expect(body.title).toBe(newPost.title)
      expect(body.body).toBe(
        postsList.find((post) => post.id === newPost.id)?.body
      )
    }
  )

  await PostRunner.deletePost(newPost.id).then(({ response, body }) => {
    console.log(body)
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    expect(body.id).toBeEmpty
  })
})
