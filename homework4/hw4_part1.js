// 1) Створити функцію, яка б отримувала параметром масив з елементів різних типів, 
// на виході має повернути строку у camel case, яка б поєднувала в собі всі елементи масиву, які є строками.
function func1(array) {
    return array.filter(element => typeof(element) === 'string').map((element, index) => index > 0 ? element[0].toUpperCase() + element.slice(1) : element).join('');
}

// 2) Створити функцію, яка отримує параметром масив цілих чисел 1 <= value <= 26, 
// і повертала б масив, у якому кожен елемент є літерою англійського алфавіту відповідний конкретному елементу масива 
// (наприклад 1 = a, 2 = b, 3 = c, 4 = d, …). Приклад [4, 3, 22, 11] - в результаті маємо отримати [d, c, v, k]
function func2(array) {
    return array.map(number => String.fromCharCode(96 + number));
}

// 3) Створити функцію, яка параметром отримує об’єкт (наприклад {a: 22, b: -11.35, c: 41.2, d: ‘hello’}) 
// і повертає новий об’єкт, який містить тільки числа більші рівні 0.
function func3(obj) {
    return Object.entries(obj).filter(([key, value]) => typeof(value) === 'number' && value >= 0);
}