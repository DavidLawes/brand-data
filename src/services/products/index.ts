import { ProductNotFoundError } from "../../errors";
import { Brands } from "../../models/brands";
import { Brand } from "../../models/brands/brand.type";
import { Products } from "../../models/products";
import { Product } from "../../models/products/product.type";
import { Stores } from "../../models/stores";
import { Store } from "../../models/stores/store.type";

type ConstructorArgs = {
  brands: Brands;
  products: Products;
  stores: Stores;
};

export class ProductService {
  brands: Brands;
  products: Products;
  stores: Stores;

  constructor({ brands, products, stores }: ConstructorArgs) {
    this.brands = brands;
    this.products = products;
    this.stores = stores;
  }

  getStoreEntities(productId: string): Store[] {
    const product: Product = this.products.get(productId);

    if (!product) {
      throw new ProductNotFoundError(productId);
    }

    const brands: Brand[] = this.brands.getByProductId(productId);

    if (!brands || brands.length === 0) {
      return [];
    }

    const uniqStoreIds = [
      ...new Set(
        brands.flatMap((brand) => {
          return brand.stores;
        }),
      ),
    ];

    return this.stores.getMany(uniqStoreIds);
  }
}
