// 1) empty object
let a = {};

// 2) empty object without prototype
let b = Object.create(null);

// 3) adding new fields
a.name = "Olya";

a["surname"] = "Hoshko";

const key = "age";
a[key] = 21;

Object.assign(b, a);

// 4) empty array
let c = [];

// 5) empty array with length = 100500
let d = new Array(100500);

// 6) array with a few elements
let e = [1, 2, 3];

// 7) making a full array empty
e = [];

// 8) function that erases an element by its index
let f = [1, 2, 3, 4, 5];
let newArray = (index) => {
    f.splice(index, 1);
    return f;
}
console.log(newArray(1)); // output: [1, 3, 4, 5]

// 9) function that checks if an array is empty
let isArrayEmpty = (array) => {
    return array.length === 0;
}
console.log(isArrayEmpty([])); //output: true
console.log(isArrayEmpty([3])); //output: false

// 10) function that checks if an object is empty
let isObjectEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}
console.log(isObjectEmpty({})); //output: true
console.log(isObjectEmpty({ a })); //output: false

// 11) function that merges two arrays
let mergeArrays = (array1, array2) => {
    let result = [...array1];
    for (let i = 0; i < array2.length; i++)
        result.push(array2[i]);
    return result;
}
console.log(mergeArrays([1, 2, 3], [4, 5, 6])); // output: [1, 2, 3, 4, 5, 6]

// 12) ^3 function
let pow3 = (array) => {
    let result = [];
    for (let i = 0; i < array.length; i++)
        result.push(Math.pow(array[i], 3));
    return result;
}
console.log(pow3([1, 2, 3, 4])); // output: [1, 8, 27, 64]

// 13) function that returns only odd numbers of an array
let oddNumbers = (array) => {
    let result = [];
    for (let i = 0; i < array.length; i++)
        if (array[i] % 2 !== 0)
            result.push(array[i]);
    return result;
}
console.log(oddNumbers([1, 2, 3, 4])); // output: [1, 3]

// 14) function that returns only integer numbers of an array
let intNumbers = (array) => {
    let result = [];
    for (let i = 0; i < array.length; i++)
        if (Number.isInteger(array[i]))
            result.push(array[i]);
    return result;
}
console.log(intNumbers([1.4, 2, 3.024, 4.12])); // output: [2]

// 15) function that returns nothing
let returnNothing = () => {
    return;
}
console.log(returnNothing()); // return: undefined