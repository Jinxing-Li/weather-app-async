


// var somePromise = new Promise((resolve, reject) => {
//      setTimeout(() => {
//           resolve('Hey. It worked!');
//           resolve();
//           reject('Unable to fulfil promise');
//      }, 2500);
     
// })

// somePromise.then((message) => {
//      console.log('Success: ', message);
// }, (errorMessage) => {
//      console.log('Error: ', errorMessage);
// });

var asyncAdd = (a,b) => {
     return new Promise((resolve, reject) => {
          setTimeout(() => {
               if(typeof a === 'number' && typeof b === 'number') {
                    resolve(a+b);
               }
               else {
                    reject('Argumets must be numbers');
               }
          }, 1500)
     })
}

asyncAdd(5,7).then((message) => {
     console.log('Result: ', message)
     return asyncAdd(message, 33);
}).then((message) => {
     console.log('Should be 45 :', message);
}).catch((errorMessage) => {
     console.log(errorMessage);
})