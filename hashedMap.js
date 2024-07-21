function hash(key, buckets) {
  let hashCode = 0;
  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % buckets;
  }
  return hashCode;
}

function HashMap() {
  let bucketLength = 16;
  let buckets = new Array(bucketLength).fill(null).map(() => []);
  const loadFactor = 0.75;
  let size = 0;

  function resize() {
    const newBucketLength = bucketLength * 2;
    const newBuckets = new Array(newBucketLength).fill(null).map(() => []);

    for (let i = 0; i < buckets.length; i++) {
      for (let j = 0; j < buckets[i].length; j++) {
        const [key, value] = buckets[i][j];
        const newIndex = hash(key, newBucketLength);
        newBuckets[newIndex].push([key, value]);
      }
    }

    buckets = newBuckets;
    bucketLength = newBucketLength;
  }

  return {
    set: function (key, value) {
      if (size >= loadFactor * bucketLength) {
        resize();
      }

      const index = hash(key, bucketLength);
      const bucket = buckets[index];
      const existingPair = bucket?.find((pair) => pair[0] === key);

      if (existingPair) {
        existingPair[1] = value;
      } else {
        bucket.push([key, value]);
        size++;
      }
    },
    get: function (key) {
      let index = hash(key, buckets);
      const bucket = buckets[index];
      const existingPair = bucket?.find((pair) => pair[0] === key);
      if (existingPair) {
        return existingPair[1];
      } else {
        return null;
      }
    },
    has: function (key) {
      let index = hash(key, buckets);
      const bucket = buckets[index];
      const existingPair = bucket?.find((pair) => pair[0] === key);
      if (existingPair) {
        return true;
      } else {
        return false;
      }
    },
    remove: function (key) {
      let index = hash(key, bucketLength);
      const bucket = buckets[index];
      const pairIndex = bucket?.findIndex((pair) => pair[0] === key);
      if (pairIndex !== -1) {
        bucket.splice(pairIndex, 1);
        size--;
        return true;
      } else {
        return false;
      }
    },
    length: function () {
      return size;
    },
    clear: function () {
      buckets = new Array(16).fill(null).map(() => []);
      bucketLength = 16;
      size = 0;
    },
    keys: function () {
      const allKeys = [];
      for (let i = 0; i < buckets.length; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
          allKeys.push(buckets[i][j][0]);
        }
      }
      return allKeys;
    },
    values: function () {
      const allValues = [];
      for (let i = 0; i < buckets.length; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
          allValues.push(buckets[i][j][1]);
        }
      }
      return allValues;
    },
    entries: function () {
      const allEntries = [];
      for (let i = 0; i < buckets.length; i++) {
        for (let j = 0; j < buckets[i].length; j++) {
          allEntries.push(buckets[i][j]);
        }
      }
      return allEntries;
    },
  };
}

const myMap = HashMap();
myMap.set("key1", "value1");
myMap.set("key2", "value2");
myMap.set("key3", "value3");
myMap.set("key4", "value4");

console.log(myMap.get("key1"));
console.log(myMap.get("key2"));
console.log(myMap.get("key5"));

myMap.set("key3", "valueNew");
console.log(myMap.get("key3"));

for (let i = 0; i < 20; i++) {
  myMap.set(`key${i}`, `values${i}`);
}

console.log(myMap);
console.log("BREAK");
console.log("Entries " + myMap.entries());
console.log("BREAK");
console.log("Values " + myMap.values());
console.log("BREAK");
console.log("Keys " + myMap.keys());
console.log("BREAK");
console.log("Length " + myMap.length());
console.log("BREAK");
console.log("Before remove key 4 " + myMap.keys());
console.log("Removed Key 4 " + myMap.remove("key4"));
console.log("BREAK");
console.log("After removed key 4 " + myMap.keys());
console.log("BREAK");
myMap.clear();
console.log("Cleared " + myMap.length());
