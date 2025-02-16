import { Brands } from ".";
import { Brand } from "./brand.type";

describe("Brands", () => {
  let brands;
  const mockBrand: Brand = {
    id: "66462cd6-e43c-4ab6-8e6f-004ca189e4b9",
    created_at: "2019-03-18 18:47:05",
    updated_at: "2019-03-18 18:47:05",
    name: "independent coffee locations",
    products: ["26f7a82a-30a8-44e4-93cb-499a256d0ce9"],
    consolidated_products: ["abc"],
  };

  beforeAll(() => {
    brands = new Brands([mockBrand]);
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
    it("should get the brand records by product id", () => {
      const brandsByProductId = brands.getByProductId(
        "26f7a82a-30a8-44e4-93cb-499a256d0ce9",
      );

      expect(brandsByProductId).toHaveLength(1);
      expect(brandsByProductId[0]).toEqual(mockBrand);
    });

    it("should get the brand records by consolidated product id", () => {
      const brandsByProductId = brands.getByProductId("abc");

      expect(brandsByProductId).toHaveLength(1);
      expect(brandsByProductId[0]).toEqual(mockBrand);
    });

    it("should return empty array if no brands include product", () => {
      const brandsByProductId = brands.getByProductId("123");

      expect(brandsByProductId).toHaveLength(0);
    });
  });
});
