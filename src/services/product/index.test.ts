import { Product } from ".";
import { BrandNotFoundError } from "../../errors";
import { Brands } from "../../models/brands";
import { Brand } from "../../models/brands/brand.type";

describe("Product service", () => {
  describe("Get all product entities for a brand", () => {
    describe("Given the brand cannot be found", () => {
      const brands = new Brands([]);
      const product = new Product(brands);

      it("should throw a BrandNotFoundError", () => {
        expect(() => product.getProductEntitiesByBrand("123")).toThrow(
          BrandNotFoundError,
        );
      });
    });

    describe("Given the brand exists", () => {
      const brand: Brand = {
        id: "123",
        created_at: "2019-03-18 18:47:05",
        updated_at: "2019-03-18 18:47:05",
        name: "independent coffee locations",
        products: ["26f7a82a-30a8-44e4-93cb-499a256d0ce9"],
        consolidated_products: [],
      };

      const brands = new Brands([brand]);
      const product = new Product(brands);

      it("should return all product entities for given brand", () => {
        expect(product.getProductEntitiesByBrand("123")).toEqual(
          brand.products,
        );
      });

      describe("Given the brand has no products", () => {
        const brands = new Brands([
          {
            id: "123",
          },
        ]);
        const product = new Product(brands);

        it("should return an empty array", () => {
          expect(product.getProductEntitiesByBrand("123")).toEqual([]);
        });
      });
    });
  });
});
