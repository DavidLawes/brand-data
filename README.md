# brand-data

This is a simple mock service to return brand-related
data.

The service is a TypeScript Fastify app using mocked
data to represent the Brands, Products and Stores.

## Endpoints

### Get all products by brand id

GET /brands/:brandId/products

This endpoint returns all the products for a given brand id.
The service takes into account both the products and
consolidated products defined for a given brand.

### Get all stores by product id

GET /products/:productId/stores

This endpoint returns all the stores for a given product id.
The service:

- checks the product exists
- finds brands that include the product id in their list of
  products or consolidated products
- derives a list of store ids from the associated brands
- retrieves the corresponding store entities

## Setup

The node version is defined in the .nvmrc, please
switch to this version (e.g. `nvm use 20.18.3`).

The project uses npm as a package manager, to install
the required dependencies please run `npm i`.

### Tests

Jest is used to run tests. To run all tests:
`npm test`

### Dev server

A local server can be started by running `npm run dev`.

This uses [tsx](https://tsx.is/) and the `watch` option
ensures that hot reloading is handled by default.

When the dev server has started the service will be
available at http://localhost:8080.
