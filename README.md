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

## Tests

Jest is used to run tests. To run all tests:
`npm test`

## Setup

The node version is defined in the .nvmrc, please
switch to this version (e.g. `nvm use 20.18.3`).

### Dev server

The app relies on Redis for caching as well as the
Typescript app. Assuming a macos user, to get the
project setup locally execute the bash script defined
in the project root:
`./project-setup.sh`. This will:

- brew install redis if it is not already installed
- install npm dependencies

A local server can then be started by running `npm run start-local`. This does 2 things:

- `npm run redis:start`: this will start a redis server.
- `npm run dev`: this starts the local server.

The local server uses [tsx](https://tsx.is/) and the
`watch` option ensures that hot reloading is handled
by default.

When the dev server has started the service will be
available at http://localhost:8080.

### Code style

Formatting is enforced using prettier: `npm run format`.
Linting is validated using eslint: `npm run lint`.
