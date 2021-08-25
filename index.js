const main = require('./main.js')
const car = require('./car.js')
// const a = require('./main.js')
// const b = require('./main.js')

// console.log(main.Apple.getColor())

const apple = new main.Apple()
console.log(apple.getColor())

// const cars = new car.Car()
// console.log(cars.setWheels())

console.log(car.Car.setWheels())
console.log(car.Car.setDoors())
console.log(car.Car.setPlace())
console.log(car.Car.setCarName())
console.log(car.Car.setYears())
console.log(car.Car.getResult())




// console.log(main, a, b)

// console.log(6)
// console.log(process.argv[2]) // достать аргумент

