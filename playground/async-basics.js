console.log('Starting app');

setTimeout(() => {
    console.log('Inside of callback');
}, 2000);

setTimeout(() => {
    console.log('Timeout set to 0 sec');
}, 0);

console.log('Finishing app');


