const { test, expect } = require("@playwright/test")
import postsList from "../data/posts.json"

test.beforeEach(() => {})

// inputs > extract to somewhere later
// const id = 1
const user = {
  email: "customer@practicesoftwaretesting.com",
  password: "welcome01",
}
let token: string = ""

test("should POST a login and get token", async ({ request }) => {
  const response = await request.post(
    `https://api-v4.practicesoftwaretesting.com/users/login`,
    { data: user }
  )

  console.log(await response.json())
  const body = await response.json()

  token = body.access_token

  expect(response.ok()).toBeTruthy()
  expect(response.status()).toBe(200)

  expect(body.access_token).toEqual(expect.any(String))
  expect(body.token_type).toEqual("bearer")
  expect(body.expires_in).toEqual(300)
})

test("should GET user details with token", async ({ request }) => {
  const response = await request.get(
    `https://api-v4.practicesoftwaretesting.com/users/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  console.log(await response.json())
  const body = await response.json()

  expect(body.id).toEqual(2)
  expect(body.first_name).toEqual("Jane")
  expect(body.last_name).toEqual("Doe")
})
