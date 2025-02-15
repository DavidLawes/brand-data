import { Stores } from ".";

describe("Stores", () => {
  let stores;

  beforeAll(() => {
    stores = new Stores([
      {
        id: "store-123",
        brand_id: "brand-123",
      },
    ]);
  });

  describe("get", () => {
    it("should get the store record by id", () => {
      const store = stores.get("store-123");

      expect(store).toBeDefined();
      expect(store.brand_id).toBe("brand-123");
    });

    it("should return undefined if store cannot be found", () => {
      const store = stores.get("123");

      expect(store).toBeUndefined();
    });
  });
});
