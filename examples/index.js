// console.log(1)
// // console.log(__dirname)
// console.log(__dirname);
// // Prints: /Users/mjr
// console.log(__filename)
// // Prints: /Users/mjr

// const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {}

// const myEmitter = new MyEmitter();
// myEmitter.on('event', () => {
//   console.log('an event occurred!');
// });

// setTimeout(function() {
//     myEmitter.emit('event');
// },5000)  


var a = 5;
setTimeout(function timeout() {
    console.log(a);
    a = 10;
}, 0);

var p = new Promise(function(resolve, reject) {
    console.log(a);
    a = 25;
    resolve();
});

p.then(function(){
    // some code
});

console.log(a);