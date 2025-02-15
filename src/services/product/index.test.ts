import { ProductService } from ".";
import { BrandNotFoundError } from "../../errors";
import { Brands } from "../../models/brands";
import { Products } from "../../models/products";

jest.mock("../../models/brands");
jest.mock("../../models/products");

describe("Product service", () => {
  let productService: ProductService;
  let mockBrands: jest.Mocked<Brands>;
  let mockProducts: jest.Mocked<Products>;

  beforeEach(() => {
    mockBrands = new (<new () => Brands>(
      (<unknown>Brands)
    ))() as jest.Mocked<Brands>;

    mockProducts = new (<new () => Products>(
      (<unknown>Products)
    ))() as jest.Mocked<Products>;

    productService = new ProductService(mockBrands, mockProducts);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Get all product entities for a brand", () => {
    describe("Given the brand cannot be found", () => {
      beforeEach(() => {
        mockBrands.get.mockImplementation(() => {
          throw new BrandNotFoundError("123");
        });
      });

      it("should throw a BrandNotFoundError", () => {
        expect(() => productService.getProductEntitiesByBrand("123")).toThrow(
          BrandNotFoundError,
        );
      });
    });

    describe("Given the brand exists", () => {
      const mockBrand = {
        id: "123",
        created_at: "2019-03-18 18:47:05",
        updated_at: "2019-03-18 18:47:05",
        name: "independent coffee locations",
        products: ["prod123"],
        consolidated_products: [],
      };
      const mockProduct = { id: "prod123" };
      beforeEach(() => {
        mockBrands.get.mockReturnValue(mockBrand);
        mockProducts.findMany.mockReturnValue([mockProduct]);
      });

      it("should return all product entities for given brand", () => {
        expect(productService.getProductEntitiesByBrand("123")).toEqual([
          mockProduct,
        ]);

        expect(mockBrands.get).toHaveBeenCalledWith("123");
        expect(mockProducts.findMany).toHaveBeenCalledWith(mockBrand.products);
      });

      describe("Given the brand has no products", () => {
        beforeEach(() => {
          mockBrands.get.mockReturnValue(mockBrand);
          mockProducts.findMany.mockReturnValue([]);
        });

        it("should return an empty array", () => {
          expect(productService.getProductEntitiesByBrand("123")).toEqual([]);
        });
      });

      describe("Given the brand has consolidated products", () => {
        const mockBrandWithConsolidatedProducts = {
          id: "123",
          products: ["prod123"],
          consolidated_products: ["con456"],
        };

        beforeEach(() => {
          mockBrands.get.mockReturnValue(mockBrandWithConsolidatedProducts);
          mockProducts.findMany.mockReturnValue([
            { id: "prod123" },
            { id: "con456" },
          ]);
        });
        it("should return all products", () => {
          productService.getProductEntitiesByBrand("123");

          expect(mockBrands.get).toHaveBeenCalledWith("123");
          expect(mockProducts.findMany).toHaveBeenCalledWith([
            "prod123",
            "con456",
          ]);
        });
      });
    });
  });
});
