import { Brands } from ".";

describe("Brands", () => {
  let brands;

  beforeAll(() => {
    brands = new Brands([
      {
        id: "66462cd6-e43c-4ab6-8e6f-004ca189e4b9",
        created_at: "2019-03-18 18:47:05",
        updated_at: "2019-03-18 18:47:05",
        name: "independent coffee locations",
        products: ["26f7a82a-30a8-44e4-93cb-499a256d0ce9"],
        consolidated_products: ["abc"],
      },
    ]);
  });

  describe("get", () => {
    it("should get the brand record by id", () => {
      const brand = brands.get("66462cd6-e43c-4ab6-8e6f-004ca189e4b9");

      expect(brand).toBeDefined();
      expect(brand.name).toBe("independent coffee locations");
    });

    it("should return undefined if brand cannot be found", () => {
      const brand = brands.get("123");

      expect(brand).toBeUndefined();
    });
  });

  describe("getByProductId", () => {
    it("should get the brand record by product id", () => {
      const brand = brands.getByProductId(
        "26f7a82a-30a8-44e4-93cb-499a256d0ce9",
      );

      expect(brand).toBeDefined();
      expect(brand.name).toBe("independent coffee locations");
    });

    it("should return undefined if no brands include product", () => {
      const brand = brands.getByProductId("123");

      expect(brand).toBeUndefined();
    });
  });

  describe("getByConsolidatedProductId", () => {
    it("should get the brand record by consolidated product id", () => {
      const brand = brands.getByConsolidatedProductId("abc");

      expect(brand).toBeDefined();
      expect(brand.name).toBe("independent coffee locations");
    });

    it("should return undefined if no brands include consolidated product", () => {
      const brand = brands.getByConsolidatedProductId("123");

      expect(brand).toBeUndefined();
    });
  });
});
