// let a = 'racecar'
// let b = 'table'
// function reverseStr(str) { 
//     return str.split('').reverse().join('')
// }
// function comparison(str) {
//     if (str === reverseStr(str)) {
//         return true
//     } else {
//         return false
//     }
// }
// console.log(comparison(a))
// console.log(comparison(b))



// let a = 'racecar'
// let b = 'table'
// function reverseStr(a) { 
//     return a === a.split('').reverse().join('')
// }
// console.log(reverseStr(a))
// console.log(reverseStr(b))



// let arr = [1, 2, 3, 4, 5, 30]
// let n = function() {
//     for(i = 1; i <= arr.length; i++) {
//         if (i % 3 === 0) {
//             console.log('fizz')
//         } else if (i % 5 === 0) {
//             console.log('buzz')
//         } else if (i % 3 === 0 && i % 5 === 0) {
//             console.log('fizzbuzz')
//         } else {
//             console.log(i)
//         }
//     }
// }
// console.log(n())



// let a = 'Finder'
// let b = 'Friend'
// function sortStr(a) { 
//     return a.toLowerCase().split('').sort()
// }
// function comparison(a, b) {
//     if (sortStr(a).every((value, index) => value === sortStr(b)[index])) {
//         return true
//     } else {
//         return false
//     }
// }
// console.log(comparison(a, b))


// let a = 'Hello'
// let b = 'Bye'
// function sortStr(a) { 
//     return a.toLowerCase().split('').sort()
// }
// function comparison(a, b) {
//     if (sortStr(a).every((value, index) => value === sortStr(b)[index])) {
//         return true
//     } else {
//         return false
//     }
// }
// console.log(comparison(a, b))



// let a = 'hello';
// let b = 0;
// for (let i = 0; i < a.length; i++) {
//     if (
//         a[i] !== 'a' &&
//         a[i] !== 'e' &&
//         a[i] !== 'i' && 
//         a[i] !== 'o' && 
//         a[i] !== 'u' && 
//         a[i] !== 'y' 
//     ) {
//         b = b + 0
//     } else {
//         b = b + 1
//     }
// }
// console.log(b)




// age = 30
// let a = function() {
//     if (age < 13) {
//         return Error ('слишком юн')
//   } else if (age <= 20) {
//         return '13 - 20'
//   } else if (age <= 30) {
//         return '21-30'
//     } else if (age <= 40) {
//         return '31-40'
//     } else if (age <= 50) {
//         return '41-50'
//     } else if (age <= 60) {
//         return '51-60'
//     } else {
//         return '60+'
//   }
// }
//   console.log(a())


// написать скрипт:
// есть любой возраст: 13 лет, 24, 25, 46 и т.д.
// Есть возрастные категории: 13-20, 20-30, 30-40, 40-50, 50-60, 60+
// если тебе 14, то твоя категория 13
// если 24, то 20
// если 30, то категория 30
// если 65, то 60+
// возраст 12 и ниже должен подать с ошибкой, мол слишком юн.

