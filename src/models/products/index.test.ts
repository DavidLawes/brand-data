import { Products } from ".";

describe("Products", () => {
  let products: Products;
  const data = [
    {
      id: "abc",
    },
    {
      id: "def",
    },
    {
      id: "ghi",
    },
  ];

  beforeAll(() => {
    products = new Products(data);
  });

  describe("get", () => {
    it("should get the product record by id", () => {
      const product = products.get("abc");

      expect(product).toBeDefined();
    });

    it("should return undefined if product cannot be found", () => {
      const product = products.get("123");

      expect(product).toBeUndefined();
    });
  });

  describe("findMany", () => {
    it("should return an empty array is no matching products", () => {
      expect(products.findMany(["none", "available"])).toEqual([]);
    });

    it("should return product entities", () => {
      const productEntities = products.findMany(["abc", "def"]);

      expect(productEntities.length).toBe(2);
    });
  });
});
