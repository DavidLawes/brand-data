import { BrandNotFoundError } from "../../errors";
import { Brands } from "../../models/brands";
import { Products } from "../../models/products";
import { Product } from "../../models/products/product.type";

export class BrandService {
  brands: Brands;
  products: Products;

  constructor(brands: Brands, products: Products) {
    this.brands = brands;
    this.products = products;
  }

  getProductEntities(brandId: string): Product[] {
    const brand = this.brands.get(brandId);

    if (!brand) {
      throw new BrandNotFoundError(brandId);
    }

    const productsForBrand: string[] = (brand.products || []).concat(
      brand.consolidated_products,
    );

    return this.products.findMany(productsForBrand);
  }
}
