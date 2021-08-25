class Car {
  static wheels = 4
  static doors = null
  static place = null
  static carName = null
  static years = null

  static setWheels (wheels) {
    // this.wheels = wheels
    return 'wheels - ' + Car.getWheels()
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
// Car.setWheels(3)
// console.log('wheels - ' + Car.getWheels())
// Car.setDoors(4)
// console.log('doors - ' + Car.getDoors())
// Car.setPlace(5)
// console.log('place - ' + Car.getPlace())
// Car.setCarName('toyota')
// console.log('name - ' + Car.getCarName())
// Car.setYears(2021)
// console.log('year - ' + Car.getYears())
// console.log(Car.getResult())

module.exports = {
    Car
    // setWheels,
    // setDoors: this.setDoors,
    // setPlace: this.setPlace,
    // setCarName: this.setCarName,
    // setYears: this.setYears
    
}