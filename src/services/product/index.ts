import { BrandNotFoundError } from "../../errors";
import { Brands } from "../../models/brands";

export class Product {
  brands: Brands;

  constructor(brands: Brands) {
    this.brands = brands;
  }

  getProductEntitiesByBrand(brandId: string): string[] {
    const brand = this.brands.get(brandId);

    if (!brand) {
      throw new BrandNotFoundError(brandId);
    }

    return brand.products || [];
  }
}
