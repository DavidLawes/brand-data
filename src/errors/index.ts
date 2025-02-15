export class BrandNotFoundError extends Error {
  constructor(brandId: string) {
    super(`brand ${brandId} not found`);
  }
}
