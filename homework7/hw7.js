// 1) Measure perfomance of an ordinary object, an object without prototype and a map.
let obj = {};
let objWithoutPrototype = Object.create(null);
let map = new Map();
const length = 100; // 10 000, 10 000 000

function fillObjects(object, number) {
    for (let i = 0; i < number; ++i)
        object[i] = i;
}

function fillMap(_map, number) {
    for (let i = 0; i < number; ++i)
        _map.set(i, i);
}

// fill with keys
fillObjects(obj, length);
fillObjects(objWithoutPrototype, length);
fillMap(map, length);

// add a new key
console.time('time spent on adding a new key to an ordinary object: ');
obj['key'] = 1;
console.timeEnd('time spent on adding a new key to an ordinary object: '); // output: 100 keys - 0.07ms; 10 000 keys - 0.072ms; 10 000 000 keys - 0.089ms

console.time('time spent on adding a new key to an object without prototype: ');
objWithoutPrototype['key'] = 1;
console.timeEnd('time spent on adding a new key to an object without prototype: '); // output: 100 keys - 0.004ms; 10 000 keys - 0.004ms; 10 000 000 keys - 0.005ms 

console.time('time spent on adding a new key to a map: ');
map.set('key', 1);
console.timeEnd('time spent on adding a new key to a map: '); //output: 100 keys - 0.004ms; 10 000 keys - 0.004ms; 10 000 000 keys - 0.006ms 
console.log('');

// get an element by key
let element;
console.time('time spent on getting an element by key from an ordinary object: ');
element = obj['key'];
console.timeEnd('time spent on getting an element by key from an ordinary object: '); // output: 100 keys - 0.004ms; 10 000 keys - 0.004ms; 10 000 000 keys - 0.004ms 

console.time('time spent on getting an element by key from an object without prototype: ');
element = objWithoutPrototype['key'];
console.timeEnd('time spent on getting an element by key from an object without prototype: '); // output: 100 keys - 0.005ms; 10 000 keys - 0.005ms; 10 000 000 keys - 0.005ms 

console.time('time spent on getting an element by key from a map: ');
element = map.get('key');
console.timeEnd('time spent on getting an element by key from a map: '); //output: 100 keys - 0.01ms; 10 000 keys - 0.009ms; 10 000 000 keys - 0.007ms 
console.log('');

// delete a key 
console.time('time spent on deleting a key from an ordinary object: ');
delete obj['key'];
console.timeEnd('time spent on deleting a key from an ordinary object: '); // output: 100 keys - 0.006ms; 10 000 keys - 0.009ms; 10 000 000 keys - 0.006ms 

console.time('time spent on deleting a key from an object without prototype: ');
delete objWithoutPrototype['key'];
console.timeEnd('time spent on deleting a key from an object without prototype: '); // output: 100 keys - 0.003ms; 10 000 keys - 0.003ms; 10 000 000 keys - 0.018ms 

console.time('time spent on deleting a key from a map: ');
map.delete('key');
console.timeEnd('time spent on deleting a key from a map: '); //output: 100 keys - 0.004ms; 10 000 keys - 0.004ms; 10 000 000 keys - 0.004ms 
console.log('');

// convert to array
let array;
console.time('time spent on converting an ordinary object to array: ');
array = Object.entries(obj);
console.timeEnd('time spent on converting an ordinary object to array: '); // output: 100 keys - 0.028ms; 10 000 keys - 1.857ms; 10 000 000 keys - 7.843s 

console.time('time spent on converting an object without prototype to array: ');
array = Object.entries(objWithoutPrototype);
console.timeEnd('time spent on converting an object without prototype to array: '); // output: 100 keys - 0.049ms; 10 000 keys - 2.639ms; 10 000 000 keys - 18.313s 

console.time('time spent on converting a map to array: ');
array = Array.from(map);
console.timeEnd('time spent on converting a map to array: '); //output: 100 keys - 0.014ms; 10 000 keys - 2.061ms; 10 000 000 keys - 2.178s 


// 2) Create a function that converts an object to a map
function objectToMap(object) {
    return new Map(Object.entries(object));
}


// 3) Create a function that converts a map to an object
function mapToObject(_map) {
    return Object.fromEntries(_map);
}