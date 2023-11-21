const { test, expect } = require("@playwright/test")
import productList from "../data/products.json"
import ProductsApiService, { IProduct } from "../modules/ProductsApiService"

const product: IProduct = productList[0]

test("test", async () => {
  const ProductsRunner = new ProductsApiService()
  // console.log(product)

  await ProductsRunner.getAllProducts().then(({ response, body }) => {
    console.log(body)
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
  })

  await ProductsRunner.getProductById(product.id).then(({ response, body }) => {
    //console.log(body)
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    expect(body.id).toBe(product.id)
    expect(body.name).toBe(product.name)
    expect(body.description).toBe(product.description)
    expect(body.price).toBe(product.price)
  })
})
