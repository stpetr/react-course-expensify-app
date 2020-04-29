const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve('this is my resolved data after 1500 delay')
        reject('something went wrong')
    }, 1500);
})

promise.then((data) => {
    console.log('promise.then:', data)
}).catch((error) => {
    console.log('Caught error:', error)
})

console.log('after all')