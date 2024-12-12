import { LinkedList } from './linked-list.js';

export class HashMap {
  #buckets = [];
  #loadFactor = 0.75;
  #capacity = 16;
  #size = 0;

  constructor() {
    this.clear();
  }

  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#buckets.length;
    }

    return hashCode;
  }

  #getBucket(key) {
    const i = this.#hash(key);
    return this.#buckets[i];
  }

  #getEntry(bucket, key) {
    for (let i = 0; i < bucket.size; i++) {
      const entry = bucket.at(i).value;
      if (entry.key === key) {
        return entry;
      }
    }

    return null;
  }

  #grow() {
    const entries = this.entries();

    this.#capacity *= 2;
    this.clear();

    for (let [key, value] of entries) {
      this.set(key, value);
    }
  }

  set(key, value) {
    let bucket = this.#getBucket(key);
    const entry = this.#getEntry(bucket, key);

    if (entry) {
      entry.value = value;
      return;
    }

    if (this.length() >= this.#capacity * this.#loadFactor) {
      this.#grow();
      // get a new bucket since growing the array replaces the old ones
      bucket = this.#getBucket(key);
    }

    bucket.append({ key, value });
    this.#size++;
  }

  get(key) {
    const bucket = this.#getBucket(key);
    const entry = this.#getEntry(bucket, key);

    if (entry) {
      return entry.value;
    }

    return null;
  }

  has(key) {
    const bucket = this.#getBucket(key);
    const entry = this.#getEntry(bucket, key);

    return !!entry;
  }

  remove(key) {
    const bucket = this.#getBucket(key);
    const entry = this.#getEntry(bucket, key);

    if (entry) {
      const i = bucket.find(entry);
      bucket.removeAt(i);
      this.#size--;
      return true;
    }

    return false;
  }

  length() {
    return this.#size;
  }

  clear() {
    this.#buckets = [];
    this.#size = 0;

    for (let i = 0; i < this.#capacity; i++) {
      this.#buckets.push(new LinkedList());
    }
  }

  keys() {
    const arr = [];

    for (let bucket of this.#buckets) {
      for (let i = 0; i < bucket.size; i++) {
        const { key } = bucket.at(i).value;
        arr.push(key);
      }
    }

    return arr;
  }

  values() {
    const arr = [];

    for (let bucket of this.#buckets) {
      for (let i = 0; i < bucket.size; i++) {
        const { value } = bucket.at(i).value;
        arr.push(value);
      }
    }

    return arr;
  }

  entries() {
    const arr = [];

    for (let bucket of this.#buckets) {
      for (let i = 0; i < bucket.size; i++) {
        const { key, value } = bucket.at(i).value;
        arr.push([key, value]);
      }
    }

    return arr;
  }

  printBuckets() {
    for (let b of this.#buckets) {
      console.log(b.toString());
    }
  }
}
