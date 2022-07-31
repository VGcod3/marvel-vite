class myStorage {

  constructor(key, storageType) {
    this.key = key;
    this.storageType = storageType;
  }

  set(value) {
    this.storageType.setItem(this.key, value);
  }

  get() {
    return this.storageType.getItem(this.key);
  }

  clear() {
    this.storageType.setItem(this.key, 'null');
  }

  isEmpty() {
    if (this.storageType.getItem(this.key) === 'null' || this.storageType.getItem(this.key) === 'undefined') {
      return true;
    }

    return false;
  }
};

export { myStorage };