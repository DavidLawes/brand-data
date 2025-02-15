import { Stores } from ".";
import { Store } from "./store.type";

describe("Stores", () => {
  let stores;
  const store1: Store = {
    id: "store-123",
    brand_id: "brand-123",
  };

  const store2: Store = {
    id: "store-456",
    brand_id: "brand-456",
  };

  beforeAll(() => {
    stores = new Stores([store1, store2]);
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

  describe("getMany", () => {
    it("should get all the stores", () => {
      const manyStores = stores.getMany(["store-123", "store-456"]);

      expect(manyStores).toHaveLength(2);
      expect(manyStores).toEqual([store1, store2]);
    });

    it("should return undefined if stores cannot be found", () => {
      const store = stores.get(["123", "456"]);

      expect(store).toBeUndefined();
    });
  });
});
