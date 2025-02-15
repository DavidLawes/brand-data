export class BrandNotFoundError extends Error {
  constructor(brandId: string) {
    super(`brand ${brandId} not found`);
  }
}

export class ProductNotFoundError extends Error {
  constructor(productId: string) {
    super(`product ${productId} not found`);
  }
}
