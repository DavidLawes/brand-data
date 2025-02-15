import { ProductService } from ".";
import { ProductNotFoundError } from "../../errors";
import { Brands } from "../../models/brands";
import { Brand } from "../../models/brands/brand.type";
import { Products } from "../../models/products";
import { Product } from "../../models/products/product.type";
import { Stores } from "../../models/stores";

jest.mock("../../models/products");
jest.mock("../../models/brands");
jest.mock("../../models/stores");

describe("Product service", () => {
  let productService: ProductService;
  let mockBrands: jest.Mocked<Brands>;
  let mockProducts: jest.Mocked<Products>;
  let mockStores: jest.Mocked<Stores>;

  beforeEach(() => {
    mockBrands = new (<new () => Brands>(
      (<unknown>Brands)
    ))() as jest.Mocked<Brands>;
    mockProducts = new (<new () => Products>(
      (<unknown>Products)
    ))() as jest.Mocked<Products>;
    mockStores = new (<new () => Stores>(
      (<unknown>Stores)
    ))() as jest.Mocked<Stores>;

    productService = new ProductService({
      brands: mockBrands,
      products: mockProducts,
      stores: mockStores,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Get all store entities for a product", () => {
    describe("Given the product cannot be found", () => {
      beforeEach(() => {
        mockProducts.get.mockImplementation(() => {
          throw new ProductNotFoundError("123");
        });
      });

      it("should throw a ProductNotFoundError", () => {
        expect(() => productService.getStoreEntities("123")).toThrow(
          ProductNotFoundError,
        );
      });
    });

    describe("Given no brands are associated with a product", () => {
      beforeEach(() => {
        mockProducts.get.mockReturnValue({ id: "123" });
        mockBrands.getByProductId.mockReturnValue(undefined);
      });
      it("should return an empty array", () => {
        expect(productService.getStoreEntities("123")).toEqual([]);
      });
    });

    describe("Given the product and brand exists", () => {
      const mockProduct: Product = { id: "prod123" };
      const mockBrand1: Brand = {
        id: "123",
        stores: ["abc", "def"],
      };

      const mockBrand2: Brand = {
        id: "456",
        stores: ["ghi", "jkl"],
      };

      beforeEach(() => {
        mockProducts.get.mockReturnValue(mockProduct);
        mockBrands.getByProductId.mockReturnValue([mockBrand1, mockBrand2]);
        mockStores.getMany.mockReturnValue([]);
      });

      it("should return all store entities for given product", () => {
        productService.getStoreEntities("123");

        expect(mockProducts.get).toHaveBeenCalledWith("123");
        expect(mockBrands.getByProductId).toHaveBeenCalledWith("123");
        expect(mockStores.getMany).toHaveBeenCalledWith([
          "abc",
          "def",
          "ghi",
          "jkl",
        ]);
      });

      describe("Given duplicate stores between brand entities", () => {
        const mockProduct: Product = { id: "prod123" };
        const mockBrand1: Brand = {
          id: "123",
          stores: ["abc", "abc", "abc", "def"],
        };

        const mockBrand2: Brand = {
          id: "456",
          stores: ["abc", "def", "ghi", "jkl"],
        };

        beforeEach(() => {
          mockProducts.get.mockReturnValue(mockProduct);
          mockBrands.getByProductId.mockReturnValue([mockBrand1, mockBrand2]);
          mockStores.getMany.mockReturnValue([]);
        });

        it("should only call getMany with a unique list of store ids", () => {
          productService.getStoreEntities("123");

          expect(mockProducts.get).toHaveBeenCalledWith("123");
          expect(mockBrands.getByProductId).toHaveBeenCalledWith("123");
          expect(mockStores.getMany).toHaveBeenCalledWith([
            "abc",
            "def",
            "ghi",
            "jkl",
          ]);
        });
      });
    });
  });
});
