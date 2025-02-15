import { BrandService } from ".";
import { BrandNotFoundError } from "../../errors";
import { Brands } from "../../models/brands";
import { Products } from "../../models/products";

jest.mock("../../models/brands");
jest.mock("../../models/products");

describe("Brand service", () => {
  let brandService: BrandService;
  let mockBrands: jest.Mocked<Brands>;
  let mockProducts: jest.Mocked<Products>;

  beforeEach(() => {
    mockBrands = new (<new () => Brands>(
      (<unknown>Brands)
    ))() as jest.Mocked<Brands>;

    mockProducts = new (<new () => Products>(
      (<unknown>Products)
    ))() as jest.Mocked<Products>;

    brandService = new BrandService(mockBrands, mockProducts);
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
        expect(() => brandService.getProductEntities("123")).toThrow(
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
        expect(brandService.getProductEntities("123")).toEqual([mockProduct]);

        expect(mockBrands.get).toHaveBeenCalledWith("123");
        expect(mockProducts.findMany).toHaveBeenCalledWith(mockBrand.products);
      });

      describe("Given the brand has no products", () => {
        beforeEach(() => {
          mockBrands.get.mockReturnValue(mockBrand);
          mockProducts.findMany.mockReturnValue([]);
        });

        it("should return an empty array", () => {
          expect(brandService.getProductEntities("123")).toEqual([]);
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
          brandService.getProductEntities("123");

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
