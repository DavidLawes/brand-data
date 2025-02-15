import { Product } from "./product.type";

export class Products {
  products: Product[];

  constructor(products: Product[]) {
    this.products = products;
  }

  get(id: string): Product | undefined {
    return this.products.find((product) => product.id === id);
  }
}
