import { Store } from "./store.type";

export class Stores {
  stores: Store[];

  constructor(stores: Store[]) {
    this.stores = stores;
  }

  get(id: string): Store | undefined {
    return this.stores.find((store) => store.id === id);
  }
}
