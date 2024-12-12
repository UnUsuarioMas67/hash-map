class Node {
  constructor(value, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  #size = 0;
  #head = null;
  #tail = null;

  get size() {
    return this.#size;
  }

  get head() {
    return this.#head;
  }

  get tail() {
    return this.#tail;
  }

  append(value) {
    const newNode = new Node(value);

    if (this.#head === null) {
      this.#head = newNode;
    }
    if (this.#tail) {
      this.#tail.nextNode = newNode;
    }
    this.#tail = newNode;

    this.#size++;
  }

  prepend(value) {
    const newNode = new Node(value, this.#head);

    this.#head = newNode;

    if (!this.#tail) {
      this.#tail = newNode;
    }

    this.#size++;
  }

  at(index) {
    if (index < 0 || index >= this.#size) {
      return null;
    }

    let current = this.#head;
    for (let i = 0; i < this.#size; i++) {
      if (i === index) {
        return current;
      }

      current = current.nextNode;
    }

    return null;
  }

  pop() {
    let current = this.#head;
    while (current) {
      if (current.nextNode === this.#tail) {
        current.nextNode = null;
        this.#tail = current;
        this.#size--;
      }

      current = current.nextNode;
    }
  }

  contains(value) {
    let current = this.#head;
    while (current) {
      if (current.value === value) {
        return true;
      }

      current = current.nextNode;
    }

    return false;
  }

  find(value) {
    let current = this.#head;
    for (let i = 0; i < this.#size; i++) {
      if (current.value === value) {
        return i;
      }

      current = current.nextNode;
    }

    return -1;
  }

  insertAt(value, index) {
    const newNode = new Node(value);

    if (index === 0) {
      this.prepend(value);
      return;
    }
    if (index === this.#size) {
      this.append(value);
      return;
    }

    let current = this.#head;
    for (let i = 0; i < this.#size; i++) {
      if (i === index - 1) {
        const next = current.nextNode;
        current.nextNode = newNode;
        newNode.nextNode = next;
        this.#size++;

        break;
      }

      current = current.nextNode;
    }
  }

  removeAt(index) {
    if (index === 0) {
      this.#head = this.#head.nextNode;
      this.#size--;
      return;
    }
    if (index === this.#size - 1) {
      this.pop();
      return;
    }

    let current = this.#head;
    let prevNode = null;
    for (let i = 0; i < this.#size; i++) {
      if (i === index - 1) {
        prevNode = current;
      }
      if (i === index) {
        prevNode.nextNode = current.nextNode;
        this.#size--;
        break;
      }

      current = current.nextNode;
    }
  }

  toString() {
    let output = '';

    let current = this.head;
    while (current) {
      output += `( ${current.value} ) -> `;
      current = current.nextNode;
    }

    output += 'null';
    return output;
  }
}

export { LinkedList };
