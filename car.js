class Car {
  static wheels = null
  static doors = null
  static place = null
  static carName = null
  static years = null

  static setWheels (wheels) {
    this.wheels = wheels
  }
  static getWheels() {
    return this.wheels
  }
  static setDoors (doors) {
    this.doors = doors
  }
  static getDoors() {
    return this.doors
  }
  static setPlace (place) {
    this.place = place
  }
  static getPlace() {
    return this.place
  }
  static setCarName (carName) {
    this.carName = carName
  }
  static getCarName() {
    return this.carName
    
  }
  static setYears(years) {
    this.years = years
  }
  static getYears() {
    return this.years
  }
  static getResult() {
    return `
            wheels - ${this.wheels}
            doors - ${this.doors}
            place - ${this.place}
            name - ${this.carName}
            year - ${this.years}
          `
  }
}
Car.setWheels(3)
Car.setDoors(4)
Car.setPlace(5)
Car.setCarName('toyota')
Car.setYears(2021)
console.log(Car.getResult())

module.exports = {
    Car
}