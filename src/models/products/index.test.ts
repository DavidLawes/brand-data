import { Products } from ".";

describe("Products", () => {
  let products;

  beforeAll(() => {
    products = new Products([
      {
        id: "abc",
      },
    ]);
  });

  it("should get the product record by id", () => {
    const product = products.get("abc");

    expect(product).toBeDefined();
  });

  it("should return undefined if product cannot be found", () => {
    const product = products.get("123");

    expect(product).toBeUndefined();
  });
});
