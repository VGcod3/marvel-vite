class myStorage {
  constructor(key, storageType = localStorage) {
    this.key = key;
    this.storageType = storageType;
  }

  set(value) {
    this.storageType.setItem(this.key, JSON.stringify(value));
  }

  get() {
    return JSON.parse(this.storageType.getItem(this.key));
  }

  clear() {
    this.storageType.setItem(this.key, 'null');
  }

  isEmpty = () => !this.get();
};

export { myStorage };