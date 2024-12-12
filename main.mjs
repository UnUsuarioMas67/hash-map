import { HashMap } from './hash-map.mjs';

const map = new HashMap();

// Add new keys
map.set('apple', 'red');
map.set('banana', 'yellow');
map.set('carrot', 'orange');
map.set('dog', 'brown');
map.set('elephant', 'gray');
map.set('frog', 'green');
map.set('grape', 'purple');
map.set('hat', 'black');
map.set('ice cream', 'white');
map.set('jacket', 'blue');
map.set('kite', 'pink');
map.set('lion', 'golden');
map.set('rose', 'red');

// Get value from key
console.log(map.get('jacket'));

// Change existing value
map.set('jacket', 'navy blue');
console.log(map.get('jacket'));

// Check if key exists
console.log(map.has('cat'));
console.log(map.has('lion'));

// Remove key
map.remove('lion');
console.log(map.has('lion'));

// Print length
console.log(map.length());

// Print all keys
console.log(map.keys());

// Print all values
console.log(map.values());

// Print all entries
console.log(map.entries());

// Clear hash map
map.clear();
console.log(map.length());
console.log(map.keys());
