import { Brand } from "./brand.type";

export class Brands {
  brands: Brand[];

  constructor(brands: Brand[]) {
    this.brands = brands;
  }

  get(id: string): Brand | undefined {
    return this.brands.find((brand) => brand.id === id);
  }

  getByProductId(id: string): Brand[] | undefined {
    return this.brands.filter(
      (brand) =>
        brand.products.includes(id) || brand.consolidated_products.includes(id),
    );
  }
}
